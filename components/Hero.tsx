import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-[60vh] flex flex-col justify-center items-center text-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/Casting & Machining Components.png"
        alt="Precision engineering components"
        fill
        priority
        className="object-cover scale-105"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />

      <h1 className="relative text-4xl md:text-6xl font-serif text-gold drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
        Auto Parts, Redefined
      </h1>
      <p className="relative mt-4 text-lg max-w-2xl text-gray-300">
        Premium import–export auto parts supplier
      </p>
      <div className="relative mt-8 flex space-x-4">
        <Link
          href="/catalogue"
          className="bg-gold text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold/90 shadow hover:shadow-gold/20 transition"
        >
          View Catalogue
        </Link>
        <Link
          href="/contact"
          className="border border-gold/80 text-gold px-6 py-3 rounded-lg font-semibold hover:bg-gold hover:text-black transition"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}
