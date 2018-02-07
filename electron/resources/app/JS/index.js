import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import menu from './menu.js';
import nodeDCMTK from './nodeDCMTK.js';

//call test_sum
var result = nodeDCMTK.test_sum(3,4);
console.log("3+4=" + result);

//call test_parameter_string
nodeDCMTK.test_parameter_string('test1234');

//call test_return_string
console.log("test_return_string::" + nodeDCMTK.test_return_string(1.9876));

var fileName = '..\\etc\\sampleDICOM\\0001.DCM';

//call test_loaddcm
nodeDCMTK.test_loaddcm(fileName);

//call test_get_DcmFileFormat
var testDcmFileFormat = nodeDCMTK.test_get_DcmFileFormat(fileName);

//call test_voidptr_paramter
nodeDCMTK.test_voidptr_paramter(testDcmFileFormat);

//call OpenDcmFileFormat
var DcmFileFormat = ref.types.void 
var DcmFileFormatPtr = ref.refType(DcmFileFormat);
var DcmFileFormatPtrPtr = ref.refType(DcmFileFormatPtr);
var dcmFileFormat = ref.alloc(DcmFileFormatPtrPtr);

var isSuccess = nodeDCMTK.OpenDcmFileFormat(fileName, dcmFileFormat);
console.log("OpenDcmFileFormat::return=" + isSuccess.toString());
nodeDCMTK.test_voidptr_paramter(dcmFileFormat.deref());
