import { create } from 'zustand';
import { ChatMessage } from '../types';

interface ChatState {
  isOpen: boolean;
  messages: ChatMessage[];
  isTyping: boolean;
  toggleChat: () => void;
  sendMessage: (content: string) => Promise<void>;
  getBotResponse: (userMessage: string) => string;
}

const botResponses: Record<string, string> = {
  vpn: "I can help with VPN issues. Common solutions include:\n1. Try connecting to vpn2.powergrid.in\n2. Check your firewall settings\n3. Restart the VPN client\n\nWould you like me to create a ticket for this issue?",
  email: "For email access problems:\n1. Verify your credentials\n2. Check if your password has expired\n3. Try clearing saved credentials\n\nI can raise a ticket with IT Support if needed.",
  password: "For password resets, you can:\n1. Visit https://password.powergrid.in\n2. Use self-service reset with your employee ID\n3. Or I can create a ticket for you\n\nWhich would you prefer?",
  printer: "Printer issues? Let's troubleshoot:\n1. Check printer power and connections\n2. Verify the printer is online\n3. Restart print spooler\n\nShall I create a support ticket for you?",
  ticket: "I'd be happy to help you create a ticket! Please provide:\n1. Brief description of the issue\n2. Priority level (Low/Medium/High)\n3. Category (Network/Email/Hardware/etc.)\n\nOr you can create one directly from the dashboard.",
  default: "I'm here to help! I can assist with:\n• VPN connectivity issues\n• Email access problems\n• Password resets\n• Printer troubleshooting\n• Creating support tickets\n\nWhat can I help you with today?"
};

export const useChatStore = create<ChatState>((set, get) => ({
  isOpen: false,
  messages: [
    {
      id: '1',
      role: 'bot',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date().toISOString(),
    },
  ],
  isTyping: false,
  toggleChat: () => {
    set((state) => ({ isOpen: !state.isOpen }));
  },
  sendMessage: async (content) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    set((state) => ({
      messages: [...state.messages, userMessage],
      isTyping: true,
    }));

    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const botResponse = get().getBotResponse(content);
    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'bot',
      content: botResponse,
      timestamp: new Date().toISOString(),
    };

    set((state) => ({
      messages: [...state.messages, botMessage],
      isTyping: false,
    }));
  },
  getBotResponse: (userMessage: string) => {
    const message = userMessage.toLowerCase();

    if (message.includes('vpn') || message.includes('connection')) {
      return botResponses.vpn;
    } else if (message.includes('email') || message.includes('outlook')) {
      return botResponses.email;
    } else if (message.includes('password') || message.includes('reset')) {
      return botResponses.password;
    } else if (message.includes('printer') || message.includes('print')) {
      return botResponses.printer;
    } else if (message.includes('ticket') || message.includes('create') || message.includes('raise')) {
      return botResponses.ticket;
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! 👋 I'm here to assist you with your IT support needs. What brings you here today?";
    } else if (message.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with?";
    } else if (message.includes('bye') || message.includes('goodbye')) {
      return "Goodbye! Feel free to reach out anytime you need assistance. Have a great day!";
    }

    return botResponses.default;
  },
}));
