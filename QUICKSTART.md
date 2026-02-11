# 🚀 Quick Start Guide - Aroma Luxe

Get your perfume e-commerce site running in 2 minutes!

## 1️⃣ Install & Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

## 2️⃣ Test the Features

### 🌙 Night Mode
1. Look at top-right corner of navbar
2. Click the moon icon (🌙)
3. Entire site switches to dark theme
4. Refresh page - dark mode persists!

### 🌍 Language Switching
1. Click **"EN / AR"** button in navbar
2. All text instantly converts to Arabic
3. Layout flips to right-to-left (RTL)
4. Click again to switch back to English
5. Refresh page - language preference saved!

### 🛍️ Shopping Cart
1. Scroll down to **"Featured Collection"**
2. Click any perfume card to see details
3. Adjust quantity with **+ / −** buttons
4. Click **"Add to Cart"**
5. Notice cart counter updates in navbar
6. Click shopping bag icon to view cart
7. Adjust quantities or remove items
8. See total price with free shipping!

## 3️⃣ Key Features

✨ **6 Premium Perfumes**
- Midnight Elegance ($129.99)
- Ocean Breeze ($99.99)
- Rose Garden ($119.99)
- Spice Mystique ($139.99)
- Lavender Dreams ($109.99)
- Oud Heritage ($189.99)

🎨 **Beautiful Design**
- Responsive on all devices
- Smooth animations
- Professional dark mode
- Luxury color scheme

🌐 **Fully Bilingual**
- English & Arabic
- Auto RTL support
- Instant switching
- Persistent preference

💫 **Complete E-Commerce**
- Product browsing
- Detail modals
- Shopping cart
- Price calculations
- Shipping support

## 4️⃣ Browser Test

Try these browser features:

| Feature | How to Test |
|---------|------------|
| Dark Mode | Click moon icon, refresh page |
| Language | Click EN/AR, notice RTL layout |
| Mobile | Resize browser to phone size |
| Cart | Add multiple items, view total |
| Persistence | Change theme/language, refresh |

## 5️⃣ Mobile Testing

### On Mobile Device
1. Get your computer IP: `ipconfig getifaddr en0` (Mac) or `ipconfig` (Windows)
2. On mobile, go to: `http://YOUR_IP:3000`
3. Test all features on actual phone/tablet

### In Chrome Dev Tools
1. Open DevTools (F12)
2. Click device toggle button
3. Select "iPhone 12" or other device
4. Test responsive design
5. Test touch interactions

## 6️⃣ What's Inside

```
✅ Full e-commerce functionality
✅ 8 React components (navbar, hero, products, modal, cart, about, footer)
✅ Complete TypeScript types
✅ Dark mode with CSS transitions
✅ Arabic/English bilingual support
✅ Responsive mobile design
✅ Professional animations
✅ Beautiful color scheme
✅ Shopping cart with totals
✅ Product images from Unsplash
```

## 7️⃣ Customize It

### Change Product Prices
Open `/app/page.tsx`, find `const products`, edit prices:
```typescript
{
  id: 1,
  name: 'Midnight Elegance',
  price: 99.99,  // ← Change here
  // ...
}
```

### Change Colors
In components, change `amber-600` to your color:
```tsx
className="bg-amber-600"  // Change to blue-600, red-600, etc.
```

### Add New Products
In `/app/page.tsx`, add to products array:
```typescript
{
  id: 7,
  name: 'Your Perfume',
  arName: 'عطرك',
  price: 149.99,
  image: 'https://images.unsplash.com/...',
  description: 'Your description',
  arDescription: 'وصفك'
}
```

## 8️⃣ Deploy It

### To Vercel (Recommended - 1 Click)
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub repo
4. Click "Deploy"
5. Done! Your site is live! 🎉

### To Any Server
```bash
npm run build
npm run start
```

## 9️⃣ Common Questions

**Q: Why does the cart reset on refresh?**
A: Cart is in component state. To persist, add localStorage like the theme/language. See `IMPLEMENTATION.md` for how.

**Q: How do I change the product images?**
A: Replace Unsplash URLs in `/app/page.tsx` products array with your own images.

**Q: Can I add more languages?**
A: Yes! Add translation objects to each component and update the language toggle.

**Q: Does it work offline?**
A: No, images come from Unsplash CDN. You'll need internet for images.

**Q: How do I accept payments?**
A: Integrate Stripe or PayPal checkout button. See `IMPLEMENTATION.md` for architecture.

## 🔟 Next Steps

1. ✅ Run the dev server (`npm run dev`)
2. ✅ Test all features in your browser
3. ✅ Try dark mode and language switching
4. ✅ Add to cart and view totals
5. ✅ Deploy to Vercel or your server
6. ✅ Customize colors, products, and prices
7. ✅ Add your own content

## 📚 Full Documentation

- **README.md** - Complete feature documentation
- **IMPLEMENTATION.md** - Technical deep dive
- **Code comments** - In each component file

## 🎉 You're All Set!

Your luxury perfume e-commerce site is ready! 

Enjoy the features:
- 🌙 Dark mode
- 🌍 Bilingual (Arabic/English)
- 🛍️ Full shopping cart
- 💎 Professional design

### Questions or Issues?
Check the component comments or IMPLEMENTATION.md for technical details.

**Happy selling! 🎀✨**

---

### Quick Command Reference

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Check code quality
```

**Your site runs at:** `http://localhost:3000`
