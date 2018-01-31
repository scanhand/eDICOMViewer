var oldPath = process.env.PATH;
///현재 path 기준은 electron.exe
var dllPath = '.\\dll';
process.env['PATH'] = `${process.env.PATH};${dllPath}`;
// binding to a nodeDCMTK functions...
var nodeDCMTK = ffi.Library('NodeDCMTK.dll', {
'test_sum': [ 'int', [ 'int', 'int' ]],
'test_parameter_string' : [ 'void', ['string']],
'test_return_string' : ['string', ['double']],
'test_loaddcm' : [ 'void', []]
});

process.env['PATH'] = oldPath;

export default nodeDCMTK;