// app/api/contact/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    // TODO: Integrate with an email service like SendGrid or Mailgun here.
    console.log('Contact Form Submission:', { name, email, message });

    return NextResponse.json({ status: 'success', message: 'Thank you for your message!' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 'error', message: 'There was an error submitting the form.' }, { status: 500 });
  }
}
