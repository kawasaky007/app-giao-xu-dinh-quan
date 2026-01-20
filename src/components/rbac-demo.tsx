"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, XCircle, Loader2, User, FileText, BarChart, Hand } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { CheckResourceAccessOutput } from "@/ai/flows/role-based-resource-access";
import { handleCheckAccess } from "@/app/actions";

const formSchema = z.object({
  userRole: z.enum(["admin", "editor", "author"]),
  resourceType: z.enum(["posts", "comments"]),
  operationType: z.enum(["view", "edit", "create", "delete"]),
});

type FormValues = z.infer<typeof formSchema>;

export default function RbacDemo() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CheckResourceAccessOutput | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userRole: "author",
      resourceType: "posts",
      operationType: "view",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setResult(null);
    const res = await handleCheckAccess(values);
    setResult(res);
    setIsLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Access Control Simulator</CardTitle>
          <CardDescription>
            Select a role, resource, and operation to check if access is permitted by the AI model.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <FormField
                control={form.control}
                name="userRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="author">Author</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resourceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resource</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a resource" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="posts">Posts</SelectItem>
                        <SelectItem value="comments">Comments</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="operationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Operation</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an operation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="view">View</SelectItem>
                        <SelectItem value="edit">Edit</SelectItem>
                        <SelectItem value="create">Create</SelectItem>
                        <SelectItem value="delete">Delete</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
            <Button 
                onClick={form.handleSubmit(onSubmit)} 
                className="w-full sm:w-auto" 
                disabled={isLoading}
                size="lg"
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Check Access
            </Button>
            {result && (
                <Card className={`w-full mt-4 ${result.hasAccess ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`}>
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                        {result.hasAccess ? (
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                            </div>
                        ) : (
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                                <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                            </div>
                        )}
                        <div>
                            <CardTitle className={`font-headline text-2xl ${result.hasAccess ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                                Access {result.hasAccess ? "Granted" : "Denied"}
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className={`text-sm ${result.hasAccess ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                            {result.reason}
                        </p>
                    </CardContent>
                </Card>
            )}
        </CardFooter>
      </Card>
    </div>
  );
}
