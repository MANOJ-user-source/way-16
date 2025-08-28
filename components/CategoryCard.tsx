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
      className="group block rounded-xl overflow-hidden ring-1 ring-white/5 bg-neutral-800 hover:ring-gold/30 shadow transition-transform duration-200 will-change-transform hover:scale-[1.01]"
    >
      <div className="relative h-44 bg-neutral-900">
        <Image
          src={category.image || "/placeholder.png"}
          alt={category.name}
          fill
          sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {typeof category.count === "number" && (
          <span className="absolute top-2 right-2 text-xs bg-black/60 backdrop-blur text-white px-2 py-1 rounded">
            {category.count} {category.count === 1 ? "item" : "items"}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{category.name}</h3>
        <p className="text-gray-400 text-sm flex items-center gap-1">
          View details
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </p>
      </div>
    </Link>
  );
}
