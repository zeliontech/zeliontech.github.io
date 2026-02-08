import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";

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

    try {
      // Placeholder for future API integration
      // TODO: Replace with actual API call
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // For now, just log the data
      console.log("Form submitted:", formData);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message
      setSubmitSuccess(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setErrors({ submit: "Something went wrong. Please try again." });
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
              className={`w-full rounded-lg border bg-background px-4 py-3 text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-silver-light/50 ${
                errors.name
                  ? "border-destructive"
                  : "border-border hover:border-silver-light/50"
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
              className={`w-full rounded-lg border bg-background px-4 py-3 text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-silver-light/50 ${
                errors.email
                  ? "border-destructive"
                  : "border-border hover:border-silver-light/50"
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
              className={`w-full rounded-lg border bg-background px-4 py-3 text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-silver-light/50 ${
                errors.phone
                  ? "border-destructive"
                  : "border-border hover:border-silver-light/50"
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
              className={`w-full resize-none rounded-lg border bg-background px-4 py-3 text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-silver-light/50 ${
                errors.message
                  ? "border-destructive"
                  : "border-border hover:border-silver-light/50"
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
              className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive"
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
              className="flex items-center gap-2 rounded-lg border border-green-500/50 bg-green-500/10 p-4 text-sm text-green-600 dark:text-green-400"
            >
              <CheckCircle2 className="h-4 w-4" />
              Thank you. The Zelion team will contact you shortly.
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-silver-light px-6 py-3 font-medium text-background transition-colors hover:bg-silver-mid focus:outline-none focus:ring-2 focus:ring-silver-light/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
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
          <h3 className="mb-4 font-heading text-xl font-semibold text-foreground">
            Get in Touch
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            Whether you're interested in validator infrastructure, ecosystem
            partnerships, or learning more about Zelion's approach to energy
            verification, we're here to help.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Fill out the form and our team will respond within 24-48 hours.
          </p>
          <div className="mt-6 rounded-lg border border-border/50 bg-muted/30 p-4">
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
