import type { Session } from "../types/session";
import { supabase } from "../utils/supabase";

export async function createSession(input: Session) {
  const { data, error } = await supabase
    .from("sessions")
    .insert(input)
    .select()
    .single();

  if (error) {
    console.log("Error:", error);
  } else {
    console.log("Inserted:", data);
  }
}

export async function getSessions() {
  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Error:", error);
    return [];
  } else {
    return data as Session[];
  }
}

export async function updateSession(uuid: string, input: Partial<Session>) {
  const { data, error } = await supabase
    .from("sessions")
    .update(input)
    .eq("uuid", uuid)
    .select()
    .single();

  if (error) {
    console.log("Error:", error);
  } else {
    console.log("Updated:", data);
  }
}

export async function deleteSession(uuid: string) {
  const { data, error } = await supabase
    .from("sessions")
    .delete()
    .eq("uuid", uuid);

  if (error) {
    console.log("Error:", error);
  } else {
    console.log("Deleted:", data);
  }
}