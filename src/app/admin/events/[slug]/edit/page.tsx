import EventForm from "@/components/admin/event-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getEventBySlug } from "@/lib/events";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string }
}

export default async function EditEventPage({ params }: Props) {
  const { slug } = params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="space-y-6">
        <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="icon">
                <Link href="/admin/events">
                    <ArrowLeft className="h-4 w-4" />
                </Link>
            </Button>
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Chỉnh Sửa Sự Kiện</h1>
                <p className="text-muted-foreground">Cập nhật thông tin cho sự kiện: {event.title}</p>
            </div>
        </div>
        <EventForm event={event} />
    </div>
  );
}
