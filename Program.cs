using Microsoft.EntityFrameworkCore;
using whole_crm.Data;
using whole_crm.Services;

var builder = WebApplication.CreateBuilder(args);

// --------------------
// Services Registration
// --------------------

builder.Services
    .AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ReferenceLoopHandling = 
            Newtonsoft.Json.ReferenceLoopHandling.Ignore;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("NeonDb")));

builder.Services.AddScoped<IDashboardService, DashboardService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<IOrderService, OrderService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// --------------------
// Build App
// --------------------

var app = builder.Build();

// --------------------
// Middleware Pipeline
// --------------------

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowAll");
app.UseStaticFiles();

app.UseRouting();
app.UseAuthorization();

app.MapControllers();
app.MapFallbackToFile("index.html");

// --------------------
// Ensure Database & Seed Data
// --------------------

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    EnsureDatabaseUpToDate(context);
    DataSeeder.SeedData(context);
}

app.Run();

// --------------------
// Helper Methods
// --------------------

static void EnsureDatabaseUpToDate(DbContext context)
{
    try
    {
        var hasPendingMigrations = context.Database.GetPendingMigrations().Any();

        if (hasPendingMigrations)
        {
            context.Database.Migrate();
        }
        else if (!context.Database.CanConnect() || 
                 !context.Database.GetAppliedMigrations().Any())
        {
            context.Database.EnsureCreated();
        }
    }
    catch
    {
        context.Database.EnsureCreated(); // fallback
    }
}
