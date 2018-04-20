@echo off
@echo Start eDICOM Viewer Building...
cd ./electron/resources/app/JS
@echo installing module by npm
call npm install
@echo packaging by webpack
call webpack
pause