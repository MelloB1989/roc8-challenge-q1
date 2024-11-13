"use client";
import { useEffect } from "react";

import { Card, CardHeader } from "@/components/ui/card";
import EmailList from "@/components/main/emailList";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEmailStore } from "./state";
import EmailBody from "@/components/main/emailBody";

export default function Component() {
  const {
    selectedEmail,
    setSelectedEmail,
    filteredEmails,
    filter,
    setFilter,
    loading,
    handleEmailSelect,
    toggleFavorite,
    fetchEmailBody,
    fetchEmails,
  } = useEmailStore();

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

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
        <EmailList
          filteredEmails={filteredEmails()}
          handleEmailSelect={handleEmailSelect}
          selectedEmail={selectedEmail}
        />
      </Card>

      {/* Email Content */}
      <Card className="flex-1">
        <EmailBody
          selectedEmail={selectedEmail}
          toggleFavorite={toggleFavorite}
          loading={loading}
        />
      </Card>
    </div>
  );
}
