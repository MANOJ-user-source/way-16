import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-[60vh] flex flex-col justify-center items-center text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black"></div>
      <h1 className="relative text-4xl md:text-6xl font-serif text-gold">
         Auto Parts, Redefined
      </h1>
      <p className="relative mt-4 text-lg max-w-2xl text-gray-300">
        Premium import-export auto parts supplier
      </p>
      <div className="relative mt-8 flex space-x-4">
        <Link
          href="/catalogue"
          className="bg-gold text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold/80 transition-colors"
        >
          View Catalogue
        </Link>
        <Link
          href="/contact"
          className="border border-gold text-gold px-6 py-3 rounded-lg font-semibold hover:bg-gold hover:text-black transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}