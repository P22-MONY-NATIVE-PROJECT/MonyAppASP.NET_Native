@echo off

echo Docker login...
docker login

echo Building Docker image api...
docker build -t f-track-api . 

echo Tagging Docker image api...
docker tag f-track-api:latest pedro007salo/f-track-api:latest

echo Pushing Docker image api to repository...
docker push pedro007salo/f-track-api:latest

echo Done ---api---!
pause
 