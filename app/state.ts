import { create } from "zustand";
import { getEmails, getEmail } from "./actions";

export interface Email {
  id: string;
  from: {
    name: string;
    email: string;
  };
  body?: string;
  subject: string;
  short_description: string;
  date: number;
  isRead: boolean;
  isFavorite: boolean;
}

interface EmailStore {
  selectedEmail: Email | null;
  emailList: Email[];
  filter: string;
  loading: boolean;
  setFilter: (filter: string) => void;
  setLoading: (loading: boolean) => void;
  setSelectedEmail: (email: Email | null) => void;
  handleEmailSelect: (email: Email) => Promise<void>;
  toggleFavorite: (email: Email) => void;
  fetchEmails: () => Promise<void>;
  fetchEmailBody: (email: Email) => Promise<void>;
  filteredEmails: () => Email[];
}

export const useEmailStore = create<EmailStore>((set, get) => ({
  selectedEmail: null,
  emailList: [],
  filter: "all",
  loading: false,

  setFilter: (filter) => set({ filter }),
  setLoading: (loading) => set({ loading }),

  setSelectedEmail: (email) => set({ selectedEmail: email }),

  handleEmailSelect: async (email) => {
    set({ loading: true });
    await get().fetchEmailBody(email);
    set((state) => ({
      emailList: state.emailList.map((e) =>
        e.id === email.id ? { ...e, isRead: true } : e,
      ),
      // selectedEmail: { ...email, isRead: true },
      loading: false,
    }));
  },

  toggleFavorite: (email) => {
    set((state) => ({
      emailList: state.emailList.map((e) =>
        e.id === email.id ? { ...e, isFavorite: !e.isFavorite } : e,
      ),
      selectedEmail:
        state.selectedEmail?.id === email.id
          ? { ...email, isFavorite: !email.isFavorite }
          : state.selectedEmail,
    }));
  },

  fetchEmails: async () => {
    set({ loading: true });
    const emails = await getEmails();
    set({ emailList: emails, loading: false });
  },

  fetchEmailBody: async (email: Email) => {
    set({ loading: true });
    const body = await getEmail(parseInt(email.id));
    set((state) => ({
      selectedEmail: { ...email, body: body.body, isRead: true },
      loading: false,
    }));
  },

  filteredEmails: () => {
    const { emailList, filter } = get();
    return emailList.filter((email) => {
      if (filter === "unread") return !email.isRead;
      if (filter === "read") return email.isRead;
      if (filter === "favorites") return email.isFavorite;
      return true;
    });
  },
}));
