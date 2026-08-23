# Declare image names as variables to prevent parsing truncation
ARG SDK_IMAGE=://microsoft.com
ARG RUNTIME_IMAGE=://microsoft.com

# Stage 1: Build the application
FROM $SDK_IMAGE AS build
WORKDIR /src

# Copy project file and restore dependencies
COPY ["OmniConvert.Backend.csproj", "."]
RUN dotnet restore

# Copy all remaining backend files and publish
COPY . .
RUN dotnet publish -c Release -o /app

# Stage 2: Run the application
FROM $RUNTIME_IMAGE
WORKDIR /app
COPY --from=build /app .

# Render routing configurations
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "OmniConvert.Backend.dll"]
