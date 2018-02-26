var util = require('./util.js');

var oldPath = process.env.PATH;
///현재 path 기준은 electron.exe
var dllPath = '.\\dll';
process.env['PATH'] = `${process.env.PATH};${dllPath}`;
// binding to a nodeDCMTK functions...

var DcmFileFormat = ref.types.void 
var DcmFileFormatPtr = ref.refType(DcmFileFormat);
var DcmFileFormatPtrPtr = ref.refType(DcmFileFormatPtr);

var DcmElement = ref.types.void 
var DcmElementPtr = ref.refType(DcmElement);
var DcmElementPtrPtr = ref.refType(DcmElementPtr);

var DcmObject = ref.types.void 
var DcmObjectPtr = ref.refType(DcmObject);
var DcmObjectPtrPtr = ref.refType(DcmObjectPtr);

var longPtr = ref.refType('long');
var ushortPtr = ref.refType('uint16');
var ucharPtr = ref.refType('uchar');

var nodeDCMTK = ffi.Library('NodeDCMTK.dll', {
'test_sum': [ 'int', [ 'int', 'int' ]],
'test_parameter_string': [ 'void', ['string']],
'test_return_string': ['string', ['double']],
'test_loaddcm': [ 'void', ['string']],
'test_get_DcmFileFormat': [ DcmFileFormatPtr, ['string']],
'test_voidptr_paramter': [ 'void', [DcmFileFormatPtr]],
'OpenDcmFileFormat': ['int',['string',DcmFileFormatPtrPtr]],
'CloseDcmFileFormat': ['int',[DcmFileFormatPtr]],
'DumpDcmTag': ['int',[DcmFileFormatPtr]],
'GetElementCount': ['int',[DcmFileFormatPtr,longPtr]],
'GetElement': ['int',[DcmFileFormatPtr,'int', DcmElementPtrPtr]],
'GetElementGTag': ['int',[DcmElementPtr,ushortPtr]],
'GetElementETag': ['int',[DcmElementPtr,ushortPtr]],
'GetElementTagName': ['int',[DcmElementPtr,'char*']],
'GetElementStringValue': ['int',[DcmElementPtr,'char*']],
'GetElementVR': ['int',[DcmElementPtr,'char*']],
'IsLeafElement': ['int',[DcmElementPtr,ucharPtr]],
'GetDcmDataSet': ['int',[DcmFileFormatPtr, DcmObjectPtrPtr]],
'DcmObjectNextInContainer': ['int',[DcmObjectPtr, DcmObjectPtr, DcmObjectPtrPtr]],
'DcmObjectNextObjectTop': ['int',[DcmObjectPtr, DcmObjectPtrPtr]]
});

process.env['PATH'] = oldPath;

function loadDICOMFileHierarchy(fileName){
    var dcmFileFormat = ref.alloc(DcmFileFormatPtrPtr);
    if(!nodeDCMTK.OpenDcmFileFormat(fileName, dcmFileFormat))
        console.error("OpenDcmFileFormat failed!");

    var dataset = ref.alloc(DcmObjectPtrPtr);
    nodeDCMTK.GetDcmDataSet(dcmFileFormat.deref(), dataset);

    var nextObject = ref.alloc(DcmObjectPtrPtr);
    nodeDCMTK.DcmObjectNextInContainer(dataset.deref(), ref.NULL, nextObject);
    AddRowHierarchy(dataset.deref(), nextObject.deref(), 0, null, 0);

    nodeDCMTK.CloseDcmFileFormat(dcmFileFormat.deref());
}

function AddRowHierarchy(container, current, level, parentRow, id){
    if(ref.isNull(container) || ref.isNull(current))
        return;

    var isLeaf = ref.alloc('uchar');
    nodeDCMTK.IsLeafElement(current, isLeaf);

    ///If currnet tag is item tag, set parentRow to newRow. 
    var newRow = parentRow;
    if(!IsItemTag(current))
        newRow = AddTableRow(current, level, parentRow, id++, isLeaf.deref());

    if(isLeaf.deref() == 0)
    {
        addClass(newRow, 'opend');
        var nextTopObject = ref.alloc(DcmObjectPtrPtr);
        nodeDCMTK.DcmObjectNextObjectTop(current, nextTopObject);
        AddRowHierarchy(current, nextTopObject.deref(), level+1, newRow, id);
    }
    
    var nextObject = ref.alloc(DcmObjectPtrPtr);
    nodeDCMTK.DcmObjectNextInContainer(container, current, nextObject);
    AddRowHierarchy(container, nextObject.deref(), level, parentRow, id);
}

function addClass(row, type){
    row.nodes().to$().addClass(type);
}

function loadDICOMFile(fileName){
    var dcmFileFormat = ref.alloc(DcmFileFormatPtrPtr);
    if(!nodeDCMTK.OpenDcmFileFormat(fileName, dcmFileFormat))
        console.error("OpenDcmFileFormat failed!");

    var elementCount = ref.alloc('long');
    nodeDCMTK.GetElementCount(dcmFileFormat.deref(), elementCount);
    console.log("GetElementCount Success=" + elementCount.deref());
    
    for(var i=0; i<elementCount.deref(); i++)
    {
        var dcmElementPtr = ref.alloc(DcmElementPtrPtr);
        nodeDCMTK.GetElement(dcmFileFormat.deref(), i, dcmElementPtr);
        AddTableRow(dcmElementPtr.deref());
    }

    nodeDCMTK.CloseDcmFileFormat(dcmFileFormat.deref());
};

function IsItemTag(dcmElementPtr){
    var gtag = ref.alloc('uint16');
    nodeDCMTK.GetElementGTag(dcmElementPtr, gtag);

    var etag = ref.alloc('uint16');
    nodeDCMTK.GetElementETag(dcmElementPtr, etag);



    if(gtag.deref() == 0xFFFE && etag.deref() == 0xE000)
        return true;

    return false;
}

function AddTableRow(dcmElementPtr, level, parentRow, id, isLeaf){
    var gtag = ref.alloc('uint16');
    nodeDCMTK.GetElementGTag(dcmElementPtr, gtag);

    var etag = ref.alloc('uint16');
    nodeDCMTK.GetElementETag(dcmElementPtr, etag);

    var elementName = new Buffer(255);
    nodeDCMTK.GetElementTagName(dcmElementPtr, elementName);

    var vr = new Buffer(255);
    nodeDCMTK.GetElementVR(dcmElementPtr, vr);

    var value = new Buffer(255);
    nodeDCMTK.GetElementStringValue(dcmElementPtr, value);

    var isLeaf = ref.alloc('uchar');
    nodeDCMTK.IsLeafElement(dcmElementPtr, isLeaf);

    var elementText = "[{0}:{1}]".format(util.toHex(gtag.deref(),4), util.toHex(etag.deref(),4));
    if(parentRow != null)
    {
        var row = parentRow.table().row.add({
            "id": id,
            "tag": elementText,
            "name": elementName.toString('utf8'),
            "vr": vr.toString('utf8'),
            "value": value.toString('utf8'),
        }).draw(false);

        // addClass(row, "hided");
    }
    else
    {
        var row = elementTable.row.add({
            "id": id,
            "tag": elementText,
            "name": elementName.toString('utf8'),
            "vr": vr.toString('utf8'),
            "value": value.toString('utf8'),
        }).draw(false);
    }
    return row;
}

export { 
    DcmFileFormatPtrPtr,
    DcmElementPtrPtr,
    nodeDCMTK,
    loadDICOMFile,
    loadDICOMFileHierarchy
};

