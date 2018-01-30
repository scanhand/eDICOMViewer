import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import menu from './menu.js';
import nodeDCMTK from './nodeDCMTK.js';

//call test_dcmtk
var result = nodeDCMTK.test_dcmtk(3,4);
console.log("3+4=" + result);