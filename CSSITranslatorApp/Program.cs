using CSSITranslatorApp;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddScoped<ITranslator, Translator>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "supported-languages",
    pattern: "/api/{controller}/{action=Index}");

app.MapControllerRoute(
    name: "translate",
    pattern: "/api/{controller}/{action=Translate}");

// app.MapControllerRoute(
//     name: "default",
//     pattern: "{controller=Translator}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();