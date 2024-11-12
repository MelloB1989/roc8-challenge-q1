"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Heart } from "lucide-react";

interface Email {
  id: string;
  from: {
    name: string;
    email: string;
  };
  subject: string;
  preview: string;
  timestamp: string;
  isRead: boolean;
  isFavorite: boolean;
}

// Simulated email data
const emails: Email[] = [
  {
    id: "1",
    from: {
      name: "Foo Bar",
      email: "foo.bar@gmail.com",
    },
    subject: "Lorem Ipsum",
    preview: "Aenean ut odio eu risus sollicitudin vehicula ...",
    timestamp: "26/02/2020 10:30am",
    isRead: false,
    isFavorite: true,
  },
  // Add more emails as needed
];

export default function Component() {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [emailList, setEmailList] = useState<Email[]>(emails);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  // Filter emails based on selected filter
  const filteredEmails = emailList.filter((email) => {
    if (filter === "unread") return !email.isRead;
    if (filter === "read") return email.isRead;
    if (filter === "favorites") return email.isFavorite;
    return true;
  });

  // Simulate loading email content
  const handleEmailSelect = async (email: Email) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Mark as read when selected
    setEmailList((prev) =>
      prev.map((e) => (e.id === email.id ? { ...e, isRead: true } : e)),
    );
    setSelectedEmail(email);
    setLoading(false);
  };

  // Toggle favorite status
  const toggleFavorite = (email: Email) => {
    setEmailList((prev) =>
      prev.map((e) =>
        e.id === email.id ? { ...e, isFavorite: !e.isFavorite } : e,
      ),
    );
    if (selectedEmail?.id === email.id) {
      setSelectedEmail({ ...email, isFavorite: !email.isFavorite });
    }
  };

  return (
    <div className="flex h-[600px] gap-4 p-4">
      {/* Email List */}
      <Card className="w-[400px]">
        <CardHeader className="p-4">
          <ToggleGroup
            type="single"
            value={filter}
            onValueChange={(value) => setFilter(value || "all")}
          >
            <ToggleGroupItem value="unread">Unread</ToggleGroupItem>
            <ToggleGroupItem value="read">Read</ToggleGroupItem>
            <ToggleGroupItem value="favorites">Favorites</ToggleGroupItem>
          </ToggleGroup>
        </CardHeader>
        <ScrollArea className="h-[calc(600px-80px)]">
          <CardContent className="space-y-4">
            {filteredEmails.map((email) => (
              <div
                key={email.id}
                onClick={() => handleEmailSelect(email)}
                className={`flex cursor-pointer gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50 ${
                  selectedEmail?.id === email.id ? "border-primary" : ""
                } ${!email.isRead ? "bg-muted/30 font-medium" : ""}`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive text-destructive-foreground">
                  {email.from.name[0]}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm leading-none">
                      From: {email.from.name} &lt;{email.from.email}&gt;
                    </p>
                    {email.isFavorite && (
                      <Heart className="h-4 w-4 fill-current text-destructive" />
                    )}
                  </div>
                  <p className="text-sm">Subject: {email.subject}</p>
                  <p className="text-sm text-muted-foreground">
                    {email.preview}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {email.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </ScrollArea>
      </Card>

      {/* Email Content */}
      <Card className="flex-1">
        <CardContent className="p-6">
          {selectedEmail ? (
            <>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive text-destructive-foreground">
                    {selectedEmail.from.name[0]}
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold">
                      {selectedEmail.subject}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {selectedEmail.timestamp}
                    </p>
                  </div>
                </div>
                <Button
                  variant={
                    selectedEmail.isFavorite ? "destructive" : "secondary"
                  }
                  className="gap-2"
                  onClick={() => toggleFavorite(selectedEmail)}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      selectedEmail.isFavorite ? "fill-current" : ""
                    }`}
                  />
                  {selectedEmail.isFavorite
                    ? "Remove favorite"
                    : "Mark as favorite"}
                </Button>
              </div>
              {loading ? (
                <div className="flex h-[200px] items-center justify-center">
                  <div className="text-muted-foreground">Loading...</div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <p className="text-sm">
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Select an email to view its content
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
