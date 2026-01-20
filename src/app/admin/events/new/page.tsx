'use client';

import EventForm from "@/components/admin/event-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewEventPage() {
  return (
    <div className="space-y-6">
        <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="icon">
                <Link href="/admin/events">
                    <ArrowLeft className="h-4 w-4" />
                </Link>
            </Button>
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Tạo Sự Kiện Mới</h1>
                <p className="text-muted-foreground">Điền vào biểu mẫu bên dưới để tạo một sự kiện mới.</p>
            </div>
        </div>
        <EventForm />
    </div>
  );
}
