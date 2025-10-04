import { create } from 'zustand';
import { Ticket, TicketStatus, Priority } from '../types';
import { mockTickets } from '../mock-data';

interface TicketState {
  tickets: Ticket[];
  filters: {
    status: TicketStatus | 'All';
    priority: Priority | 'All';
    search: string;
  };
  setFilters: (filters: Partial<TicketState['filters']>) => void;
  getFilteredTickets: () => Ticket[];
  getTicketById: (id: string) => Ticket | undefined;
  createTicket: (ticket: Omit<Ticket, 'id' | 'created_at' | 'updated_at'>) => Promise<Ticket>;
  updateTicketStatus: (id: string, status: TicketStatus) => Promise<void>;
}

export const useTicketStore = create<TicketState>((set, get) => ({
  tickets: mockTickets,
  filters: {
    status: 'All',
    priority: 'All',
    search: '',
  },
  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },
  getFilteredTickets: () => {
    const { tickets, filters } = get();
    return tickets.filter((ticket) => {
      const matchesStatus =
        filters.status === 'All' || ticket.status === filters.status;
      const matchesPriority =
        filters.priority === 'All' || ticket.priority === filters.priority;
      const matchesSearch =
        filters.search === '' ||
        ticket.subject.toLowerCase().includes(filters.search.toLowerCase()) ||
        ticket.id.toLowerCase().includes(filters.search.toLowerCase());
      return matchesStatus && matchesPriority && matchesSearch;
    });
  },
  getTicketById: (id) => {
    return get().tickets.find((t) => t.id === id);
  },
  createTicket: async (ticketData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newTicket: Ticket = {
      ...ticketData,
      id: `T${String(get().tickets.length + 1).padStart(3, '0')}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    set((state) => ({
      tickets: [newTicket, ...state.tickets],
    }));

    return newTicket;
  },
  updateTicketStatus: async (id, status) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.id === id
          ? {
              ...ticket,
              status,
              updated_at: new Date().toISOString(),
              resolved_at: status === 'Resolved' ? new Date().toISOString() : ticket.resolved_at,
            }
          : ticket
      ),
    }));
  },
}));
