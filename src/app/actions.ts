"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function submitContactForm(formData: unknown) {
  const validatedFields = contactSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed.",
    };
  }

  const { name, email, message } = validatedFields.data;

  // In a real application, you would handle this data here.
  // For example, save to a database and send an email notification.
  console.log("Contact form submitted:");
  console.log({ name, email, message });

  // Simulate a successful submission
  return {
    success: true,
    message: "Thank you for your message! I'll get back to you soon.",
  };
}
