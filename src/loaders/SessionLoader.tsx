import { getSessions } from "../api/sessions";

export async function SessionLoader() {
    const sessions = await getSessions();
    return { sessions };
}
