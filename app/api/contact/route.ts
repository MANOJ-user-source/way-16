import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  nationality: z.string().optional(),
  message: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = ContactSchema.safeParse(data);
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    // Here you would send an email using a service like Resend or Nodemailer.
    // For now, we log the submission to the server console.
    console.log('Contact form submitted:', data);
    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}