using JobSearchApp.Models;
using System.Text;
using System.Text.Json;

namespace JobSearchApp.Services
{
    public class AdzunaService
    {
        private readonly HttpClient _client;
        private readonly string _appID;
        private readonly string _appKey;

        // Retrieves the Adzuna app ID and Adzuna App Key from appsettings
        public AdzunaService(HttpClient client, IConfiguration config)
        {
            _client = client;
            _appID = config["Adzuna:AppID"]!;
            _appKey = config["Adzuna:AppKey"]!;
        }

        public async Task<List<JobResult>> SearchJobsAsync(string jobTitle, String[] locations, int page = 1)
        {
            var results = new List<JobResult>();
            foreach (String location in locations)
            {
                // Defined by the Adzuna API
                var url = $"https://api.adzuna.com/v1/api/jobs/us/search/{page}" +
                          $"?app_id={_appID}&app_key={_appKey}" +
                          $"&what={Uri.EscapeDataString(jobTitle)}" +
                          $"&where={Uri.EscapeDataString(location)}" +
                          $"&results_per_page=20";

                var response = await _client.GetAsync(url);
                response.EnsureSuccessStatusCode();

                var bytes = await response.Content.ReadAsByteArrayAsync();
                var json = Encoding.UTF8.GetString(bytes);
                var doc = JsonDocument.Parse(json);

                foreach (var item in doc.RootElement.GetProperty("results").EnumerateArray())
                {
                    // Determines if any of the JSON information given by Adzuna is null
                    results.Add(new JobResult
                    {
                        ID = item.TryGetProperty("id", out var id_name) ? id_name.GetString() ?? "" : "",
                        Title = item.TryGetProperty("title", out var title_name) ? title_name.GetString() ?? "" : "",
                        Company = item.TryGetProperty("company", out var company) &&
                            company.TryGetProperty("display_name", out var name) ? name.GetString() ?? "" : "",
                        Location = item.TryGetProperty("location", out var loc) &&
                            loc.TryGetProperty("display_name", out var loc_name) ? loc_name.GetString() ?? "" : "",
                        Description = item.TryGetProperty("description", out var desc_name) ?
                            desc_name.GetString() ?? "" : "",
                        RedirectURL = item.TryGetProperty("redirect_url", out var redirect) ?
                            redirect.GetString() ?? "" : ""
                    });
                }
            }

            return results;
        }
    }
}