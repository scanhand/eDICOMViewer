#pragma once

#define DllExport   __declspec( dllexport )  

extern "C" {

	DllExport int test_sum(int a, int b);

	DllExport void test_parameter_string(char* param);

	DllExport char* test_return_string(double data);

	DllExport void test_loaddcm();
}