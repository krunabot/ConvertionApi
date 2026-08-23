# Stage 1: Build the application using the explicit .NET 8 SDK image hash
FROM ://microsoft.com AS build
WORKDIR /src

# Copy project file and restore dependencies
COPY ["OmniConvert.Backend.csproj", "."]
RUN dotnet restore

# Copy all remaining backend files and publish
COPY . .
RUN dotnet publish -c Release -o /app

# Stage 2: Run the application using the explicit .NET 8 ASP.NET runtime image hash
FROM ://microsoft.com
WORKDIR /app
COPY --from=build /app .

# Render routing configurations
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "OmniConvert.Backend.dll"]
