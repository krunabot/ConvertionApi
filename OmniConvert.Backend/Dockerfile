# Stage 1: Build the application using the official Microsoft container alias
FROM public.ecr.aws/microsoft/dotnet-sdk:8.0 AS build
WORKDIR /src

# Copy project file and restore dependencies
COPY ["OmniConvert.Backend.csproj", "."]
RUN dotnet restore

# Copy all remaining backend files and publish
COPY . .
RUN dotnet publish -c Release -o /app

# Stage 2: Run the application using the official Microsoft runtime alias
FROM public.ecr.aws/microsoft/dotnet-aspnet:8.0
WORKDIR /app
COPY --from=build /app .

# Render routing configurations
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "OmniConvert.Backend.dll"]
