import { sendLeadNotification, sendContactNotification, sendLeadConfirmation } from '@/lib/email';
import type { Lead, Contact } from '@/types';

describe('email stub functions', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('sendLeadNotification', () => {
    const lead: Lead = {
      id: 'lead-1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-123-4567',
      serviceType: 'janitorial-cleaning',
      status: 'new',
      createdAt: '2026-03-21T00:00:00Z',
      updatedAt: '2026-03-21T00:00:00Z',
    };

    it('should not throw', async () => {
      await expect(sendLeadNotification(lead)).resolves.toBeUndefined();
    });

    it('should log the lead details', async () => {
      await sendLeadNotification(lead);

      expect(consoleSpy).toHaveBeenCalledWith(
        '[EMAIL STUB] New lead notification:',
        {
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          serviceType: lead.serviceType,
          createdAt: lead.createdAt,
        },
      );
    });
  });

  describe('sendContactNotification', () => {
    const contact: Contact = {
      id: 'contact-1',
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'Question about services',
      message: 'I would like more information.',
      createdAt: '2026-03-21T00:00:00Z',
    };

    it('should not throw', async () => {
      await expect(sendContactNotification(contact)).resolves.toBeUndefined();
    });

    it('should log the contact details', async () => {
      await sendContactNotification(contact);

      expect(consoleSpy).toHaveBeenCalledWith(
        '[EMAIL STUB] New contact form submission:',
        {
          name: contact.name,
          email: contact.email,
          subject: contact.subject,
          createdAt: contact.createdAt,
        },
      );
    });
  });

  describe('sendLeadConfirmation', () => {
    const email = 'john@example.com';
    const name = 'John Doe';

    it('should not throw', async () => {
      await expect(sendLeadConfirmation(email, name)).resolves.toBeUndefined();
    });

    it('should log the confirmation details', async () => {
      await sendLeadConfirmation(email, name);

      expect(consoleSpy).toHaveBeenCalledWith(
        `[EMAIL STUB] Sending confirmation to ${name} at ${email}`,
      );
    });
  });
});
