using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace FP.DOS20219.BuildInside
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
        }
      
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/", async ctx =>
                {
                    await ctx.Response.WriteAsync($"Hallo DevOpenSpace {DateTime.UtcNow:G}");
                });
            });
        }

    }
}
