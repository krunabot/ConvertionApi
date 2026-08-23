# Stage 1: Build the application using the .NET 8 SDK
FROM ://microsoft.com AS build
WORKDIR /src

# Copy project file and restore dependencies
COPY ["OmniConvert.Backend.csproj", "."]
RUN dotnet restore

# Copy all remaining backend files and publish
COPY . .
RUN dotnet publish -c Release -o /app

# Stage 2: Run the application using the ASP.NET 8 runtime
FROM ://microsoft.com
WORKDIR /app
COPY --from=build /app .

# Render routes external traffic to port 8080 by default for ASP.NET
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "OmniConvert.Backend.dll"]
