'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const ContactSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().optional(),
  nationality: z.string().optional(),
  message: z.string().min(1, { message: 'Message is required' }),
});

type ContactFormData = z.infer<typeof ContactSchema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        reset();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (submitted) {
    return <p className="text-green-500">Thank you for contacting us! We will get back to you shortly.</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1">Name</label>
        <input
          {...register('name')}
          className="w-full px-4 py-2 rounded bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-gold"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          {...register('email')}
          className="w-full px-4 py-2 rounded bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-gold"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-1">Phone</label>
        <input
          type="text"
          {...register('phone')}
          className="w-full px-4 py-2 rounded bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-gold"
        />
      </div>
      <div>
        <label className="block mb-1">Nationality</label>
        <input
          type="text"
          {...register('nationality')}
          className="w-full px-4 py-2 rounded bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-gold"
        />
      </div>
      <div>
        <label className="block mb-1">Message</label>
        <textarea
          {...register('message')}
          rows={4}
          className="w-full px-4 py-2 rounded bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-gold"
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-gold text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold/80 transition-colors"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}