import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obter todas as tarefas (GET)
export async function GET() {
    try {
        const tasks = await prisma.task.findMany();
        return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao buscar tarefas" },
            { status: 500 }
        );
    }
}

// Criar uma nova tarefa (POST)
export async function POST(req) {
    try {
        const { title, description } = await req.json();
        const task = await prisma.task.create({ data: { title, description } });
        return NextResponse.json(task, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao criar tarefa" },
            { status: 500 }
        );
    }
}

// Atualizar uma tarefa (PUT)
export async function PUT(req) {
    // adicionar verificações de CAMPOSSSSS
    try {
        const { id, title, description, completed } = await req.json();
        console.log({ id, title, description, completed });
        const task = await prisma.task.update({
            where: { id },
            data: { title, description, completed },
        });
        return NextResponse.json(task, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao atualizar tarefa" },
            { status: 500 }
        );
    }
}

// Deletar uma tarefa (DELETE)
export async function DELETE(req) {
    try {
        const { id } = await req.json();
        await prisma.task.delete({ where: { id } });
        return NextResponse.json(
            { message: "Tarefa deletada" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao deletar tarefa" },
            { status: 500 }
        );
    }
}
