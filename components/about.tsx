interface AboutProps {
  language: 'en' | 'ar'
}

const translations = {
  en: {
    title: 'About Aroma Luxe',
    text: 'We craft premium perfumes using the finest ingredients from around the world. Each fragrance tells a story of elegance, sophistication, and timeless beauty. Our master perfumers have decades of experience in creating fragrances that capture emotions and moments. We believe that a great perfume is more than just a scent – it\'s an experience, a memory, and a reflection of your unique personality.',
  },
  ar: {
    title: 'حول أروما لوكس',
    text: 'نحن نصنع عطورًا فاخرة باستخدام أفضل المكونات من جميع أنحاء العالم. تروي كل رائحة قصة من الأناقة والرقي والجمال الخالد. لدى معطرينا الرئيسيين عقود من الخبرة في إنشاء عطور تلتقط المشاعر واللحظات. نحن نعتقد أن العطر الرائع ليس مجرد رائحة - إنها تجربة وذاكرة وانعكاس لشخصيتك الفريدة.',
  },
}

export default function About({ language }: AboutProps) {
  const t = translations[language]

  return (
    <section
      id="about"
      className="py-20 px-4 bg-gradient-to-b from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-900"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">
          {t.title}
        </h2>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {t.text}
        </p>
      </div>
    </section>
  )
}
