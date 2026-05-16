import type { Mistake } from "../types/mistakes";
import { supabase } from "../utils/supabase";

export async function createMistake(input: Mistake) {
    const { data, error } = await supabase
        .from("mistakes")
        .insert(input)
        .select()
        .single();

    if (error) {
        console.log("Error:", error);
    } else {
        console.log("Inserted:", data);
    }
}

export async function getMistakes() {
    const { data, error } = await supabase
        .from("mistakes")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.log("Error:", error);
        return [];
    } else {
        return data as Mistake[];
    }
}

export async function updateMistake(id: string, input: Partial<Mistake>) {
    const { data, error } = await supabase
        .from("mistakes")
        .update(input)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.log("Error:", error);
    } else {
        console.log("Updated:", data);
    }
}

export async function deleteMistake(id: string) {
    const { data, error } = await supabase
        .from("mistakes")
        .delete()
        .eq("id", id);

    if (error) {
        console.log("Error:", error);
    } else {
        console.log("Deleted:", data);
    }
}
