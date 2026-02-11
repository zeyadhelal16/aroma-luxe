# Translation Guide - Aroma Luxe

Complete translation reference for all text in the e-commerce site.

## 📋 All Translations

### Navigation Bar

| English | Arabic |
|---------|--------|
| Shop | تسوق |
| About | حول |
| Contact | اتصل |
| Home | الرئيسية |

### Hero Section

| English | Arabic |
|---------|--------|
| Discover Your Signature Scent | اكتشف رائحتك المميزة |
| Luxury perfumes crafted for the modern individual | عطور فاخرة مصنوعة للشخص المعاصر |
| Explore Collection | استكشف المجموعة |

### Featured Collection

| English | Arabic |
|---------|--------|
| Featured Collection | المجموعة المميزة |

### Product Modal

| English | Arabic |
|---------|--------|
| Price: | السعر: |
| Quantity: | الكمية: |
| Add to Cart | أضف إلى السلة |

### Shopping Cart

| English | Arabic |
|---------|--------|
| Shopping Cart | سلة التسوق |
| Your cart is empty | سلتك فارغة |
| Subtotal: | المجموع الفرعي: |
| Shipping: | الشحن: |
| Total: | الإجمالي: |
| Checkout | الدفع |
| Remove | إزالة |

### About Section

| English | Arabic |
|---------|--------|
| About Aroma Luxe | حول أروما لوكس |
| We craft premium perfumes using the finest ingredients from around the world. Each fragrance tells a story of elegance, sophistication, and timeless beauty. Our master perfumers have decades of experience in creating fragrances that capture emotions and moments. We believe that a great perfume is more than just a scent – it's an experience, a memory, and a reflection of your unique personality. | نحن نصنع عطورًا فاخرة باستخدام أفضل المكونات من جميع أنحاء العالم. تروي كل رائحة قصة من الأناقة والرقي والجمال الخالد. لدى معطرينا الرئيسيين عقود من الخبرة في إنشاء عطور تلتقط المشاعر واللحظات. نحن نعتقد أن العطر الرائع ليس مجرد رائحة - إنها تجربة وذاكرة وانعكاس لشخصيتك الفريدة. |

### Footer

| English | Arabic |
|---------|--------|
| About | حول |
| Contact | اتصل |
| Support | دعم |
| Customer Service | خدمة العملاء |
| Shipping Information | معلومات الشحن |
| Returns & Exchanges | الإرجاع والاستبدال |
| FAQ | الأسئلة الشائعة |
| Privacy Policy | سياسة الخصوصية |
| Terms of Service | شروط الخدمة |
| Email: info@aromaluxe.com | البريد الإلكتروني: info@aromaluxe.com |
| Phone: +1 (555) 123-4567 | الهاتف: +1 (555) 123-4567 |
| © 2024 Aroma Luxe. All rights reserved. | © 2024 أروما لوكس. جميع الحقوق محفوظة. |

### Products

#### Midnight Elegance
| English | Arabic |
|---------|--------|
| Midnight Elegance | أناقة منتصف الليل |
| A sophisticated blend of vanilla and amber | مزيج متطور من الفانيليا والعنبر |
| Price: $129.99 | السعر: $129.99 |

#### Ocean Breeze
| English | Arabic |
|---------|--------|
| Ocean Breeze | نسيم المحيط |
| Fresh citrus notes with a hint of sea salt | نكهات الحمضيات الطازجة مع لمسة من ملح البحر |
| Price: $99.99 | السعر: $99.99 |

#### Rose Garden
| English | Arabic |
|---------|--------|
| Rose Garden | حديقة الورد |
| Delicate rose petals with floral notes | بتلات الورد الرقيقة مع نكهات زهرية |
| Price: $119.99 | السعر: $119.99 |

#### Spice Mystique
| English | Arabic |
|---------|--------|
| Spice Mystique | غموض البهارات |
| Warm spices with oriental essence | البهارات الدافئة مع الجوهر الشرقي |
| Price: $139.99 | السعر: $139.99 |

#### Lavender Dreams
| English | Arabic |
|---------|--------|
| Lavender Dreams | أحلام اللافندر |
| Calming lavender with subtle green notes | اللافندر المهدئ مع ملاحظات خضراء دقيقة |
| Price: $109.99 | السعر: $109.99 |

#### Oud Heritage
| English | Arabic |
|---------|--------|
| Oud Heritage | إرث العود |
| Rich oud with precious woodsy undertones | عود غني مع نبرات خشبية ثمينة |
| Price: $189.99 | السعر: $189.99 |

## 🔄 Adding a New Language

To add a third language (e.g., French), follow this pattern:

### 1. In each component, update translations object:

```typescript
const translations = {
  en: {
    shop: 'Shop',
    about: 'About',
  },
  ar: {
    shop: 'تسوق',
    about: 'حول',
  },
  fr: {  // ← Add French
    shop: 'Boutique',
    about: 'À propos',
  },
}
```

### 2. Update language toggle in `/components/navbar.tsx`:

```typescript
<button onClick={onLanguageToggle}>
  {language === 'en' ? 'AR' : language === 'ar' ? 'FR' : 'EN'}
</button>
```

### 3. Update page.tsx type and toggle logic:

```typescript
const [language, setLanguage] = useState<'en' | 'ar' | 'fr'>('en')

const toggleLanguage = () => {
  if (language === 'en') setLanguage('ar')
  else if (language === 'ar') setLanguage('fr')
  else setLanguage('en')
}
```

### 4. Handle RTL for languages that need it:

```typescript
useEffect(() => {
  const isRTL = language === 'ar'  // Add more RTL languages if needed
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
}, [language])
```

## 💡 Translation Tips

### Arabic Considerations
- ✅ Always include Arabic descriptions (`arDescription`)
- ✅ Remember to set `dir="rtl"` in HTML (already handled)
- ✅ Test right-to-left layout thoroughly
- ✅ Numbers still display left-to-right in Arabic context
- ✅ Prices should use $ symbol (international standard)

### General Best Practices
- ✅ Keep translations consistent across components
- ✅ Test each translation in both light and dark mode
- ✅ Check text doesn't overflow in long translations
- ✅ Consider cultural differences in descriptions
- ✅ Always test on mobile view

### Translation Component Pattern

Each component follows this pattern:

```typescript
interface ComponentProps {
  language: 'en' | 'ar'
  // other props...
}

const translations = {
  en: {
    key1: 'English text',
    key2: 'More English text',
  },
  ar: {
    key1: 'النص العربي',
    key2: 'نص عربي آخر',
  },
}

export default function Component({ language }: ComponentProps) {
  const t = translations[language]
  
  return <div>{t.key1}</div>
}
```

## 🎨 RTL Styling Considerations

When adding RTL languages:

### Flexbox Direction
```tsx
className="flex flex-row"          // English (left-to-right)
// Automatically handled for Arabic (right-to-left)
```

### Margin/Padding
```tsx
className="ml-4"   // Left margin (English)
// In RTL, mr-4 (right margin) would be needed
// But Tailwind handles this with dir="rtl" on html
```

### Text Alignment
```tsx
className="text-left"   // English default
// Changes to right-aligned automatically with dir="rtl"
```

## 📱 Testing Translations

### Test Checklist
- [ ] All text displays correctly in English
- [ ] All text displays correctly in Arabic
- [ ] Layout flips properly for RTL
- [ ] Numbers and prices display correctly
- [ ] Images don't get flipped
- [ ] Buttons remain functional
- [ ] Modal opens and closes properly
- [ ] Cart totals calculate correctly
- [ ] Mobile view works in both languages
- [ ] Dark mode works in both languages

## 🚀 Production Checklist

Before deploying with new translations:

- [ ] All translations reviewed by native speaker
- [ ] No text overflow in any component
- [ ] Dates/numbers format correctly
- [ ] All links still work
- [ ] Images load properly
- [ ] Performance not degraded
- [ ] Accessibility maintained
- [ ] Mobile responsive in all languages
- [ ] LocalStorage persists language correctly
- [ ] All components updated with translations

## 📞 Support

For translation help:
1. Check existing patterns in components
2. Review IMPLEMENTATION.md for technical details
3. Test thoroughly in all browsers

---

**Happy translating! 🌍**
