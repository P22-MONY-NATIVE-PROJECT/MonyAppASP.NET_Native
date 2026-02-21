FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /source

COPY ["WebMonyAPI.csproj", "WebMonyAPI/"]
WORKDIR /source/WebMonyAPI
RUN dotnet restore "WebMonyAPI.csproj"

COPY . .
RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "WebMonyAPI.dll"]
