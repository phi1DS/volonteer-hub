import { ReactNode } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Task } from "@/types/models";

interface TaskCardProps {
  cardFooter?: ReactNode;
  task: Task;
}

export default function TaskCard({cardFooter, task}: TaskCardProps) {
    const truncate = (text: string, maxLength = 400) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "…" : text
    }

    return(
        <Card className="rounded-xl shadow-sm flex justify-between">
            <div>
                <CardHeader>
                    <CardTitle>{task.subject}</CardTitle>
                    <p className="text-sm text-gray-500 mt-3">
                        Organisation : {task.organisation || "No organisation"}
                    </p>
                    <p className="text-sm text-gray-500">
                        Created By : {task.user?.name ?? "No user assigned"}
                    </p>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-700 mb-2 mt-4">{truncate(task.message)}</p>
                    <p className="text-sm text-gray-500 mt-4">{task.contact_information}</p>
                    <p className="text-sm text-gray-500">
                        From:{" "}
                        {new Date(task.date_start).toLocaleString("fr-FR", {
                            dateStyle: "short",
                            timeStyle: "short",
                        })}
                    </p>
                    <p className="text-sm text-gray-500">
                        To:{" "}
                        {new Date(task.date_end).toLocaleString("fr-FR", {
                            dateStyle: "short",
                            timeStyle: "short",
                        })}
                    </p>
                </CardContent>
            </div>
            
            { cardFooter }
        </Card>
    );
}