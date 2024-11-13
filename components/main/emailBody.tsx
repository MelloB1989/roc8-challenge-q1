import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Email } from "@/app/state";

export default function EmailBody({
  selectedEmail,
  toggleFavorite,
  loading,
}: {
  selectedEmail: Email | null;
  toggleFavorite: (email: Email) => void;
  loading: boolean;
}) {
  return (
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
                  {selectedEmail.date}
                </p>
              </div>
            </div>
            <Button
              variant={selectedEmail.isFavorite ? "destructive" : "secondary"}
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
              <p
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: selectedEmail.body
                    ? selectedEmail.body.replace(/(?:\r\n|\r|\n)/g, "<br />")
                    : "No content",
                }}
              />
            </div>
          )}
        </>
      ) : (
        <div className="flex h-full items-center justify-center text-muted-foreground">
          Select an email to view its content
        </div>
      )}
    </CardContent>
  );
}
