"use client";
import { CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart } from "lucide-react";
import { Email } from "@/app/state";

export default function EmailList({
  filteredEmails,
  selectedEmail,
  handleEmailSelect,
}: {
  filteredEmails: Email[];
  selectedEmail: Email | null;
  handleEmailSelect: (email: Email) => void;
}) {
  return (
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
                {email.short_description}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(email.date).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
}
