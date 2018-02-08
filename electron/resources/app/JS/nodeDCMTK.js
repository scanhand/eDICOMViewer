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

var longPtr = ref.refType('long');
var ushortPtr = ref.refType('uint16');
// var stringPtr = ref.refType('string');
var stringPtr = ref.refType(ref.types.CString);

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
'GetElementTagName': ['int',[DcmElementPtr,'stringPtr']]
});

process.env['PATH'] = oldPath;


function loadDICOMFile(fileName){
    var dcmFileFormat = ref.alloc(DcmFileFormatPtrPtr);
    if(!nodeDCMTK.OpenDcmFileFormat(fileName, dcmFileFormat))
        console.error("OpenDcmFileFormat failed!");

    var elementCount = ref.alloc('long');
    nodeDCMTK.GetElementCount(dcmFileFormat.deref(), elementCount);
    console.log("GetElementCount Success=" + elementCount.deref());

    var dcmElementPtr = ref.alloc(DcmElementPtrPtr);
    nodeDCMTK.GetElement(dcmFileFormat.deref(), 0, dcmElementPtr);

    var gtag = ref.alloc('uint16');
    nodeDCMTK.GetElementGTag(dcmElementPtr.deref(), gtag);

    var etag = ref.alloc('uint16');
    nodeDCMTK.GetElementETag(dcmElementPtr.deref(), etag);

    //buf = new Buffer 255
    var elementName = new Buffer(255);
    nodeDCMTK.GetElementTagName(dcmElementPtr, elementName);
    // console.log("GetElementTagName=" + ref.readCString(elementName, 0));
    console.log("GetElementTagName=" + elementName.toString('utf-8'));
    console.log("GetElement [{0}:{1}]".format(util.toHex(gtag.deref(),4), util.toHex(etag.deref(),4)));


    
    nodeDCMTK.CloseDcmFileFormat(dcmFileFormat.deref());
};

export { 
    DcmFileFormatPtrPtr,
    DcmElementPtrPtr,
    nodeDCMTK,
    loadDICOMFile 
};

