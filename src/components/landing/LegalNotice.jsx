import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const LegalNotice = () => {
  return (
    <section className="relative bg-muted/10 section">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl"
        >
          <div className="rounded-3xl border border-border bg-muted/50 p-8 lg:p-10">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-accent">
                <AlertTriangle className="h-6 w-6 text-primary" />
              </div>
              <h2 className="subhead">
                Important Notice
              </h2>
            </div>
            
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                This project is provided for informational purposes only.
              </p>
              <p>
                Participation in decentralized infrastructure systems involves risk.
                No guarantees are made regarding performance, adoption, or outcomes.
              </p>
              <p className="font-medium text-foreground">
                Users should conduct independent research before participating.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LegalNotice;
