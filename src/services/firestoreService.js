import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

/**
 * Add a subscriber to the waitlist
 * @param {string} email - User's email address
 * @param {string} name - User's name (optional)
 * @param {string} source - Source of signup (default: "prelaunch_site")
 * @returns {Promise<{success: boolean, status: string, message: string}>}
 */
export const addWaitlistSubscriber = async (email, name = "", source = "prelaunch_site") => {
  try {
    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();
    const trimmedName = name.trim();

    // Check if email already exists
    const waitlistRef = collection(db, "waitlist_subscribers");
    const q = query(waitlistRef, where("email", "==", normalizedEmail));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      if (import.meta.env.DEV) {
        console.log("[Firebase] Email already exists in waitlist:", normalizedEmail);
      }
      return {
        success: false,
        status: "already_exists",
        message: "This email is already registered for early access.",
      };
    }

    // Add new subscriber
    const docData = {
      email: normalizedEmail,
      name: trimmedName || null,
      source,
      status: "active",
      signupAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(waitlistRef, docData);
    
    if (import.meta.env.DEV) {
      console.log("[Firebase] Waitlist subscriber added:", docRef.id);
    }

    return {
      success: true,
      status: "added",
      message: "You're on the list. We'll notify you when ZLN launches.",
    };
  } catch (error) {
    console.error("[Firebase] Error adding waitlist subscriber:", error);
    return {
      success: false,
      status: "error",
      message: "Something went wrong. Please try again later.",
    };
  }
};

/**
 * Add a contact message
 * @param {string} name - Sender's name
 * @param {string} email - Sender's email
 * @param {string} phone - Sender's phone (optional)
 * @param {string} message - Message content
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const addContactMessage = async (name, email, phone = "", message) => {
  try {
    // Normalize and trim inputs
    const normalizedEmail = email.toLowerCase().trim();
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedMessage = message.trim();

    // Add contact message
    const contactRef = collection(db, "contact_messages");
    const docData = {
      name: trimmedName,
      email: normalizedEmail,
      phone: trimmedPhone || null,
      message: trimmedMessage,
      category: "general",
      status: "new",
      submittedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(contactRef, docData);
    
    if (import.meta.env.DEV) {
      console.log("[Firebase] Contact message added:", docRef.id);
    }

    return {
      success: true,
      message: "Thank you. The Zelion team will contact you shortly.",
    };
  } catch (error) {
    console.error("[Firebase] Error adding contact message:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
};
