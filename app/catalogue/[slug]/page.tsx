import { notFound } from 'next/navigation';
import { Metadata } from 'next';

const categoryData: Record<string, { name: string; description: string }> = {
  'engine-parts': { name: 'Engine Parts', description: 'Products in this category will be available soon.' },
  'transmission-drivetrain': { name: 'Transmission & Drivetrain', description: 'Products in this category will be available soon.' },
  'suspension-steering': { name: 'Suspension & Steering', description: 'Products in this category will be available soon.' },
  'brake-components': { name: 'Brake Components', description: 'Products in this category will be available soon.' },
  'bearings-bushings': { name: 'Bearings & Bushings', description: 'Products in this category will be available soon.' },
  'metal-components': { name: 'Metal Components', description: 'Products in this category will be available soon.' },
  'fasteners-misc': { name: 'Fasteners & Misc', description: 'Products in this category will be available soon.' },
};

interface PageProps {
  params: { slug: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const cat = categoryData[params.slug];
  return {
    title: cat ? `${cat.name} - 16 WAYS` : 'Category - 16 WAYS',
  };
}

export default function CategoryPage({ params }: PageProps) {
  const cat = categoryData[params.slug];
  if (!cat) {
    return notFound();
  }
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-serif text-gold mb-4">{cat.name}</h1>
      <p className="text-gray-300">{cat.description}</p>
    </div>
  );
}