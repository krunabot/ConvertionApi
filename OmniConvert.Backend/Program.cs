using OmniConvert.Backend.Services;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
var isLocal = builder.Environment.IsDevelopment() || string.IsNullOrEmpty(Environment.GetEnvironmentVariable("RENDER"));

var loggerConfiguration = new LoggerConfiguration()
    .MinimumLevel.Information();

if (isLocal)
{
    // Write logs to a file in the root folder when running locally
    var logPath = Path.Combine(Directory.GetCurrentDirectory(), "logs", "request-log-.txt");
    loggerConfiguration.WriteTo.File(logPath, rollingInterval: RollingInterval.Day);
}
else
{
    // Write logs to the Render console when not local
    loggerConfiguration.WriteTo.Console();
}

Log.Logger = loggerConfiguration.CreateLogger();
builder.Host.UseSerilog();

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMemoryCache();
builder.Services.AddHttpClient<IFinanceRateService, FinanceRateService>();

builder.Services.AddScoped<IConversionEngineService, ConversionEngineService>();
builder.Services.AddScoped<IFinanceRateService, FinanceRateService>();

// Configure CORS for frontend connectivity
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

// Custom middleware to intercept and log all incoming HTTP requests
app.Use(async (context, next) =>
{
    var sw = System.Diagnostics.Stopwatch.StartNew();
    try
    {
        Log.Information("Incoming HTTP Request: {Method} {Path} from {IpAddress}",
            context.Request.Method,
            context.Request.Path,
            context.Connection.RemoteIpAddress);

        await next();

        sw.Stop();
        Log.Information("Completed HTTP Request: {Method} {Path} responded {StatusCode} in {ElapsedMs}ms",
            context.Request.Method,
            context.Request.Path,
            context.Response.StatusCode,
            sw.ElapsedMilliseconds);
    }
    catch (Exception ex)
    {
        sw.Stop();
        Log.Error(ex, "Failed HTTP Request: {Method} {Path} after {ElapsedMs}ms",
            context.Request.Method,
            context.Request.Path,
            sw.ElapsedMilliseconds);
        throw;
    }
});

app.UseAuthorization();

app.MapControllers();

app.Run();
