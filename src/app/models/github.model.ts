export interface Issue {
    id: number;
    title: string;
    state: string;
    url: string;
}

export interface Page {
    totalPages: number;
    issuePageUrl: string;
    issues: Issue[];
}