export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';
export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';
export type UserRole = 'admin' | 'agent' | 'user';
export type ActivityType = 'comment' | 'status_change' | 'assignment' | 'priority_change';

export interface User {
  id: string;
  email: string;
  full_name: string;
  department: string;
  avatar_url?: string;
  role: UserRole;
}

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  priority: Priority;
  status: TicketStatus;
  category: string;
  assigned_team: string;
  created_by: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
}

export interface TicketActivity {
  id: string;
  ticket_id: string;
  user_id: string;
  user_name: string;
  activity_type: ActivityType;
  content?: string;
  old_value?: string;
  new_value?: string;
  created_at: string;
}

export interface KnowledgeBaseArticle {
  id: string;
  title: string;
  content: string;
  summary: string;
  tags: string[];
  category: string;
  author_id: string;
  author_name: string;
  views: number;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: string;
}

export interface ChatConversation {
  id: string;
  user_id: string;
  messages: ChatMessage[];
  status: 'active' | 'resolved' | 'escalated';
  created_at: string;
  updated_at: string;
}

export interface TicketStats {
  open: number;
  in_progress: number;
  resolved: number;
  total: number;
}

export interface AnalyticsData {
  ticketVolume: number[];
  avgResolution: number[];
  teamPerformance: { team: string; score: number }[];
  categoryDistribution: { category: string; count: number }[];
}
