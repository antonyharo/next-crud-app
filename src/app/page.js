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
import { Trash2, Check, Pencil } from "lucide-react";

export default function Home() {
    const [tasks, setTasks] = useState([
        {
            id: "1",
            name: "TASK 1",
            description: "Fazer serviço do Anselmo e ficar milionário!",
        },
    ]);
    const [successMessage, setSuccessMessage] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // Função para adicionar uma nova task
    const onSubmit = (data) => {
        if (errors.name || errors.description) return;
        
        const newTask = {
            id: crypto.randomUUID(),
            name: data.name,
            description: data.description,
        };

        setTasks([...tasks, newTask]);
        reset(); // Limpa o formulário
        setSuccessMessage("Task added successfully!");
        setTimeout(() => setSuccessMessage(""), 3000); // Esconde a mensagem após 3s
        setIsDialogOpen(false); // Fecha o diálogo
    };

    const handleTaskComplete = (task) => {
        console.log(task);
    };

    return (
        <div className="p-6 mx-auto space-y-6 flex flex-col items-center justify-center min-h-screen">
            {successMessage && (
                <div className="bg-green-100 text-green-700 p-2 rounded">
                    {successMessage}
                </div>
            )}
            {/* Dialog para criar nova task */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">New Task</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>New Task</DialogTitle>
                        <DialogDescription>
                            Create a new task here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                {...register("name", { required: "Task name is required" })}
                                className="col-span-3"
                                placeholder="Task name"
                            />
                            {errors.name && <p className="text-red-500 col-span-4">{errors.name.message}</p>}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Input
                                id="description"
                                {...register("description", { required: "Task description is required" })}
                                className="col-span-3"
                                placeholder="Task description"
                            />
                            {errors.description && <p className="text-red-500 col-span-4">{errors.description.message}</p>}
                        </div>
                        <DialogFooter className="sm:justify-end">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary" onClick={() => setIsDialogOpen(false)}>Close</Button>
                            </DialogClose>
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Lista de tarefas */}
            <div className="border rounded-lg p-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="px-6">Name</TableHead>
                            <TableHead className="px-6 text-left">Description</TableHead>
                            <TableHead className="px-6 text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell className="px-6 whitespace-normal">{task.name}</TableCell>
                                <TableCell className="px-6 text-left whitespace-normal">{task.description}</TableCell>
                                <TableCell className="flex gap-1 flex-wrap">
                                    <Button className="p-3">
                                        <Trash2 />
                                    </Button>
                                    <Button className="p-3">
                                        <Pencil />
                                    </Button>
                                    <Button className="p-3" onClick={() => handleTaskComplete(task)}>
                                        <Check />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter className="bg-transparent">
                        <TableRow>
                            <TableCell className="pt-6 font-semibold px-6">
                                Total tasks: <span className="font-bold">{tasks.length}</span>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    );
}
