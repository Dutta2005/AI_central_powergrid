'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTicketStore } from '@/lib/stores/ticket-store';
import { CircleAlert as AlertCircle, CircleCheck as CheckCircle2, Clock, Plus, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { useChatStore } from '@/lib/stores/chat-store';

export default function DashboardPage() {
  const tickets = useTicketStore((state) => state.tickets);
  const toggleChat = useChatStore((state) => state.toggleChat);

  const stats = {
    open: tickets.filter((t) => t.status === 'Open').length,
    inProgress: tickets.filter((t) => t.status === 'In Progress').length,
    resolved: tickets.filter((t) => t.status === 'Resolved').length,
    total: tickets.length,
  };

  const recentTickets = tickets.slice(0, 5);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Closed':
        return 'bg-slate-100 text-slate-800 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600 mt-1">Overview of your support tickets and activities</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={toggleChat} variant="outline" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Ask AI Assistant
            </Button>
            <Button asChild className="gap-2 bg-[#004b87] hover:bg-[#003a6b]">
              <Link href="/tickets?new=true">
                <Plus className="w-4 h-4" />
                Create Ticket
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-blue-500 shadow-sm">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-blue-500" />
                Open Tickets
              </CardDescription>
              <CardTitle className="text-3xl font-bold">{stats.open}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-600">
                Awaiting assignment or review
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 shadow-sm">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-500" />
                In Progress
              </CardDescription>
              <CardTitle className="text-3xl font-bold">{stats.inProgress}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-600">
                Currently being worked on
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 shadow-sm">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Resolved
              </CardDescription>
              <CardTitle className="text-3xl font-bold">{stats.resolved}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-600">
                Successfully completed
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-slate-500 shadow-sm">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                Total Tickets
              </CardDescription>
              <CardTitle className="text-3xl font-bold">{stats.total}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-600">
                All tickets in the system
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Tickets</CardTitle>
                <CardDescription>Latest support requests and their status</CardDescription>
              </div>
              <Button variant="outline" asChild>
                <Link href="/tickets">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned Team</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTickets.map((ticket) => (
                  <TableRow key={ticket.id} className="cursor-pointer hover:bg-slate-50">
                    <TableCell>
                      <Link
                        href={`/tickets/${ticket.id}`}
                        className="font-mono text-sm font-medium text-[#004b87] hover:underline"
                      >
                        {ticket.id}
                      </Link>
                    </TableCell>
                    <TableCell className="font-medium">{ticket.subject}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600">{ticket.assigned_team}</TableCell>
                    <TableCell className="text-slate-600">
                      {format(new Date(ticket.created_at), 'MMM dd, yyyy')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/tickets?new=true">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Ticket
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/knowledge-base">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Browse Knowledge Base
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={toggleChat}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat with AI Assistant
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Current system health and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">All Systems Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Average Response Time: 6 mins</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
