import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import menu from './menu.js';


var oldPath = process.env.PATH;
///현재 path 기준은 electron.exe
var dllPath = '..\\Release';
process.env['PATH'] = `${process.env.PATH};${dllPath}`;
// binding to a nodeDCMTK functions...
var nodeDCMTK = ffi.Library('NodeDCMTK.dll', {
'test_dcmtk': [ 'int', [ 'int', 'int' ]]
});
process.env['PATH'] = oldPath;

//call test_dcmtk
var result = nodeDCMTK.test_dcmtk(3,4);
console.log("3+4=" + result);