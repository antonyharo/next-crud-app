"use client";

import { useState } from "react";
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
import { Trash2, Check } from "lucide-react";

export default function Home() {
    // Estado para armazenar as tarefas
    const [tasks, setTasks] = useState([
        {
            id: "1",
            name: "TASK 1",
            description: "fazer serviço do Anselmo e ficar milionário!",
        },
    ]);

    // Estado para os inputs
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    // Função para adicionar uma nova task
    const handleSaveTask = () => {
        if (taskName.trim() === "" || taskDescription.trim() === "") return;

        const newTask = {
            id: crypto.randomUUID(), // Gera um ID único
            name: taskName,
            description: taskDescription,
        };

        setTasks([...tasks, newTask]);
        setTaskName(""); // Limpa o campo
        setTaskDescription(""); // Limpa o campo
    };

    return (
        <div className="p-6 mx-auto space-y-6 flex flex-col items-center justify-center min-h-screen">
            {/* Dialog para criar nova Task */}
            <Dialog>
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
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                className="col-span-3"
                                placeholder="Task name"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Input
                                id="description"
                                value={taskDescription}
                                onChange={(e) =>
                                    setTaskDescription(e.target.value)
                                }
                                className="col-span-3"
                                placeholder="Task description"
                            />
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-end">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="button" onClick={handleSaveTask}>
                                Save
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Lista de tarefas */}
            <div className="border rounded-lg p-4">
                <Table>
                    <TableHeader>
                        <TableRow className="space-x-6">
                            <TableHead className="px-6">Name</TableHead>
                            <TableHead className="px-6 text-left">
                                Description
                            </TableHead>
                            <TableHead className="px-6 text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.id} className="space-x-6">
                                <TableCell className="px-6 whitespace-normal">
                                    {task.name}
                                </TableCell>
                                <TableCell className="px-6 text-left whitespace-normal">
                                    {task.description}
                                </TableCell>
                                <TableCell className="flex gap-1 flex-wrap">
                                    <Button className="p-3">
                                        <Trash2 />
                                    </Button>
                                    <Button className="p-3">
                                        <Check />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter className="bg-transparent">
                        <TableRow>
                            <TableCell className="pt-6 font-semibold px-6">
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
