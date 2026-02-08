import { motion } from "framer-motion";
import NotifySignup from "@/components/NotifySignup";

const NotifyLaunchSection = () => {
  return (
    <section id="notify-launch" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl"
        >
          <NotifySignup />
        </motion.div>
      </div>
    </section>
  );
};

export default NotifyLaunchSection;
