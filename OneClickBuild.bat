@echo off
@echo ##### Start eDICOM Viewer Building... ##### 
@echo. 
cd ./electron/resources/app/JS
@echo ### 1.Installing module by npm ##### 
call npm install
@echo ### 2.Start electron-rebuild by npm ##### 
call ./node_modules/.bin/electron-rebuild
@echo ### 3.Packaging by webpack ##### 
call webpack
pause