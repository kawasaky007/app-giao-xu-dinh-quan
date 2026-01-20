"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Event } from "@/lib/events"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { format } from 'date-fns';

export const columns: ColumnDef<Event>[] = [
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
]
