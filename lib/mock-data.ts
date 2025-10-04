import { Ticket, TicketActivity, KnowledgeBaseArticle, User, AnalyticsData } from './types';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'admin@powergrid.in',
    full_name: 'Rajesh Kumar',
    department: 'IT Administration',
    role: 'admin',
  },
  {
    id: 'user-2',
    email: 'agent1@powergrid.in',
    full_name: 'Priya Sharma',
    department: 'Network Support',
    role: 'agent',
  },
  {
    id: 'user-3',
    email: 'agent2@powergrid.in',
    full_name: 'Amit Patel',
    department: 'IT Support',
    role: 'agent',
  },
  {
    id: 'user-4',
    email: 'user@powergrid.in',
    full_name: 'Sunita Verma',
    department: 'Operations',
    role: 'user',
  },
];

export const mockTickets: Ticket[] = [
  {
    id: 'T001',
    subject: 'VPN not connecting',
    description: 'Unable to connect to corporate VPN from remote location. Getting timeout error after authentication.',
    priority: 'High',
    status: 'Open',
    category: 'Network',
    assigned_team: 'Network Support',
    created_by: 'user-4',
    assigned_to: 'user-2',
    created_at: '2025-10-01T09:30:00Z',
    updated_at: '2025-10-01T09:30:00Z',
  },
  {
    id: 'T002',
    subject: 'Email access issue',
    description: 'Cannot access email from Outlook. Getting authentication failed error repeatedly.',
    priority: 'Medium',
    status: 'In Progress',
    category: 'Email',
    assigned_team: 'IT Support',
    created_by: 'user-4',
    assigned_to: 'user-3',
    created_at: '2025-10-02T10:15:00Z',
    updated_at: '2025-10-03T14:20:00Z',
  },
  {
    id: 'T003',
    subject: 'Password reset required',
    description: 'Need to reset my domain password as it has expired.',
    priority: 'Low',
    status: 'Resolved',
    category: 'Account',
    assigned_team: 'Service Desk',
    created_by: 'user-4',
    assigned_to: 'user-3',
    created_at: '2025-10-03T11:00:00Z',
    updated_at: '2025-10-03T11:30:00Z',
    resolved_at: '2025-10-03T11:30:00Z',
  },
  {
    id: 'T004',
    subject: 'Software installation request',
    description: 'Need Adobe Acrobat Pro installed on my workstation for document processing.',
    priority: 'Medium',
    status: 'Open',
    category: 'Software',
    assigned_team: 'IT Support',
    created_by: 'user-4',
    assigned_to: 'user-3',
    created_at: '2025-10-03T14:45:00Z',
    updated_at: '2025-10-03T14:45:00Z',
  },
  {
    id: 'T005',
    subject: 'Printer not responding',
    description: 'Network printer on 3rd floor not responding to print jobs.',
    priority: 'High',
    status: 'In Progress',
    category: 'Hardware',
    assigned_team: 'IT Support',
    created_by: 'user-4',
    assigned_to: 'user-3',
    created_at: '2025-10-04T08:20:00Z',
    updated_at: '2025-10-04T09:10:00Z',
  },
  {
    id: 'T006',
    subject: 'Slow internet connection',
    description: 'Internet speed is extremely slow in the west wing office area.',
    priority: 'Medium',
    status: 'Open',
    category: 'Network',
    assigned_team: 'Network Support',
    created_by: 'user-4',
    assigned_to: 'user-2',
    created_at: '2025-10-04T10:00:00Z',
    updated_at: '2025-10-04T10:00:00Z',
  },
  {
    id: 'T007',
    subject: 'Database connection timeout',
    description: 'Application cannot connect to central database. Getting timeout after 30 seconds.',
    priority: 'Critical',
    status: 'Open',
    category: 'Database',
    assigned_team: 'IT Support',
    created_by: 'user-4',
    assigned_to: 'user-1',
    created_at: '2025-10-04T11:15:00Z',
    updated_at: '2025-10-04T11:15:00Z',
  },
  {
    id: 'T008',
    subject: 'Access card not working',
    description: 'My access card is not opening the server room door.',
    priority: 'Low',
    status: 'Resolved',
    category: 'Access',
    assigned_team: 'Security',
    created_by: 'user-4',
    assigned_to: 'user-2',
    created_at: '2025-10-02T13:30:00Z',
    updated_at: '2025-10-02T15:00:00Z',
    resolved_at: '2025-10-02T15:00:00Z',
  },
];

export const mockTicketActivities: Record<string, TicketActivity[]> = {
  T001: [
    {
      id: 'act-1',
      ticket_id: 'T001',
      user_id: 'user-4',
      user_name: 'Sunita Verma',
      activity_type: 'comment',
      content: 'I have tried restarting my computer and router but the issue persists.',
      created_at: '2025-10-01T10:00:00Z',
    },
    {
      id: 'act-2',
      ticket_id: 'T001',
      user_id: 'user-2',
      user_name: 'Priya Sharma',
      activity_type: 'comment',
      content: 'Please try connecting using the alternate VPN server vpn2.powergrid.in',
      created_at: '2025-10-01T10:30:00Z',
    },
  ],
  T002: [
    {
      id: 'act-3',
      ticket_id: 'T002',
      user_id: 'user-3',
      user_name: 'Amit Patel',
      activity_type: 'status_change',
      old_value: 'Open',
      new_value: 'In Progress',
      created_at: '2025-10-02T11:00:00Z',
    },
    {
      id: 'act-4',
      ticket_id: 'T002',
      user_id: 'user-3',
      user_name: 'Amit Patel',
      activity_type: 'comment',
      content: 'I am resetting your email password. You should receive a reset link shortly.',
      created_at: '2025-10-02T11:15:00Z',
    },
    {
      id: 'act-5',
      ticket_id: 'T002',
      user_id: 'user-4',
      user_name: 'Sunita Verma',
      activity_type: 'comment',
      content: 'I received the link and reset my password, but still facing the same issue.',
      created_at: '2025-10-03T14:20:00Z',
    },
  ],
  T003: [
    {
      id: 'act-6',
      ticket_id: 'T003',
      user_id: 'user-3',
      user_name: 'Amit Patel',
      activity_type: 'comment',
      content: 'Password has been reset. Please check your email for temporary credentials.',
      created_at: '2025-10-03T11:15:00Z',
    },
    {
      id: 'act-7',
      ticket_id: 'T003',
      user_id: 'user-3',
      user_name: 'Amit Patel',
      activity_type: 'status_change',
      old_value: 'In Progress',
      new_value: 'Resolved',
      created_at: '2025-10-03T11:30:00Z',
    },
  ],
  T005: [
    {
      id: 'act-8',
      ticket_id: 'T005',
      user_id: 'user-3',
      user_name: 'Amit Patel',
      activity_type: 'status_change',
      old_value: 'Open',
      new_value: 'In Progress',
      created_at: '2025-10-04T08:45:00Z',
    },
    {
      id: 'act-9',
      ticket_id: 'T005',
      user_id: 'user-3',
      user_name: 'Amit Patel',
      activity_type: 'comment',
      content: 'Technician dispatched to check the printer. Should be resolved within an hour.',
      created_at: '2025-10-04T09:10:00Z',
    },
  ],
};

export const mockKnowledgeBase: KnowledgeBaseArticle[] = [
  {
    id: 'kb-1',
    title: 'VPN Access Troubleshooting',
    summary: 'Step-by-step guide to resolve common VPN connectivity issues including timeout errors and authentication problems.',
    content: `# VPN Access Troubleshooting

## Common Issues and Solutions

### 1. Connection Timeout
If you're experiencing timeout errors:
- Verify your internet connection is stable
- Try connecting to alternate VPN server: vpn2.powergrid.in
- Check if your firewall is blocking VPN ports (UDP 1194, TCP 443)
- Restart the VPN client application

### 2. Authentication Failed
- Ensure you're using your domain credentials
- Check if your password has expired
- Clear saved credentials and re-enter them
- Contact IT Support if issue persists

### 3. Slow VPN Performance
- Connect to the nearest VPN server
- Close bandwidth-intensive applications
- Check your local internet speed
- Report persistent issues to Network Support`,
    tags: ['network', 'vpn', 'connectivity', 'troubleshooting'],
    category: 'Network',
    author_id: 'user-2',
    author_name: 'Priya Sharma',
    views: 245,
    helpful_count: 89,
    created_at: '2025-09-25T10:00:00Z',
    updated_at: '2025-09-25T10:00:00Z',
  },
  {
    id: 'kb-2',
    title: 'Email Setup Guide',
    summary: 'Complete guide for setting up email on desktop and mobile devices including Outlook configuration.',
    content: `# Email Setup Guide

## Outlook Desktop Configuration

### Step 1: Add Account
1. Open Outlook
2. Click File > Add Account
3. Enter your email: firstname.lastname@powergrid.in

### Step 2: Server Settings
- Incoming server: mail.powergrid.in
- Port: 993 (SSL)
- Outgoing server: smtp.powergrid.in
- Port: 587 (TLS)

### Step 3: Authentication
- Use your domain credentials
- Username: domain\\username
- Password: Your domain password

## Mobile Setup (iOS/Android)
1. Open email app settings
2. Add account > Exchange
3. Enter email and password
4. Server: mail.powergrid.in
5. Complete setup wizard`,
    tags: ['email', 'account', 'setup', 'outlook'],
    category: 'Email',
    author_id: 'user-3',
    author_name: 'Amit Patel',
    views: 198,
    helpful_count: 76,
    created_at: '2025-09-20T14:30:00Z',
    updated_at: '2025-09-20T14:30:00Z',
  },
  {
    id: 'kb-3',
    title: 'Password Reset Procedure',
    summary: 'How to reset your domain password and security best practices.',
    content: `# Password Reset Procedure

## Self-Service Password Reset

### Requirements
- Active employee ID
- Registered mobile number
- Security questions answered

### Steps
1. Visit: https://password.powergrid.in
2. Enter your employee ID
3. Choose verification method (SMS/Email)
4. Enter verification code
5. Create new password

## Password Requirements
- Minimum 12 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character
- Cannot reuse last 5 passwords

## Contact Support
If self-service reset fails:
- Call IT Helpdesk: 1800-XXX-XXXX
- Email: support@powergrid.in
- Raise a ticket in AI-CENTRAL`,
    tags: ['password', 'security', 'account', 'reset'],
    category: 'Account',
    author_id: 'user-1',
    author_name: 'Rajesh Kumar',
    views: 412,
    helpful_count: 156,
    created_at: '2025-09-15T09:00:00Z',
    updated_at: '2025-09-28T11:20:00Z',
  },
  {
    id: 'kb-4',
    title: 'Printer Configuration and Troubleshooting',
    summary: 'Guide to add network printers and resolve common printing issues.',
    content: `# Printer Configuration

## Adding Network Printer

### Windows
1. Open Settings > Devices > Printers & Scanners
2. Click "Add a printer or scanner"
3. Select network printer from list
4. Or add by IP: \\\\printserver\\printer-name

### Common Printer Names
- Floor 1: PG-PR-F1-001
- Floor 2: PG-PR-F2-001
- Floor 3: PG-PR-F3-001

## Troubleshooting

### Printer Not Responding
1. Check printer power and network cable
2. Restart print spooler service
3. Remove and re-add printer
4. Contact IT Support if unresolved

### Print Quality Issues
- Clean print heads
- Check toner/ink levels
- Use correct paper type
- Update printer drivers`,
    tags: ['printer', 'hardware', 'troubleshooting', 'printing'],
    category: 'Hardware',
    author_id: 'user-3',
    author_name: 'Amit Patel',
    views: 167,
    helpful_count: 52,
    created_at: '2025-09-18T13:15:00Z',
    updated_at: '2025-09-18T13:15:00Z',
  },
  {
    id: 'kb-5',
    title: 'Software Installation Request Process',
    summary: 'How to request installation of authorized software on your workstation.',
    content: `# Software Installation Request

## Approved Software List
Visit the IT Portal for the complete list of pre-approved software.

## Request Process

### Step 1: Check Approval Status
- Review approved software catalog
- Verify license availability
- Confirm business justification

### Step 2: Submit Request
1. Login to AI-CENTRAL
2. Create new ticket
3. Category: Software Installation
4. Provide:
   - Software name and version
   - Business justification
   - Manager approval

### Step 3: Approval Process
- Auto-approved: Standard software (1-2 days)
- Manager approval: Specialized software (3-5 days)
- Security review: Development tools (5-7 days)

## Installation
- IT Support will schedule installation
- Some software requires admin rights
- Remote installation available for VPN users

## Support
Questions? Contact: software-requests@powergrid.in`,
    tags: ['software', 'installation', 'request', 'approval'],
    category: 'Software',
    author_id: 'user-1',
    author_name: 'Rajesh Kumar',
    views: 289,
    helpful_count: 98,
    created_at: '2025-09-22T10:45:00Z',
    updated_at: '2025-09-22T10:45:00Z',
  },
];

export const mockAnalytics: AnalyticsData = {
  ticketVolume: [30, 45, 22, 60, 38, 52],
  avgResolution: [12, 8, 10, 7, 9, 6],
  teamPerformance: [
    { team: 'Network Support', score: 85 },
    { team: 'IT Support', score: 92 },
    { team: 'Service Desk', score: 88 },
    { team: 'Security', score: 79 },
  ],
  categoryDistribution: [
    { category: 'Network', count: 45 },
    { category: 'Email', count: 32 },
    { category: 'Hardware', count: 28 },
    { category: 'Software', count: 38 },
    { category: 'Account', count: 25 },
    { category: 'Access', count: 15 },
  ],
};
