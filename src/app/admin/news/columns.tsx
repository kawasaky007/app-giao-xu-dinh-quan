"use client"

import { ColumnDef } from "@tanstack/react-table"
import { NewsArticle, deleteArticle } from "@/lib/news"
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


const handleDelete = async (id: string, toast: any) => {
    if (!confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
        return;
    }
    try {
        await deleteArticle(id);
        toast({ title: "Thành công", description: "Đã xóa bài viết." });
        // You might need a way to refresh the data in the parent component
    } catch (error) {
        console.error("Failed to delete article:", error);
        toast({ variant: "destructive", title: "Lỗi", description: "Không thể xóa bài viết." });
    }
};

export const columns: ColumnDef<NewsArticle>[] = [
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
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return <Badge variant={status === 'published' ? 'default' : 'secondary'}>{status}</Badge>
    },
  },
  {
    accessorKey: "category",
    header: "Chuyên mục",
  },
  {
    accessorKey: "author",
    header: "Tác giả",
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ngày đăng
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({ row }) => {
        const date = row.getValue("date") as string;
        return <div>{format(new Date(date), 'dd/MM/yyyy')}</div>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const article = row.original
      const { toast } = useToast();

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
                <Link href={`/admin/news/edit/${article.slug}`}>Chỉnh sửa</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href={`/news/${article.slug}`} target="_blank">Xem trước</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
                onClick={() => handleDelete(article.id!, toast)}
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
