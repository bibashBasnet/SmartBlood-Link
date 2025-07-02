@echo off
echo 🚀 Starting Spring Boot backend...
start cmd /k "cd /d C:\Users\user\Desktop\College\Final Project\SmartBloodLink && mvnw.cmd spring-boot:run"

timeout /t 5 > nul

echo 🚀 Starting React Native frontend (Expo)...
start cmd /k "cd /d C:\Users\user\Desktop\College\Final Project\Frontend && npm start"
