const galleryItems = [
  { caption: 'Front Lawn Restoration' },
  { caption: 'Backyard Transformation' },
  { caption: 'Commercial Property Cleanup' },
  { caption: 'Garden Bed Renovation' },
];

export default function BeforeAfterGallery() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal text-center">
          See the Difference
        </h2>
        <p className="text-charcoal-light text-center mt-4 font-body">
          Real results from real customers
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {galleryItems.map((item) => (
            <div
              key={item.caption}
              className="bg-white rounded-xl overflow-hidden shadow"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="bg-earth/30 h-48 flex items-center justify-center relative">
                  <span className="bg-black/50 text-white text-sm font-semibold px-3 py-1 rounded">
                    Before
                  </span>
                </div>
                <div className="bg-sage/30 h-48 flex items-center justify-center relative">
                  <span className="bg-black/50 text-white text-sm font-semibold px-3 py-1 rounded">
                    After
                  </span>
                </div>
              </div>
              <p className="text-sm text-charcoal-light p-4 text-center font-body">
                {item.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
