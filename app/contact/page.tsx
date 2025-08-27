import ContactForm from '../../components/ContactForm';

export const metadata = {
  title: 'Contact - 16 WAYS',
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-serif text-gold mb-4">Contact Us</h1>
      <p className="text-gray-300 mb-6">
        We would love to hear from you. Please fill out the form below and we will respond shortly.
      </p>
      <ContactForm />
    </div>
  );
}