using Microsoft.EntityFrameworkCore;
using AgileanBack.Infrastructure.Data;
using AgileanBack.Features.Produtos;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseSqlite("Data Source=agilean.db"));

builder.Services.AddCors(options =>
    options.AddPolicy("AllowReact", policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ProdutoService>();

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReact");

app.UseAuthorization();

app.MapControllers();

app.Run();
