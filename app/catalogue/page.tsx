import CategoryCard from '../../components/CategoryCard';
import { getCategories } from '../../lib/products';

export const metadata = {
  title: 'Catalogue - 16 WAYS',
};

export default function CataloguePage() {
  const categories = getCategories();
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-serif text-gold mb-8">Product Catalogue</h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {categories.map((cat) => (
          <CategoryCard key={cat.slug} category={{ name: cat.name, slug: cat.slug, image: cat.image, count: cat.items.length }} />
        ))}
      </div>
    </div>
  );
}
