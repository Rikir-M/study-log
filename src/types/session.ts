export interface Session {
    id: string;
    type: string;
    duration: number;
    score: number | null;
    note: string | null;
    created_at: string;
}
