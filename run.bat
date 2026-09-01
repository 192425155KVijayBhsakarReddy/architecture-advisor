@echo off
setlocal
echo ========================================================
echo   Compiling Java Hardware & Performance Advisor...
echo ========================================================
if not exist "bin" mkdir bin

javac -d bin -sourcepath src (dir /s /b src\*.java) 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Standard build mode...
    javac -d bin -sourcepath src src\com\advisor\Main.java
)

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Compilation failed! Check Java installation.
    pause
    exit /b %ERRORLEVEL%
)

set PORT=8080
if not "%~1"=="" set PORT=%~1

echo ========================================================
echo   Starting Java Full-Stack Server on Port %PORT%...
echo   Open your browser at: http://localhost:%PORT%
echo ========================================================
start "" http://localhost:%PORT%
java -cp bin com.advisor.Main %PORT%
pause

