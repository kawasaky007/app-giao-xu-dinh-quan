'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, LineChart } from 'lucide-react';
import { Bar, BarChart as RechartsBarChart, Line, LineChart as RechartsLineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const pageViewsData = [
  { date: 'Jan', pageViews: 2300 },
  { date: 'Feb', pageViews: 2900 },
  { date: 'Mar', pageViews: 3200 },
  { date: 'Apr', pageViews: 2800 },
  { date: 'May', pageViews: 3500 },
  { date: 'Jun', pageViews: 4100 },
];

const submissionsData = [
  { name: 'Liên hệ', count: 45 },
  { name: 'Đăng ký', count: 28 },
  { name: 'Tình nguyện', count: 12 },
];


function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Chào mừng đến Trang Quản trị</h1>
        <p className="text-muted-foreground">Đây là tổng quan về trang web của bạn.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Tổng số người dùng</CardTitle>
            <CardDescription>Số lượng người dùng đã đăng ký.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">1,234</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Bài viết</CardTitle>
            <CardDescription>Tổng số bài viết tin tức.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">58</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sự kiện</CardTitle>
            <CardDescription>Số sự kiện sắp tới.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">3</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><LineChart className="w-5 h-5"/> Lượt xem trang</CardTitle>
            <CardDescription>Lượt xem trang trong 6 tháng qua.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={pageViewsData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="pageViews" stroke="hsl(var(--primary))" />
                </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BarChart className="w-5 h-5"/> Gửi biểu mẫu</CardTitle>
            <CardDescription>Số lượng biểu mẫu đã được gửi.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart data={submissionsData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--primary))" />
                </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
