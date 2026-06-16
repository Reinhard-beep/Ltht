# LTHT - Logistics and Transport Hub Tanzania

PWA (Progressive Web App) kamili inayounganisha Wamiliki wa Mizigo (Cargo Owners) na Wamiliki wa Magari (Vehicle Owners/Drivers), ikiwa na Admin Dashboard kwa usimamizi wa mfumo mzima.

## Faili Zilizopo

- `index.html` — Ukurasa mkuu wa app (HTML + CSS)
- `app.js` — Logic yote ya app (pages, navigation, data)
- `manifest.json` — PWA manifest (inaruhusu "Install App")
- `sw.js` — Service Worker (inaruhusu app kufanya kazi offline)
- `icons/icon-192.png` na `icons/icon-512.png` — Icons za app

## Jinsi ya Kupakia kwenye GitHub Pages (Hatua kwa Hatua)

### Hatua 1: Fungua Repo Mpya GitHub
1. Ingia GitHub.com
2. Bonyeza **New repository**
3. Jina la repo: `ltht-app` (au jina lolote unalopenda)
4. Chagua **Public**
5. Bonyeza **Create repository**

### Hatua 2: Pakia Faili Zote
1. Kwenye repo mpya, bonyeza **uploading an existing file**
2. Drag & drop faili zote: `index.html`, `app.js`, `manifest.json`, `sw.js`
3. Kisha unda folder `icons` na pakia `icon-192.png` na `icon-512.png` ndani yake
   (Unaweza kuunda folder kwa kuandika `icons/icon-192.png` kwenye jina la faili wakati wa upload)
4. Bonyeza **Commit changes**

### Hatua 3: Wezesha GitHub Pages
1. Kwenye repo, bonyeza **Settings**
2. Kwenye sidebar ya kushoto, bonyeza **Pages**
3. Chini ya "Branch", chagua **main** na folder **/ (root)**
4. Bonyeza **Save**
5. Subiri dakika 1-2, link yako itaonekana juu, mfano:
   `https://jina-lako.github.io/ltht-app/`

### Hatua 4: Install App kwenye Simu
1. Fungua link yako kwenye Chrome (Android) au Safari (iPhone)
2. **Android (Chrome):** Bonyeza menu (nukta tatu) → "Add to Home screen" / "Install app"
3. **iPhone (Safari):** Bonyeza Share icon → "Add to Home Screen"
4. App itaonekana kwenye home screen yako kama app ya kawaida!

## Demo Access (Bila Kujisajili)

Kwenye landing page, kuna vitufe vitatu vya "Demo Quick Access":
- 📦 **Mwenye Mzigo** — Cargo Owner dashboard
- 🚛 **Mwenye Gari** — Driver dashboard
- 🔐 **Admin** — Admin dashboard (KYC queue, watumiaji, safari zote)

Pia unaweza kujaribu Login kwa kutumia email yoyote:
- Email yenye "admin" → Admin
- Email yenye "driver" → Driver
- Email nyingine yoyote → Cargo Owner

## Kuboresha Baadaye (Production)

Hii ni demo ya kazi (functional prototype) yenye data ya mock. Kwa toleo la uzalishaji halisi (production), utahitaji:
- **Backend halisi:** Supabase au Firebase kwa database, authentication, na kuhifadhi nyaraka za KYC
- **Maps halisi:** Google Maps API au Mapbox kwa live tracking
- **SMS/Push notifications:** kwa arifa za kweli kwa watumiaji
- **Payment integration:** M-Pesa, Tigo Pesa, au CRDB Lipa Namba kwa malipo

Niambie ukiwa tayari kuongeza vipengele hivi — naweza kukusaidia kuunganisha kila kimoja.
