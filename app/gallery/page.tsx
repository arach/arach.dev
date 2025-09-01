import Link from 'next/link';

export default function GalleryIndex() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Theme Gallery</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link 
            href="/gallery/site"
            className="p-8 rounded-lg border-2 hover:border-blue-500 transition-colors"
            style={{
              backgroundColor: 'var(--theme-card-bg)',
              borderColor: 'var(--theme-border-color)'
            }}
          >
            <h2 className="text-2xl font-bold mb-4">Site Themes</h2>
            <p className="text-gray-600">
              Browse and preview website themes. Simple color schemes and typography for the landing page.
            </p>
            <p className="mt-4 text-sm text-blue-500">View Gallery →</p>
          </Link>

          <Link 
            href="/gallery/application"
            className="p-8 rounded-lg border-2 hover:border-blue-500 transition-colors"
            style={{
              backgroundColor: 'var(--theme-card-bg)',
              borderColor: 'var(--theme-border-color)'
            }}
          >
            <h2 className="text-2xl font-bold mb-4">Application Themes</h2>
            <p className="text-gray-600">
              Comprehensive UI pattern themes with buttons, forms, tables, and interactive components.
            </p>
            <p className="mt-4 text-sm text-blue-500">View Gallery →</p>
          </Link>
        </div>
      </div>
    </div>
  );
}