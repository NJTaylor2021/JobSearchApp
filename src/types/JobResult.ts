// Defines what is returned by the Adzuna API for the frontend
export interface JobResult
{
    ID: string;
    title: string;
    company: string;
    location: string;
    description: string;
    redirectURL: string;
}