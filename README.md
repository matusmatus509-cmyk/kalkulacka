# 🔢 Kalkulačka (Samsung štýl) s tajným kúzlom

Webová aplikácia (PWA) – kalkulačka, ktorá vyzerá a funguje ako Samsung Calculator
(tmavý One UI motív, história, prevodník jednotiek, vedecký režim, animácie),
ale má jedno tajné kúzlo: **vedie donútiť výsledok výpočtu na číslo, ktoré si prednastavíš.**

## ✨ Funkcie

- Samsung One UI dark dizajn 1:1 (kruhové tlačidlá, ripple efekty, animácie číslic)
- Základné operácie, percentá štýlom Samsungu (200 + 10 % = 220), zátvorky
- História výpočtov (kliknutím vložíš výsledok späť)
- Prevodník jednotiek (dĺžka, hmotnosť, objem, plocha, rýchlosť, čas, dáta, teplota)
- Vedecký režim: sin, cos, tan (v stupňoch), log, ln, √, x², xʸ, π, e, n!, 1/x
- Inštalovateľná PWA – funguje aj **offline**

## 🔮 Tajné kúzlo

**Dlhé podržanie displeja** otvorí tajné menu, kde nastavíš:

- **tajné číslo** – číslo, ktoré má výpočet „donútiť“
- **spúšťač** – pri ktorom znamienku (+, −, ×, ÷) a na koľké stlačenie sa kúzlo aktivuje
  (môžeš celý príklad násobiť a kúzlo sa spustí pri pluse)
- **spôsob zobrazenia** – číslo sa píše tajne s každou číslicou, alebo sa celé
  dokončí až po N číslicach

Predstavenie: sčítavaš normálne, divák vidí hocijaké číslice, ktoré ťukáš –
ale kalkulačka tajne píše iné, správne číslice, a výsledok je vždy presne
tvoje predpovedané číslo. 🎩

## 📱 Inštalácia na mobil

### Android (Chrome)
1. Otvor stránku
2. Menu ⋮ → **„Inštalovať aplikáciu“** (alebo „Pridať na domovskú obrazovku“)

### iPhone (Safari)
1. Otvor stránku v Safari
2. Zdieľať ⬆️ → **„Pridať na domovskú obrazovku“**

Aplikácia sa potom spúšťa ako obyčajná appka – bez adresného riadku a funguje aj offline.

## 🚀 Spustenie lokálne

Stačí otvoriť `index.html` v prehliadači, alebo spustiť akýkoľvek statický server:

```
npx serve .
```

## 🧪 Testy

```
node test.js
```
