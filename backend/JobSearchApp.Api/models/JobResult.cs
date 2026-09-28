namespace JobSearchApp.Models
{
    // Defines the information returned by the Adzuna API for the backend
    public class JobResult
    {
        public string ID { get; set; } = String.Empty;
        public string Title { get; set; } = String.Empty;
        public string Company { get; set; } = String.Empty;
        public string Location { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;
        public string RedirectURL { get; set; } = String.Empty;
    }
}