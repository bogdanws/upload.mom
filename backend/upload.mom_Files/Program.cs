using Microsoft.EntityFrameworkCore;
using upload.mom_Files;
using upload.mom_Files.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<StorageOptions>(builder.Configuration.GetSection(StorageOptions.Position));
var storageOptions = builder.Configuration.GetSection(StorageOptions.Position).Get<StorageOptions>()!;

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DatabaseContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddHostedService<FileCleanupService>();

builder.WebHost.ConfigureKestrel(options =>
    options.Limits.MaxRequestBodySize = storageOptions.MaxUploadSize);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseHsts();



app.MapControllers();

app.Run();