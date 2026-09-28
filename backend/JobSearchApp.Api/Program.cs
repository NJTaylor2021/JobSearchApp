using JobSearchApp.Services;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddHttpClient<AdzunaService>();

// Bind to port 0 so the OS assigns a free port
builder.WebHost.UseUrls("http://127.0.0.1:0");

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseAuthorization();
app.MapControllers();

app.Lifetime.ApplicationStarted.Register(() =>
{
    var addressFeature = app.Services.GetRequiredService<IServer>().Features.Get<IServerAddressesFeature>();

    var url = addressFeature!.Addresses.First();

    System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo(url)
    {
        UseShellExecute = true
    });
});

app.Run();