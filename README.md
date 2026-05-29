# Tiandy ישראל — אתר שיווקי (Hebrew / RTL)

אתר תדמית רב-עמודי בעברית (RTL) לפתרונות מצלמות ואבטחה, עם **לוח ניהול מוצרים**
(הוספה / עריכה / הסרה / שחזור / מחיקה) המגובה ב-Supabase.

> ⚠️ **הערת מותג:** הלוגו והשם משמשים כ-placeholder בלבד. יש לוודא שיש לכם
> הרשאה לשימוש במותג ובלוגו (למשל כמפיץ/נציג מורשה) לפני העלאה לאוויר.
> להחלפת הלוגו: החליפו את הקובץ `public/logo.svg`.

## טכנולוגיות
- React 18 + TypeScript + Vite
- Tailwind CSS (RTL, גופן Heebo)
- React Router
- Supabase (קטלוג מוצרים + התחברות מנהל)

## הרצה מקומית

```bash
npm install
cp .env.example .env   # מלאו את הפרטים (קיים כבר .env מקומי מוכן)
npm run dev            # http://localhost:5173
```

משתני סביבה (`.env`):

```
VITE_SUPABASE_URL=https://<project>.supabase.co
VITE_SUPABASE_ANON_KEY=<publishable-key>
```

## מבנה העמודים
| נתיב | תיאור |
|------|-------|
| `/` | דף הבית (Hero, מוצרים נבחרים, פתרונות) |
| `/products` | קטלוג מוצרים עם סינון לפי קטגוריה |
| `/products/:slug` | עמוד מוצר עם מפרט טכני |
| `/solutions` | פתרונות לפי ענף |
| `/about` | אודות |
| `/news` | חדשות |
| `/contact` | יצירת קשר |
| `/admin` | לוח ניהול מוצרים (דורש התחברות) |
| `/admin/login` | התחברות מנהל |

## בסיס הנתונים (Supabase)
נוצרו טבלאות בקידומת `tiandy_il_` כדי לא להתנגש בנתונים קיימים:
- `tiandy_il_categories` — קטגוריות
- `tiandy_il_products` — מוצרים. שדה `deleted_at` מאפשר **הסרה הניתנת לשחזור** (soft delete).

RLS: הציבור קורא רק מוצרים פעילים; משתמש מחובר (מנהל) רואה הכול ויכול לערוך.

## יצירת משתמש מנהל
כדי להתחבר ל-`/admin`, צרו משתמש ב-Supabase:
**Dashboard → Authentication → Users → Add user** (אימייל + סיסמה).
לאחר מכן התחברו דרך `/admin/login`.

## בנייה לפרודקשן
```bash
npm run build      # תוצר ב-dist/
npm run preview    # תצוגה מקדימה של הבנייה
```
ניתן לפרוס את תיקיית `dist/` בכל אחסון סטטי (Vercel / Netlify / Cloudflare Pages).
