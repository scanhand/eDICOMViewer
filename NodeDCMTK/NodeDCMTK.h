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

	DllExport int DumpDcmTagHierarchy(void* dcmPtr);

	DllExport int GetElementCount(void* dcmPtr, long* count);

	DllExport int GetElement(void* dcmPtr, int index, void** elementPtr);

	DllExport int GetElementGTag(void* elementPtr, unsigned short* gtag);

	DllExport int GetElementETag(void* elementPtr, unsigned short* etag);

	DllExport int GetElementTagName(void* elementPtr, char* tagName);

	DllExport int GetElementStringValue(void* elementPtr, char* value);

	DllExport int GetElementVR(void* elementPtr, char* vr);

	DllExport int IsLeafElement(void* elementPtr, bool* isLeaf);
}