import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {nodeDCMTK, DcmFileFormatPtrPtr} from './nodeDCMTK.js';
import menu from './menu.js';

var fileName = '..\\etc\\sampleDICOM\\0001.DCM';
var dcmFileFormat = ref.alloc(DcmFileFormatPtrPtr);

if(!nodeDCMTK.OpenDcmFileFormat(fileName, dcmFileFormat))
    console.error("OpenDcmFileFormat failed!");

if(!nodeDCMTK.DumpDcmTag(dcmFileFormat.deref()))
    console.error("DumpDcmTag failed!");
    
console.log("DumpDcmTag Success!");
