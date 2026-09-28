import type { JobResult } from "../types/JobResult";

// Queries the backend to search for jobs and returns the result or throws an error
async function SearchJobs(jobTitle: string, locations: string, page: number = 1): Promise<JobResult[]> {
    const params = new URLSearchParams({ jobTitle, locations, page: page.toString() });
    const response = await fetch(`/api/jobs/search?${params}`);

    if (!response.ok)
        throw new Error(`Search failed: ${response.status}`);

    return response.json();
}

export default SearchJobs;