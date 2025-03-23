import { NextResponse } from "next/server";
import { supabaseClient } from "@/lib/supabase";

export async function POST(req) {
    try {
        const { title, description, userId, token } = await req.json();

        // Criar um cliente do Supabase autenticado com o token do usuário
        const supabase = supabaseClient(token);

        // Inserir a nova tarefa no banco de dados
        const { data, error } = await supabase
            .from("tasks")
            .insert([{ title, description, user_id: userId }])
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: error.message || "Erro ao criar tarefa" },
            { status: 500 }
        );
    }
}
