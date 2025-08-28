import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import { getCategories } from '../lib/products';

export default function Home() {
  const categories = getCategories();
  return (
    <>
      <Hero />
      <section className="max-w-7xl mx-auto px-4 py-16 min-h-[100svh]">
        <h2 className="text-3xl font-serif text-gold mb-8">Featured Categories</h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} category={{ name: cat.name, slug: cat.slug, image: cat.image, count: cat.items.length }} />
          ))}
        </div>
      </section>
      <section className="bg-neutral-900 py-16 min-h-[100svh]">
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
