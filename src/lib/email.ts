import type { Lead, Contact } from '@/types';

export async function sendLeadNotification(lead: Lead): Promise<void> {
  console.log(`[EMAIL STUB] New lead notification:`, {
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    serviceType: lead.serviceType,
    createdAt: lead.createdAt,
  });
  // TODO: Integrate with email service (SendGrid, Resend, etc.)
}

export async function sendContactNotification(contact: Contact): Promise<void> {
  console.log(`[EMAIL STUB] New contact form submission:`, {
    name: contact.name,
    email: contact.email,
    subject: contact.subject,
    createdAt: contact.createdAt,
  });
}

export async function sendLeadConfirmation(email: string, name: string): Promise<void> {
  console.log(`[EMAIL STUB] Sending confirmation to ${name} at ${email}`);
  // TODO: Send confirmation email to lead
}
