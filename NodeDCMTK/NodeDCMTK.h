#pragma once

#define DllExport   __declspec( dllexport )  

extern "C" {
	DllExport int test_dcmtk(int a, int b);
}