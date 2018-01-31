var oldPath = process.env.PATH;
///현재 path 기준은 electron.exe
var dllPath = '.\\dll';
process.env['PATH'] = `${process.env.PATH};${dllPath}`;
// binding to a nodeDCMTK functions...

var DcmFileFormat = ref.types.void // we don't know what the layout of "myobj" looks like
var DcmFileFormatPtr = ref.refType(DcmFileFormat);

var nodeDCMTK = ffi.Library('NodeDCMTK.dll', {
'test_sum': [ 'int', [ 'int', 'int' ]],
'test_parameter_string': [ 'void', ['string']],
'test_return_string': ['string', ['double']],
'test_loaddcm': [ 'void', []],
'test_get_DcmFileFormat': [ DcmFileFormatPtr, []],
'test_voidptr_paramter': [ 'void', [DcmFileFormatPtr]],

});

process.env['PATH'] = oldPath;

export default nodeDCMTK;
