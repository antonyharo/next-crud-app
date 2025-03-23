import { NextResponse } from "next/server";
import { supabaseClient } from "@/lib/supabase";

export async function PUT(req) {
    try {
        // segunraça srsrmksrmskr
        const { id, title, description, completed, token } = await req.json();
        const supabase = supabaseClient(token);

        const { data, error } = await supabase
            .from("tasks")
            .update({ title, description, completed })
            .eq("id", id)
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao atualizar tarefa" },
            { status: 500 }
        );
    }
}
