import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black text-gray-400 text-sm py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
        <span>© {year} 16 WAYS. All rights reserved.</span>
        <div className="flex space-x-4">
          <Link href="/privacy" className="hover:text-gold">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-gold">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}

