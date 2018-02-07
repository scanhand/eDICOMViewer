var oldPath = process.env.PATH;
///현재 path 기준은 electron.exe
var dllPath = '.\\dll';
process.env['PATH'] = `${process.env.PATH};${dllPath}`;
// binding to a nodeDCMTK functions...

var DcmFileFormat = ref.types.void 
var DcmFileFormatPtr = ref.refType(DcmFileFormat);
var DcmFileFormatPtrPtr = ref.refType(DcmFileFormatPtr);

var longPtr = ref.refType('long');

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
'GetElementCount': ['int',[DcmFileFormatPtr,longPtr]]
});

process.env['PATH'] = oldPath;


function loadDICOMFile(fileName){
    var dcmFileFormat = ref.alloc(DcmFileFormatPtrPtr);
    if(!nodeDCMTK.OpenDcmFileFormat(fileName, dcmFileFormat))
        console.error("OpenDcmFileFormat failed!");

    // if(!nodeDCMTK.DumpDcmTag(dcmFileFormat.deref()))
    //     console.error("DumpDcmTag failed!");
 
    var elementCount = ref.alloc('long');
    nodeDCMTK.GetElementCount(dcmFileFormat.deref(), elementCount);
        
    console.log("GetElementCount Success=" + elementCount.deref());
    nodeDCMTK.CloseDcmFileFormat(dcmFileFormat.deref());
}

export { DcmFileFormatPtrPtr, nodeDCMTK, loadDICOMFile };

