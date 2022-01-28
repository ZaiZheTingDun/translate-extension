using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TencentCloud.Common;
using TencentCloud.Common.Profile;
using TencentCloud.Tmt.V20180321;
using Tmt.Configuration;

namespace Tmt
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        private IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var tmtOptions = new TmtOptions();
            Configuration.GetSection(TmtOptions.Tmt).Bind(tmtOptions);

            services.AddControllers();
            services.AddSingleton(_ =>
            {
                var cred = new Credential {
                    SecretId = tmtOptions.SecretId,
                    SecretKey = tmtOptions.SecretKey
                };

                var httpProfile = new HttpProfile { Endpoint = "tmt.tencentcloudapi.com" };
                var clientProfile = new ClientProfile { HttpProfile = httpProfile };

                return new TmtClient(cred, tmtOptions.Region, clientProfile);
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
