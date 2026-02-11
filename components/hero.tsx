interface HeroProps {
  language: 'en' | 'ar'
}

const translations = {
  en: {
    title: 'Discover Your Signature Scent',
    subtitle: 'Luxury perfumes crafted for the modern individual',
    cta: 'Explore Collection',
  },
  ar: {
    title: 'اكتشف رائحتك المميزة',
    subtitle: 'عطور فاخرة مصنوعة للشخص المعاصر',
    cta: 'استكشف المجموعة',
  },
}

export default function Hero({ language }: HeroProps) {
  const t = translations[language]

  return (
    <section className="min-h-96 md:min-h-screen bg-gradient-to-br from-amber-50 via-amber-100 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-20 md:py-0">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          {t.title}
        </h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
          {t.subtitle}
        </p>
        <a href="#shop">
          <button className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold rounded-lg hover:shadow-lg hover:from-amber-700 hover:to-amber-600 transition transform hover:scale-105">
            {t.cta}
          </button>
        </a>
      </div>
    </section>
  )
}
