'use client';

import { useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTicketStore } from '@/lib/stores/ticket-store';
import { mockTicketActivities, mockUsers } from '@/lib/mock-data';
import { mockKnowledgeBase } from '@/lib/mock-data';
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { toast } from 'sonner';
import { TicketStatus } from '@/lib/types';

export default function TicketDetailPage() {
  const params = useParams();
  const ticketId = params.id as string;
  const { getTicketById, updateTicketStatus } = useTicketStore();
  const ticket = getTicketById(ticketId);

  if (!ticket) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-slate-900">Ticket Not Found</h2>
          <p className="text-slate-600 mt-2">The ticket you're looking for doesn't exist.</p>
          <Button asChild className="mt-4">
            <Link href="/tickets">Back to Tickets</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const activities = mockTicketActivities[ticketId] || [];
  const createdByUser = mockUsers.find((u) => u.id === ticket.created_by);
  const assignedToUser = ticket.assigned_to ? mockUsers.find((u) => u.id === ticket.assigned_to) : null;
  const relatedArticles = mockKnowledgeBase.slice(0, 3);

  const handleStatusChange = async (newStatus: TicketStatus) => {
    await updateTicketStatus(ticketId, newStatus);
    toast.success(`Ticket status updated to ${newStatus}`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Closed': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/tickets">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900">Ticket {ticket.id}</h1>
            <p className="text-slate-600 mt-1">{ticket.subject}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{ticket.subject}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </div>
                  </div>
                  <Select value={ticket.status} onValueChange={(value) => handleStatusChange(value as TicketStatus)}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Description</h3>
                    <p className="text-slate-700 leading-relaxed">{ticket.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600">Created: {format(new Date(ticket.created_at), 'MMM dd, yyyy HH:mm')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600">Updated: {format(new Date(ticket.updated_at), 'MMM dd, yyyy HH:mm')}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                {activities.length === 0 ? (
                  <p className="text-slate-500 text-center py-8">No activity yet</p>
                ) : (
                  <div className="space-y-4">
                    {activities.map((activity, index) => (
                      <div key={activity.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-[#004b87] text-white flex items-center justify-center text-sm font-medium">
                            {activity.user_name.charAt(0)}
                          </div>
                          {index < activities.length - 1 && (
                            <div className="w-0.5 flex-1 bg-slate-200 mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-slate-900">{activity.user_name}</p>
                            <p className="text-xs text-slate-500">
                              {format(new Date(activity.created_at), 'MMM dd, HH:mm')}
                            </p>
                          </div>
                          {activity.activity_type === 'comment' && (
                            <p className="text-slate-700 mt-1">{activity.content}</p>
                          )}
                          {activity.activity_type === 'status_change' && (
                            <p className="text-slate-700 mt-1">
                              Changed status from <Badge variant="outline" className="mx-1">{activity.old_value}</Badge> to{' '}
                              <Badge variant="outline" className="mx-1">{activity.new_value}</Badge>
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">Category</p>
                  <p className="text-sm font-semibold text-slate-900 mt-1">{ticket.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Assigned Team</p>
                  <p className="text-sm font-semibold text-slate-900 mt-1">{ticket.assigned_team}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Created By</p>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="w-4 h-4 text-slate-400" />
                    <p className="text-sm font-semibold text-slate-900">{createdByUser?.full_name}</p>
                  </div>
                </div>
                {assignedToUser && (
                  <div>
                    <p className="text-sm font-medium text-slate-500">Assigned To</p>
                    <div className="flex items-center gap-2 mt-1">
                      <User className="w-4 h-4 text-slate-400" />
                      <p className="text-sm font-semibold text-slate-900">{assignedToUser.full_name}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Related Articles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {relatedArticles.map((article) => (
                  <Link
                    key={article.id}
                    href="/knowledge-base"
                    className="block p-3 rounded-lg border border-slate-200 hover:border-[#004b87] hover:bg-slate-50 transition-colors"
                  >
                    <p className="font-medium text-sm text-slate-900">{article.title}</p>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{article.summary}</p>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
