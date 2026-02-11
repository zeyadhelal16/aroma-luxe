# Aroma Luxe - Implementation Guide

## Project Overview

This is a complete, production-ready e-commerce website for premium perfumes built with Next.js 16, React 19, and Tailwind CSS.

## Key Features Implemented

### ✅ Night Mode (Dark Theme)
- **Toggle Button**: Moon/Sun icon in navbar
- **Persistent Storage**: Uses localStorage to save preference
- **Instant Updates**: All components update smoothly with CSS transitions
- **Complete Coverage**: Every UI element has light and dark variants
- **Implementation**: Uses HTML `dark:` classes and conditional CSS

```typescript
// How it works:
const [isDark, setIsDark] = useState(false)

useEffect(() => {
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
}, [isDark])
```

### ✅ Bilingual Support (Arabic/English)
- **Language Toggle**: "EN / AR" button in navbar
- **Full Translation**: Every piece of text has English and Arabic versions
- **RTL Support**: HTML direction automatically switches to RTL for Arabic
- **Persistent Storage**: Language preference saved in localStorage
- **Implementation**: Uses conditional rendering based on language state

```typescript
// Translation structure:
const translations = {
  en: { key: 'English text' },
  ar: { key: 'النص العربي' }
}

// RTL auto-switching:
useEffect(() => {
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  localStorage.setItem('language', language)
}, [language])
```

## Component Architecture

### `/app/page.tsx` - Main Page
- **Role**: Root component managing all state
- **State**: language, isDark, selectedProduct, cart, isCartOpen
- **Data**: 6 perfume products with images, names, and prices
- **Logic**: Handles language/theme persistence, cart operations

### `/components/navbar.tsx`
- Navigation with links to sections
- Theme toggle (moon/sun icon)
- Language toggle (EN/AR)
- Cart icon with item counter
- Mobile menu button
- Responsive on all screen sizes

### `/components/hero.tsx`
- Large hero banner with gradient background
- Translated title and subtitle
- Call-to-action button
- Links to product section

### `/components/product-grid.tsx`
- Displays all 6 products in responsive grid
- Shows product image, name, description, and price
- Hover animations
- Click to open product modal
- Language-aware text (en/ar)

### `/components/product-modal.tsx`
- Full product details with large image
- Product description
- Price display
- Quantity selector (+/-)
- Add to cart button
- Close button
- Smooth animations

### `/components/cart-sidebar.tsx`
- Slides in from right
- Shows all cart items
- Item quantity controls
- Remove item buttons
- Calculates and displays:
  - Subtotal
  - Shipping (free over $100)
  - Total price
- Checkout button
- Beautiful overlay background

### `/components/about.tsx`
- Company information section
- Translated about text
- Gradient background
- Centered layout

### `/components/footer.tsx`
- Multiple sections with links
- Contact information
- Social media links
- Copyright and legal links
- Dark background for contrast

## How the Features Work

### Dark Mode Flow

1. **Initialization**:
   - Check localStorage for saved theme
   - Apply dark class to HTML if saved as 'dark'
   - Set initial state

2. **Toggle**:
   - User clicks sun/moon icon
   - State updates: `setIsDark(!isDark)`
   - useEffect fires and adds/removes 'dark' class
   - localStorage updates

3. **Styling**:
   - Tailwind 'dark:' prefix applies styles
   - CSS transitions smooth the color changes
   - All components automatically update

### Language Flow

1. **Initialization**:
   - Check localStorage for saved language
   - Set HTML dir attribute to 'rtl' or 'ltr'
   - Set initial state

2. **Toggle**:
   - User clicks EN/AR button
   - State updates: `setLanguage(language === 'en' ? 'ar' : 'en')`
   - useEffect fires and updates dir attribute
   - localStorage updates

3. **Display**:
   - Each component reads language prop
   - Components render appropriate translation
   - RTL layout applies automatically for Arabic

### Cart Management Flow

1. **Adding Items**:
   - User clicks product card
   - Modal opens with product details
   - User sets quantity
   - Clicks "Add to Cart"
   - Cart state updates
   - Cart count in navbar updates

2. **Viewing Cart**:
   - User clicks shopping bag icon
   - Sidebar slides in from right
   - Shows all items with details
   - User can adjust quantities or remove items

3. **Calculations**:
   - Subtotal = sum of (price × quantity) for all items
   - Shipping = $10 if subtotal < $100, free otherwise
   - Total = subtotal + shipping

## Styling System

### Color Scheme
- **Primary**: Amber/Gold (#d97706, #b45309) - luxury feel
- **Background Light**: White and light grays
- **Background Dark**: Gray-900 to Gray-800
- **Accents**: Amber for buttons and highlights

### Fonts
- **Headings**: Playfair Display (serif) - elegant, luxury
- **Body**: Poppins (sans-serif) - modern, readable
- Imported from Google Fonts

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

All components use `md:` and `lg:` prefixes for responsive behavior.

## Product Data Structure

```typescript
interface Product {
  id: number
  name: string              // English name
  arName: string           // Arabic name
  price: number
  image: string            // Unsplash image URL
  description: string      // English description
  arDescription: string    // Arabic description
}
```

Products are defined as an array in `/app/page.tsx`.

## LocalStorage Keys

- `language`: Stores 'en' or 'ar'
- `theme`: Stores 'dark' or 'light'

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 15+
- All modern mobile browsers

## Performance Optimizations

1. **Image Optimization**: Using Unsplash CDN URLs (optimized)
2. **Code Splitting**: Components lazy-loaded by Next.js
3. **CSS**: Tailwind with tree-shaking (only used classes included)
4. **Animations**: Using CSS transitions (GPU accelerated)
5. **State**: Minimal re-renders with proper hooks usage

## Common Customizations

### Change Primary Color
Replace `amber-600` with your color in all components:
```bash
# Example: change amber to blue
find . -type f -name "*.tsx" -exec sed -i 's/amber-600/blue-600/g' {} \;
find . -type f -name "*.tsx" -exec sed -i 's/amber-500/blue-500/g' {} \;
```

### Add New Products
Edit the `products` array in `/app/page.tsx`:
```typescript
{
  id: 7,
  name: 'New Perfume',
  arName: 'عطر جديد',
  price: 149.99,
  image: 'https://images.unsplash.com/...',
  description: 'Description here',
  arDescription: 'الوصف هنا'
}
```

### Change Shipping Cost
Edit `/components/cart-sidebar.tsx`:
```typescript
const shipping = subtotal > 100 ? 0 : 15  // Change 10 to 15
```

### Add More Languages
1. Add translation objects to components
2. Add language state option in page.tsx
3. Update language toggle to support new language
4. Set dir based on language

## Testing

### Test Dark Mode
1. Click sun/moon icon
2. Refresh page - theme should persist
3. Toggle back and forth - should transition smoothly

### Test Language Switching
1. Click EN/AR button
2. All text should translate instantly
3. Layout should change to RTL/LTR
4. Refresh page - language should persist

### Test Cart
1. Click multiple products
2. Add different quantities
3. View cart - verify counts
4. Remove items - verify updates
5. Refresh page - note: cart will reset (local state only)

To persist cart, add localStorage logic similar to theme/language.

## Deployment

### To Vercel
```bash
# Connect GitHub repo or deploy directly
vercel deploy
```

### To Other Platforms
```bash
npm run build
npm run start
```

Production build runs on port 3000.

## Accessibility Features

- ✅ Semantic HTML (nav, section, footer)
- ✅ Proper heading hierarchy (h1, h2, h3)
- ✅ Alt text for images
- ✅ Keyboard navigation support
- ✅ Color contrast compliance
- ✅ ARIA labels on buttons
- ✅ Mobile responsive
- ✅ Touch-friendly buttons (min 44px)

## Security Notes

- ✅ No hardcoded API keys (if you add API features)
- ✅ Uses Next.js built-in CSP support
- ✅ Input validation ready (form inputs)
- ✅ localStorage only stores preferences (safe data)

## Future Enhancement Ideas

- Add backend with product database
- Implement real checkout with Stripe
- Add user accounts and order history
- Add product reviews and ratings
- Add wishlist functionality
- Add search and filtering
- Send confirmation emails
- Add inventory management
- Add product recommendations
- Add live chat support

---

**Happy building! 🚀**
