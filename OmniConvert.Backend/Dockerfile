# Stage 1: Build using the official Ubuntu-hosted .NET SDK mirror on Docker Hub
FROM ubuntu/dotnet-sdk:8.0 AS build
WORKDIR /src

# Copy project file and restore dependencies
COPY ["OmniConvert.Backend.csproj", "."]
RUN dotnet restore

# Copy all remaining backend files and publish
COPY . .
RUN dotnet publish -c Release -o /app

# Stage 2: Run using the official Ubuntu-hosted .NET ASP.NET runtime mirror on Docker Hub
FROM ubuntu/dotnet-aspnet:8.0
WORKDIR /app
COPY --from=build /app .

# Render routing configurations
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "OmniConvert.Backend.dll"]
