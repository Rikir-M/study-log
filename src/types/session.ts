export interface Session {
  uuid: string;
  type: "sat_math" | "sat_rw" | "ielts" | "project";
  duration: number;
  score: number | null;
  note: string | null;
  created_at: string;
};