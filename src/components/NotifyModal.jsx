import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import NotifySignup from "@/components/NotifySignup";
import { trackEvent } from "@/services/analyticsService";

const NotifyModal = ({ open, onOpenChange }) => {
  // Track modal open event
  useEffect(() => {
    if (open) {
      trackEvent("notify_modal_opened", {
        source: "navbar",
      });
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl font-bold text-foreground">
            Get Notified
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Be the first to know when $ZLN launches. Join our waitlist for exclusive updates.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <NotifySignup />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotifyModal;
