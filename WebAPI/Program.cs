using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Repositories.Interfaces;
using WebAPI.Repositories.Implementations;
using WebAPI.UnitOfWork.Interfaces;
using WebAPI.UnitOfWork.Implementations;
using AutoMapper;
using WebAPI.Mappings;
using WebAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AccessContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("AccessContext")));

builder.Services.AddScoped<IPermissionRepository, PermissionRepository>();
builder.Services.AddScoped<IPermissionTypeRepository, PermissionTypeRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<PermissionService>();
builder.Services.AddScoped<PermissionTypeService>();
builder.Services.AddAutoMapper(typeof(AutoMapperProfiles));

//CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("*")
            .AllowAnyHeader()
            .AllowAnyMethod();
        }
    );
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

//La siguiente instrucción se puede comentar si la base de datos ya existe
app.CreateDbIfNotExists();

//app.UseHttpsRedirection();

app.MapControllers();

app.MapGet("/", () => @"WebAPI management API. Navigate to /swagger to open the Swagger test UI.");

app.Run();
