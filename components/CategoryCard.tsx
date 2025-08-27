import Link from "next/link";
import Image from "next/image";

export interface Category {
  name: string;
  slug: string;
  image: string;
  count?: number;
}

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/catalogue/${category.slug}`}
      className="block bg-neutral-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
    >
      <div className="relative h-40 bg-neutral-900">
        <Image
          src={category.image || "/placeholder.png"}
          alt={category.name}
          fill
          className="object-cover opacity-80"
        />
        {typeof category.count === "number" && (
          <span className="absolute top-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded">
            {category.count} {category.count === 1 ? "item" : "items"}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{category.name}</h3>
        <p className="text-gray-400 text-sm">View details →</p>
      </div>
    </Link>
  );
}

