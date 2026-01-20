"use client"

import { ColumnDef } from "@tanstack/react-table"
import { NewsArticle } from "@/lib/news"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from 'date-fns';

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
]
