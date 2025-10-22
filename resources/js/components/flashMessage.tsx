import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FlashMessageProps {
  message?: string;
  type?: "success" | "error" | "info";
}

export default function FlashMessage({ message, type = "success" }: FlashMessageProps) {

  if (!message) return null;

  const colorClasses =
    type === "error"
      ? "text-red-800"
      : type === "info"
      ? "text-blue-800"
      : "text-green-800";

  const title =
    type === "error" ? "Error" : type === "info" ? "Info" : "Success";

  return (
    <Alert className={`flex justify-between items-start`}>
      <div>
        <AlertDescription className={colorClasses}>{message}</AlertDescription>
      </div>
    </Alert>
  );
}
