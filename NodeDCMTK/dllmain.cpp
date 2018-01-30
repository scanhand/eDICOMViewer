// dllmain.cpp: DLL 응용 프로그램의 진입점을 정의합니다.
#include "stdafx.h"
#include "NodeDCMTK.h"
#include "dcmtk/dcmdata/dcfilefo.h"
#include "dcmtk/dcmdata/dctagkey.h"
#include "dcmtk/config/osconfig.h"
#include "dcmtk/dcmdata/dctk.h"


BOOL APIENTRY DllMain( HMODULE hModule,
                       DWORD  ul_reason_for_call,
                       LPVOID lpReserved
                     )
{
    switch (ul_reason_for_call)
    {
    case DLL_PROCESS_ATTACH:
    case DLL_THREAD_ATTACH:
    case DLL_THREAD_DETACH:
    case DLL_PROCESS_DETACH:
        break;
    }
    return TRUE;
}

int test_dcmtk(int a, int b)
{
	DcmFileFormat fileformat;
	OFCondition status = fileformat.loadFile("E:\\work\\0002.DCM");
	if (status.good())
	{
		OFString patientName;
		if (fileformat.getDataset()->findAndGetOFString(DCM_PatientName, patientName).good())
		{
			char buffer[256];
			sprintf(buffer, "Patient:%s", patientName);
			OutputDebugStringA(buffer);
			return a * b;
		}
	}
	return a + b;
}