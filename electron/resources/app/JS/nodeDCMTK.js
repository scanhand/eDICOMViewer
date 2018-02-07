var oldPath = process.env.PATH;
///현재 path 기준은 electron.exe
var dllPath = '.\\dll';
process.env['PATH'] = `${process.env.PATH};${dllPath}`;
// binding to a nodeDCMTK functions...

var DcmFileFormat = ref.types.void 
var DcmFileFormatPtr = ref.refType(DcmFileFormat);
var DcmFileFormatPtrPtr = ref.refType(DcmFileFormatPtr);

var nodeDCMTK = ffi.Library('NodeDCMTK.dll', {
'test_sum': [ 'int', [ 'int', 'int' ]],
'test_parameter_string': [ 'void', ['string']],
'test_return_string': ['string', ['double']],
'test_loaddcm': [ 'void', ['string']],
'test_get_DcmFileFormat': [ DcmFileFormatPtr, ['string']],
'test_voidptr_paramter': [ 'void', [DcmFileFormatPtr]],
'OpenDcmFileFormat': ['int',['string',DcmFileFormatPtrPtr]]
});

process.env['PATH'] = oldPath;

export default nodeDCMTK;
