import { motion } from "framer-motion";
import { Users } from "lucide-react";

const TeamPhilosophy = () => {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="section-divider mb-24" />
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl"
        >
          <div className="text-center mb-8">
            <span className="mb-4 inline-block text-xs font-medium tracking-[0.2em] text-silver-light uppercase">
              Team
            </span>
            <h2 className="mb-6 font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Infrastructure-Focused
              <br />
              <span className="metal-gradient">Development Team</span>
            </h2>
          </div>
          
          <div className="glass-card p-8 lg:p-10 text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-muted">
              <Users className="h-7 w-7 text-silver-light" />
            </div>
            
            <p className="mb-6 text-base leading-relaxed text-muted-foreground lg:text-lg">
              Zelion is developed by a multidisciplinary team with experience across energy infrastructure, hardware systems, and decentralized coordination architectures.
            </p>
            
            <div className="border-t border-border pt-6">
              <p className="text-sm text-muted-foreground">
                For operational security and regulatory reasons, individual identities are disclosed selectively to strategic partners when required.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamPhilosophy;
