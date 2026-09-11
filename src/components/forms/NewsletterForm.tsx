import Link from 'next/link';

/** Contact/resources links until a real mailing program is connected. */
export default function NewsletterForm() {
  return (
    <div className="flex flex-wrap gap-3 font-body text-sm">
      <Link href="/locations" className="bg-forest text-white font-semibold px-5 py-3 rounded-lg hover:bg-forest-dark transition-colors">
        Contact your local office
      </Link>
      <Link href="/blog" className="border border-white/30 text-white px-5 py-3 rounded-lg hover:bg-white/10 transition-colors">
        Read cleaning guides
      </Link>
    </div>
  );
}
