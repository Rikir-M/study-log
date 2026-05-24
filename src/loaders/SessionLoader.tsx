import { getMistakes } from "../api/mistakes";
import { getSessions } from "../api/sessions";

export async function SessionLoader() {
    const sessions = await getSessions();
    const mistakes = await getMistakes();
    return { sessions, mistakes };
}
