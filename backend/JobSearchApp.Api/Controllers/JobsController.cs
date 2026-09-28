using Microsoft.AspNetCore.Mvc;
using JobSearchApp.Services;

namespace JobSearchApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobsController : ControllerBase
    {
        private readonly AdzunaService _adzunaService;

        public JobsController(AdzunaService service)
        {
            _adzunaService = service;
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string jobTitle,
                                                [FromQuery] string locations, [FromQuery] int page = 1)
        {
            String[] states = locations.Split(",");
            var results = await _adzunaService.SearchJobsAsync(jobTitle, states, page);
            return Ok(results);
        }
    }
}