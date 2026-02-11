interface FooterProps {
  language: 'en' | 'ar'
}

const translations = {
  en: {
    about: 'About',
    contact: 'Contact',
    support: 'Support',
    customer: 'Customer Service',
    shipping: 'Shipping Information',
    returns: 'Returns & Exchanges',
    faq: 'FAQ',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    email: 'Email: info@aromaluxe.com',
    phone: 'Phone: +1 (555) 123-4567',
    copyright: '© 2024 Aroma Luxe. All rights reserved.',
  },
  ar: {
    about: 'حول',
    contact: 'اتصل',
    support: 'دعم',
    customer: 'خدمة العملاء',
    shipping: 'معلومات الشحن',
    returns: 'الإرجاع والاستبدال',
    faq: 'الأسئلة الشائعة',
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الخدمة',
    email: 'البريد الإلكتروني: info@aromaluxe.com',
    phone: 'الهاتف: +1 (555) 123-4567',
    copyright: '© 2024 أروما لوكس. جميع الحقوق محفوظة.',
  },
}

export default function Footer({ language }: FooterProps) {
  const t = translations[language]

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold mb-4 text-lg">{t.about}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-amber-400 transition">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition">
                  Craftsmanship
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition">
                  Sustainability
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-bold mb-4 text-lg">{t.customer}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-amber-400 transition">
                  {t.shipping}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition">
                  {t.returns}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition">
                  {t.faq}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4 text-lg">{t.contact}</h3>
            <p className="mb-2">{t.email}</p>
            <p className="mb-4">{t.phone}</p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-2xl hover:text-amber-400 transition"
                title="Facebook"
              >
                f
              </a>
              <a
                href="#"
                className="text-2xl hover:text-amber-400 transition"
                title="Instagram"
              >
                📷
              </a>
              <a
                href="#"
                className="text-2xl hover:text-amber-400 transition"
                title="Twitter"
              >
                𝕏
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>{t.copyright}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-amber-400 transition text-sm">
              {t.privacy}
            </a>
            <a href="#" className="hover:text-amber-400 transition text-sm">
              {t.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
