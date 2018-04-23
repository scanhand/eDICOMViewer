@echo off
@echo. 
@echo ##### Start eDICOM Viewer Building... #####
cd ./electron/resources/app/JS
@echo. 
@echo ## 1.Installing module by npm ##
call npm install
@echo. 
@echo ## 2.Start electron-rebuild by npm ##
call ./node_modules/.bin/electron-rebuild -v1.7.10
@echo. 
@echo ## 3.Packaging by webpack ##
call webpack
pause