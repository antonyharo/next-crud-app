import { NextResponse } from "next/server";
import { supabaseClient } from "@/lib/supabase";

export async function DELETE(req) {
    try {
        const { id, token, userId } = await req.json();

        if (!id || typeof id !== "number") {
            return NextResponse.json({ error: "ID inválido" }, { status: 400 });
        }

        const supabase = supabaseClient(token);

        const { error } = await supabase
            .from("tasks")
            .delete()
            .eq("id", id)
            .eq("user_id", userId);

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json(
            { message: "Tarefa deletada com sucesso" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao deletar tarefa: " + error.message },
            { status: 500 }
        );
    }
}
