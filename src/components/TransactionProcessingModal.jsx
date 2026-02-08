import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, CheckCircle2, Clock } from "lucide-react";

const TransactionProcessingModal = ({ open, onOpenChange, onComplete }) => {
  const [step, setStep] = useState(0); // 0: Submitting, 1: Pending, 2: Confirmed

  const steps = [
    { label: "Submitting Transaction", icon: Loader2, color: "text-silver-light" },
    { label: "Waiting Confirmation", icon: Clock, color: "text-silver-mid" },
    { label: "Transaction Finalized", icon: CheckCircle2, color: "text-silver-light" },
  ];

  useEffect(() => {
    if (!open) {
      setStep(0);
      return;
    }

    // Simulate transaction steps
    const timer1 = setTimeout(() => setStep(1), 1500);
    const timer2 = setTimeout(() => setStep(2), 3000);
    const timer3 = setTimeout(() => {
      if (onComplete) {
        // Randomly succeed or fail for demo purposes
        const success = Math.random() > 0.3; // 70% success rate
        onComplete(success);
      }
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [open, onComplete]);

  const CurrentIcon = steps[step]?.icon || Loader2;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card max-w-md border-silver-mid/20" hideClose>
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl font-bold text-foreground text-center">
            Processing BNB Transaction
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 py-8">
          {/* Progress Indicator */}
          <div className="flex justify-center">
            <div className="relative flex h-24 w-24 items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
              <div
                className="absolute inset-0 rounded-full border-4 border-silver-light transition-all duration-500"
                style={{
                  clipPath: `inset(0 ${100 - ((step + 1) / steps.length) * 100}% 0 0)`,
                }}
              ></div>
              <CurrentIcon className={`h-10 w-10 ${steps[step]?.color} ${step < 2 ? 'animate-spin' : ''}`} />
            </div>
          </div>

          {/* Status Text */}
          <div className="text-center">
            <div className="mb-2 font-heading text-lg font-semibold text-foreground">
              Waiting for blockchain confirmation...
            </div>
            <div className="text-sm text-muted-foreground">
              This may take a few moments
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {steps.map((stepItem, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 rounded-lg border p-3 transition-all ${
                  index <= step
                    ? "border-silver-mid/30 bg-muted/30"
                    : "border-border/30 bg-transparent"
                }`}
              >
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  index < step
                    ? "bg-silver-light/20 border border-silver-light/30"
                    : index === step
                    ? "bg-silver-light/10 border border-silver-light/20"
                    : "bg-muted border border-border"
                }`}>
                  {index < step ? (
                    <CheckCircle2 className="h-4 w-4 text-silver-light" />
                  ) : index === step ? (
                    <stepItem.icon className={`h-4 w-4 ${stepItem.color} ${index < 2 ? 'animate-spin' : ''}`} />
                  ) : (
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <span
                  className={`text-sm font-medium ${
                    index <= step ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {stepItem.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionProcessingModal;
