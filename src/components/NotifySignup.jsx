import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, Mail, User } from "lucide-react";
import { addWaitlistSubscriber } from "@/services/firestoreService";
import { trackWaitlistSignup } from "@/services/analyticsService";

const NotifySignup = ({ className = "" }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email address is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Name validation (optional but min 2 chars if provided)
    if (formData.name && formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleNotifySignup = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await addWaitlistSubscriber(formData.email, formData.name);
      
      if (result.success) {
        setSubmitSuccess(true);
        setFormData({ email: "", name: "" });
        
        // Track successful waitlist signup
        trackWaitlistSignup("website_prelaunch");
        
        // Hide success message after 8 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 8000);
      } else if (result.status === "already_exists") {
        setErrors({ email: result.message });
      } else {
        setErrors({ submit: result.message });
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className={className}>
      {submitSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 text-center"
        >
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-silver-light/10 p-4">
              <CheckCircle2 className="h-12 w-12 text-silver-light" />
            </div>
          </div>
          <h3 className="mb-3 font-heading text-2xl font-bold text-foreground">
            You're on the list!
          </h3>
          <p className="text-base text-muted-foreground">
            We'll notify you when ZLN launches.
          </p>
        </motion.div>
      ) : (
        <div className="glass-card p-8 lg:p-10">
          <div className="mb-6 text-center">
            <h2 className="mb-3 font-heading text-3xl font-bold text-foreground">
              Get Notified When <span className="metal-gradient">ZLN Launches</span>
            </h2>
            <p className="text-base text-muted-foreground">
              Zelion Energy Network is preparing for token launch.
            </p>
            <p className="text-sm text-muted-foreground">
              Join the early notification list to be informed the moment ZLN becomes available.
            </p>
          </div>

          <form onSubmit={handleNotifySignup} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange("email")}
                  className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="text-xs text-destructive" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Name Field (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Name <span className="text-xs text-muted-foreground">(Optional)</span>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange("name")}
                  className={`pl-10 ${errors.name ? "border-destructive" : ""}`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
              </div>
              {errors.name && (
                <p id="name-error" className="text-xs text-destructive" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Joining..." : "Join Early Access List"}
            </Button>

            {/* Error Message */}
            {errors.submit && (
              <Alert variant="destructive" role="alert">
                <AlertDescription>{errors.submit}</AlertDescription>
              </Alert>
            )}

            {/* Privacy Notice */}
            <Alert className="border-border/50 bg-muted/30">
              <AlertDescription className="text-xs text-muted-foreground">
                We respect your privacy. Your email will only be used to notify you about the ZLN token launch.
              </AlertDescription>
            </Alert>
          </form>
        </div>
      )}
    </div>
  );
};

export default NotifySignup;
