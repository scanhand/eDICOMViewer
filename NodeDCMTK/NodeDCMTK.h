#pragma once

#define DllExport   __declspec( dllexport )  

extern "C" {

	// Test Code
	DllExport int test_sum(int a, int b);

	// Test Code
	DllExport void test_parameter_string(char* param);

	// Test Code
	DllExport char* test_return_string(double data);

	// Test Code
	DllExport void test_loaddcm(char* fileName);

	// Test Code
	DllExport void* test_get_DcmFileFormat(char* fileName);

	// Test Code
	DllExport void test_voidptr_paramter(void* dcmPtr);

	DllExport int OpenDcmFileFormat(char* fileName, void** dcmptr);

	DllExport int CloseDcmFileFormat(void* dcmPtr);

	DllExport int DumpDcmTag(void* dcmPtr);

	DllExport int GetElementCount(void* dcmPtr, long* count);
}