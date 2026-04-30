@echo off
title LoL Predictor Stop
color 0C

echo ===================================================
echo Stopping League of Legends Match Predictor...
echo ===================================================
echo.

echo Stopping servers...
taskkill /fi "windowtitle eq LoLBackendServer" /f >nul 2>&1
taskkill /fi "windowtitle eq LoLFrontendServer" /f >nul 2>&1

echo.
echo Application stopped successfully!
timeout /t 3 > nul
