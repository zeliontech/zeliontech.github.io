import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackContactSubmit } from "@/services/analyticsService";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[+]?[\d\s\-()]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Loaded on submit so the Firebase SDK stays out of the page bundle —
      // this form renders on the homepage and must not slow first paint.
      const { addContactMessage } = await import("@/services/firestoreService");
      const result = await addContactMessage(
        formData.name,
        formData.email,
        formData.phone,
        formData.message
      );

      if (result.success) {
        setSubmitSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });

        // Track successful contact form submission
        trackContactSubmit("contact_page");

        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        setErrors({ submit: result.message });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrors({ submit: "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Name <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`w-full rounded-xl border bg-card px-4 py-3 text-[15px] text-foreground transition-colors placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/25 ${
                errors.name
                  ? "border-destructive"
                  : "border-border hover:border-foreground/25 focus:border-foreground/30"
              }`}
              placeholder="Your full name"
            />
            {errors.name && (
              <p
                id="name-error"
                role="alert"
                className="mt-1 flex items-center gap-1 text-xs text-destructive"
              >
                <AlertCircle className="h-3 w-3" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Email <span className="text-destructive">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`w-full rounded-xl border bg-card px-4 py-3 text-[15px] text-foreground transition-colors placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/25 ${
                errors.email
                  ? "border-destructive"
                  : "border-border hover:border-foreground/25 focus:border-foreground/30"
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p
                id="email-error"
                role="alert"
                className="mt-1 flex items-center gap-1 text-xs text-destructive"
              >
                <AlertCircle className="h-3 w-3" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Phone Number <span className="text-destructive">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={errors.phone ? "true" : "false"}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={`w-full rounded-xl border bg-card px-4 py-3 text-[15px] text-foreground transition-colors placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/25 ${
                errors.phone
                  ? "border-destructive"
                  : "border-border hover:border-foreground/25 focus:border-foreground/30"
              }`}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && (
              <p
                id="phone-error"
                role="alert"
                className="mt-1 flex items-center gap-1 text-xs text-destructive"
              >
                <AlertCircle className="h-3 w-3" />
                {errors.phone}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Message Details <span className="text-destructive">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby={errors.message ? "message-error" : undefined}
              rows={5}
              className={`w-full resize-none rounded-xl border bg-card px-4 py-3 text-[15px] text-foreground transition-colors placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/25 ${
                errors.message
                  ? "border-destructive"
                  : "border-border hover:border-foreground/25 focus:border-foreground/30"
              }`}
              placeholder="Tell us about your inquiry..."
            />
            {errors.message && (
              <p
                id="message-error"
                role="alert"
                className="mt-1 flex items-center gap-1 text-xs text-destructive"
              >
                <AlertCircle className="h-3 w-3" />
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div
              role="alert"
              className="flex items-center gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm font-medium text-destructive"
            >
              <AlertCircle className="h-4 w-4" />
              {errors.submit}
            </div>
          )}

          {/* Success Message */}
          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
              className="flex items-center gap-2 rounded-xl border border-eco/30 bg-eco/10 p-4 text-sm font-medium text-eco"
            >
              <CheckCircle2 className="h-4 w-4" />
              Thank you. The ZelionTech team will contact you shortly.
            </motion.div>
          )}

          {/* Submit Button */}
          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Sending…" : "Send message"}
          </Button>
        </form>
      </motion.div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col justify-center"
      >
        <div className="glass-card p-8">
          <h3 className="mb-4 font-body text-[19px] font-bold tracking-[-0.01em] text-foreground">
            Get in Touch
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            Whether you're interested in validator infrastructure, ecosystem
            partnerships, or learning more about ZelionTech's approach to energy
            verification, we're here to help.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Fill out the form and our team will respond within 24-48 hours.
          </p>
          <div className="mt-6 rounded-xl bg-muted/60 p-4">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Note:</span> For
              general inquiries, you can also reach us via our social channels
              or email listed in the footer.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactForm;
