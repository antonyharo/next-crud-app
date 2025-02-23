"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Trash2, Check, Pencil, Plus } from "lucide-react";

export default function Home() {
    const [tasks, setTasks] = useState([
        {
            id: "1",
            name: "TASK 1",
            description: "Codar uma aplicação web em Next.js + Prisma",
            isComplete: false,
        },
    ]);
    const [successMessage, setSuccessMessage] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    // Função para adicionar ou editar uma task
    const onSubmit = (data) => {
        if (errors.name || errors.description) return;

        if (editingTask) {
            // Editando uma tarefa existente
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === editingTask.id
                        ? {
                              ...task,
                              name: data.name,
                              description: data.description,
                          }
                        : task
                )
            );
            setSuccessMessage("Task updated successfully!");
        } else {
            // Criando uma nova tarefa
            const newTask = {
                id: crypto.randomUUID(),
                name: data.name,
                description: data.description,
                isComplete: false,
            };
            setTasks([...tasks, newTask]);
            setSuccessMessage("Task added successfully!");
        }

        reset();
        setEditingTask(null);
        setIsDialogOpen(false);
        setTimeout(() => setSuccessMessage(""), 3000);
    };

    // Marcar como concluída
    const handleTaskComplete = (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, isComplete: true } : task
            )
        );
    };

    // Deletar uma tarefa
    const handleDeleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };

    // Abrir o modal para edição
    const handleEditTask = (task) => {
        setEditingTask(task);
        setValue("name", task.name);
        setValue("description", task.description);
        setIsDialogOpen(true);
    };

    return (
        <div className="p-6 mx-auto space-y-4 flex flex-col items-center justify-center min-h-screen">
            {/* Dialog para criar ou editar uma task */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button
                        className="bg-green-600 hover:bg-green-500"
                        onClick={() => setEditingTask(null)}
                    >
                        <Plus />
                        New Task
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            {editingTask ? "Edit Task" : "New Task"}
                        </DialogTitle>
                        <DialogDescription>
                            {editingTask
                                ? "Update the task details and save."
                                : "Create a new task here. Click save when you're done."}
                        </DialogDescription>
                    </DialogHeader>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="grid gap-4 py-4"
                    >
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                {...register("name", {
                                    required: "Task name is required",
                                })}
                                className="col-span-3"
                                placeholder="Task name"
                            />
                            {errors.name && (
                                <p className="text-red-500 col-span-4">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Input
                                id="description"
                                {...register("description", {
                                    required: "Task description is required",
                                })}
                                className="col-span-3"
                                placeholder="Task description"
                            />
                            {errors.description && (
                                <p className="text-red-500 col-span-4">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>
                        <DialogFooter className="sm:justify-end">
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => setIsDialogOpen(false)}
                                >
                                    Close
                                </Button>
                            </DialogClose>
                            <Button type="submit">
                                {editingTask ? "Save Changes" : "Save"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {successMessage && (
                <div className="bg-green-100 text-green-700 p-2 rounded">
                    {successMessage}
                </div>
            )}

            {/* Lista de tarefas */}
            <div className="border rounded-lg p-4 w-full max-w-4xl break-words whitespace-normal">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-center">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow
                                key={task.id}
                                className={
                                    task.isComplete
                                        ? "bg-green-100 text-green-700"
                                        : ""
                                }
                            >
                                <TableCell>{task.name}</TableCell>
                                <TableCell>{task.description}</TableCell>
                                <TableCell className="flex gap-1 flex-wrap justify-center">
                                    <Button
                                        className="p-3"
                                        onClick={() =>
                                            handleDeleteTask(task.id)
                                        }
                                    >
                                        <Trash2 />
                                    </Button>
                                    <Button
                                        className="p-3"
                                        onClick={() => handleEditTask(task)}
                                    >
                                        <Pencil />
                                    </Button>
                                    <Button
                                        className="p-3"
                                        onClick={() =>
                                            handleTaskComplete(task.id)
                                        }
                                        disabled={task.isComplete}
                                    >
                                        <Check />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter className="bg-transparent">
                        <TableRow>
                            <TableCell className="pt-6 font-semibold">
                                Total tasks:{" "}
                                <span className="font-bold">
                                    {tasks.length}
                                </span>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    );
}
