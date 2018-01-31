#pragma once

#define DllExport   __declspec( dllexport )  

extern "C" {
	DllExport int test_dcmtk(int a, int b);

	DllExport void test_parameter_string(char* param);
}