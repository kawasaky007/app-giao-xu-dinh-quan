"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Event, deleteEvent } from "@/lib/events"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { format } from 'date-fns';
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export const useEventColumns = () => {
    const { toast } = useToast();
    const router = useRouter();

    const handleDelete = async (id: string) => {
        if (!confirm('Bạn có chắc chắn muốn xóa sự kiện này không?')) {
            return;
        }
        try {
            await deleteEvent(id);
            toast({ title: "Thành công", description: "Đã xóa sự kiện." });
            router.refresh(); 
        } catch (error) {
            console.error("Failed to delete event:", error);
            toast({ variant: "destructive", title: "Lỗi", description: "Không thể xóa sự kiện." });
        }
    };

    const columns: ColumnDef<Event>[] = [
      {
        accessorKey: "title",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Tiêu đề
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
        cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
      },
      {
        accessorKey: "category",
        header: "Chuyên mục",
        cell: ({ row }) => {
            return <Badge variant='secondary'>{row.getValue("category")}</Badge>
        },
      },
      {
        accessorKey: "location",
        header: "Địa điểm",
      },
      {
        accessorKey: "date",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Ngày diễn ra
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
        cell: ({ row }) => {
            const date = row.getValue("date") as string;
            return <div>{format(new Date(date), 'dd/MM/yyyy HH:mm')}</div>
        }
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const event = row.original
    
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Mở menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                    <Link href={`/admin/events/edit/${event.id}`}>Chỉnh sửa</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/events/${event.slug}`} target="_blank">Xem trước</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                    onClick={() => handleDelete(event.id!)}
                    className="text-destructive focus:text-destructive"
                >
                    Xóa
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ]

    return columns;
}

export const columns = useEventColumns();
