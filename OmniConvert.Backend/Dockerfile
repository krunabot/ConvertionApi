# Stage 1: Install .NET 8 SDK on pure Alpine Linux to build code
FROM alpine:3.20 AS build
WORKDIR /src

# Install official .NET 8 SDK via Alpine package manager
RUN apk add --no-cache dotnet8-sdk

# Copy project files and restore dependencies
COPY ["OmniConvert.Backend.csproj", "."]
RUN dotnet restore "OmniConvert.Backend.csproj"

# Copy all remaining source files and compile
COPY . .
# FIX: Target the .csproj directly instead of building the whole multi-project solution
RUN dotnet publish "OmniConvert.Backend.csproj" -c Release -o /app --runtime linux-musl-x64 --self-contained false

# Stage 2: Create a minimal production runner space
FROM alpine:3.20
WORKDIR /app

# Install only the lightweight ASP.NET 8 Runtime components
RUN apk add --no-cache dotnet8-runtime aspnetcore8-runtime

# Copy compiled binaries from the build stage
COPY --from=build /app .

# Render networking configurations
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "OmniConvert.Backend.dll"]
