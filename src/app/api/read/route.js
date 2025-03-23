import { NextResponse } from "next/server";
import { supabaseClient } from "@/lib/supabase";

export async function POST(req) {
    try {
        const { token, userId } = await req.json();

        const supabase = supabaseClient(token);

        const { data: tasks } = await supabase
            .from("tasks")
            .select("*")
            .eq("user_id", userId);

        return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao buscar tarefas" },
            { status: 500 }
        );
    }
}
