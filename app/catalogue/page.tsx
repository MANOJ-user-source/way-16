import CategoryCard, { Category } from '../../components/CategoryCard';

export const metadata = {
  title: 'Catalogue - 16 WAYS',
};

const categories: Category[] = [
  { name: 'Engine Parts', slug: 'engine-parts', image: '/images/Engine part.png' },
  { name: 'Transmission & Drivetrain', slug: 'transmission-drivetrain', image: '/images/Transmission & Drivetrain Parts.png' },
  { name: 'Suspension & Steering', slug: 'suspension-steering', image: '/images/Suspension & Steering Parts.png' },
  { name: 'Brake Components', slug: 'brake-components', image: '/images/Brake System Components.png' },
  { name: 'Bearings & Bushings', slug: 'bearings-bushings', image: '/images/Bearings & Bushings.png' },
  { name: 'Metal Components', slug: 'metal-components', image: '/images/Casting & Machining Components.png' },
  { name: 'Fasteners & Misc', slug: 'fasteners-misc', image: '/images/Fasteners & Forgings.png' },
];

export default function CataloguePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-serif text-gold mb-8">Product Catalogue</h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {categories.map((cat) => (
          <CategoryCard key={cat.slug} category={cat} />
        ))}
      </div>
    </div>
  );
}