@echo off
title LoL Predictor Start
color 0B

echo ===================================================
echo Starting League of Legends Match Predictor...
echo ===================================================
echo.
echo [1/3] Starting Backend (AI API)...
start "LoLBackendServer" /MIN cmd /c "python backend\predict.py"

echo [2/3] Starting Frontend (UI)...
start "LoLFrontendServer" /MIN cmd /c "npm run dev"

echo.
echo Please wait, servers are getting ready...
timeout /t 4 /nobreak > nul

echo [3/3] Opening browser...
start http://localhost:5173

echo.
echo ===================================================
echo APPLICATION STARTED!
echo ===================================================
echo Run stop.bat to close the servers.
echo You can close this window.
timeout /t 5 > nul
