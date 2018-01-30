var oldPath = process.env.PATH;
///현재 path 기준은 electron.exe
var dllPath = '.\\dll';
process.env['PATH'] = `${process.env.PATH};${dllPath}`;
// binding to a nodeDCMTK functions...
var nodeDCMTK = ffi.Library('NodeDCMTK.dll', {
'test_dcmtk': [ 'int', [ 'int', 'int' ]]
});
process.env['PATH'] = oldPath;

export default nodeDCMTK;