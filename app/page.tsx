import Hero from '../components/Hero';
import CategoryCard, { Category } from '../components/CategoryCard';

const categories: Category[] = [
  { name: 'Engine Parts', slug: 'engine-parts', image: '/images/Engine part.png' },
  { name: 'Transmission & Drivetrain', slug: 'transmission-drivetrain', image: '/images/Transmission & Drivetrain Parts.png' },
  { name: 'Suspension & Steering', slug: 'suspension-steering', image: '/images/Suspension & Steering Parts.png' },
  { name: 'Brake Components', slug: 'brake-components', image: '/images/Brake System Components.png' },
  { name: 'Bearings & Bushings', slug: 'bearings-bushings', image: '/images/Bearings & Bushings.png' },
  { name: 'Metal Components', slug: 'metal-components', image: '/images/Casting & Machining Components.png' },
];

export default function Home() {
  return (
    <>
      <Hero />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-serif text-gold mb-8">Featured Categories</h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </section>
      <section className="bg-neutral-900 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-serif text-gold mb-4">Why 16 WAYS?</h2>
          <p className="text-gray-300 leading-relaxed">
            At 16 WAYS we source and deliver the finest automotive components from around the world.
            Our commitment to quality, precision engineering and global distribution ensures your
            vehicles perform at their best. We partner with OEM-grade manufacturers and ship globally
            to meet the demands of discerning automotive enthusiasts and professionals.
          </p>
        </div>
      </section>
    </>
  );
}