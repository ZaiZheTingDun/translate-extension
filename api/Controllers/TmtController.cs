using Microsoft.AspNetCore.Mvc;
using TencentCloud.Tmt.V20180321;
using TencentCloud.Tmt.V20180321.Models;

namespace Tmt.Controllers
{
    [ApiController]
    public class TmtController : ControllerBase
    {
        private readonly TmtClient _client;

        public TmtController(TmtClient client)
        {
            _client = client;
        }

        [HttpGet("health")]
        public string Health()
        {
            return "OK";
        }

        [HttpGet("tmt")]
        public TextTranslateResponse Get(string text, string source = "auto", string target = "zh")
        {
            if (text == null)
            {
                return new TextTranslateResponse();
            }

            var req = new TextTranslateRequest
            {
                SourceText = text, Source = source, Target = target, ProjectId = 0
            };
            return _client.TextTranslateSync(req);
        }
    }
}
