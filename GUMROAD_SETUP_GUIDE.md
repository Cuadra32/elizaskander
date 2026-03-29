# Eliza Skander — Nutrition Plan Tool
## Gumroad Setup & Monetisation Guide

---

## What you have

- **nutrition_plan.html** — the tool, with 20 access codes pre-loaded
- **codes_for_gumroad.txt** — your list of 20 codes to paste into Gumroad
- This guide

---

## Step 1 — Put the tool on elizaskander.com

1. Upload **nutrition_plan.html** to your website
   - In Squarespace: Pages → Not Linked → Add Page → Code Block, or use File Storage
   - In Wix: Add a new page, embed the HTML file via Wix's Embed widget
   - In WordPress: Upload via Media, link directly
   - **Easiest option**: Upload to Netlify (drag & drop) and link from your site

2. The URL will be something like:
   `https://elizaskander.com/nutrition-plan`
   or
   `https://your-name.netlify.app/nutrition_plan.html`

3. **Keep this URL unlisted** — don't put it in your main navigation.
   Clients only get the link after they've paid.

---

## Step 2 — Set up Gumroad product

1. Log in to **gumroad.com**
2. Click **New Product** → choose **Digital product**
3. Fill in:
   - **Name**: Personalised Nutrition Plan Generator — Access Code
   - **Price**: CHF 30
   - **Description**: (copy from section below)
4. Under **Content** → choose **"I'll add a unique key"**
5. Paste all 20 codes (one per line):

```
ELIZA-7H9R-48DH
ELIZA-AUAE-VHQ7
ELIZA-AJQ4-T4U8
ELIZA-526T-9XSQ
ELIZA-VE42-72RD
ELIZA-UKEG-7DUX
ELIZA-ZFXX-W753
ELIZA-WPVJ-T67V
ELIZA-JZHK-SPEG
ELIZA-E5XF-JSPW
ELIZA-4XKF-4P7E
ELIZA-24NS-HT6U
ELIZA-XP6Y-63XZ
ELIZA-DW2D-JP3R
ELIZA-AP5P-6MHW
ELIZA-55CW-J4SP
ELIZA-MNV5-FFNY
ELIZA-7JRQ-XM78
ELIZA-HBZU-F74B
ELIZA-Z9HQ-KHBP
```

6. Under **Delivery email**, write something like:
   > Hi [name], your access code is: **{key}**
   >
   > Use it here: [YOUR TOOL URL]
   >
   > The code is single-use and valid for one session.
   > Questions? elizaskander@yahoo.com

7. Set **Quantity** to 20 (one per code)
8. Click **Publish**

---

## Step 3 — Link from your website

Add a button on your website or Instagram bio that goes to your Gumroad product page.

**Button text ideas:**
- "Get Your Nutrition Plan — CHF 30"
- "Buy Plan Access"
- "Generate My Plan"

---

## Gumroad product description (copy & paste)

---

**Personalised Nutrition Plan Generator**
*Built by Eliza Skander — Nutrition & Performance Coach*

Get an instant, fully personalised nutrition plan built around your body, goals and lifestyle.

**What you get:**
- Calorie and macro targets calculated to the gram (protein, carbs, fats)
- 7-day meal plan tailored to your diet (omnivore, vegetarian, pescatarian, no fish)
- Protein sources table with portions
- Supplement guide — only what actually has evidence
- Lifestyle tips: meal prep, alcohol, hydration, flexibility
- Optional full training plan — Push/Pull/Legs or Full Body, adapted to your equipment
- Export to PDF — print-ready, professionally formatted

**Goals supported:**
Recomposition · Fat loss · Muscle gain · Maintenance · Improve fitness · Power & agility (rugby/sport)

**Languages:** English · Français · Polski

**How it works:**
1. Pay CHF 30 — you'll receive your unique access code by email immediately
2. Visit the plan generator (link in your delivery email)
3. Enter your code, fill in your profile, click Generate
4. Save as PDF — your plan is ready in seconds

*Each code is for one client session. Contact elizaskander@yahoo.com for bulk coaching packages.*

---

## When your codes run low

When you've sold 18–19 codes, generate more:

1. Open Terminal (Mac) and run:
   ```
   python3 -c "
   import hashlib, secrets, string
   chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
   for i in range(10):
       p1 = ''.join(secrets.choice(chars) for _ in range(4))
       p2 = ''.join(secrets.choice(chars) for _ in range(4))
       code = f'ELIZA-{p1}-{p2}'
       h = hashlib.sha256(code.encode()).hexdigest()
       print(f'Code: {code}')
       print(f'Hash: {h}')
       print()
   "
   ```

2. Add the new codes to Gumroad (Product → Edit → Add keys)
3. Add the new hashes to the `VALID_HASHES` array in **nutrition_plan.html**
4. Re-upload the HTML file to your website

---

## Pricing ideas for the future

| Product | Price | Notes |
|---|---|---|
| Single plan code | CHF 30 | What you have now |
| 3-plan bundle | CHF 75 | For clients wanting updates |
| Coach package (10 codes) | CHF 200 | Sell to other coaches |
| Monthly unlimited | CHF 89/month | Would need Netlify setup |

---

*elizaskander@yahoo.com · www.elizaskander.com*
