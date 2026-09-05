const fs = require('fs');
let src = fs.readFileSync(require('path').join(__dirname, 'index.html'), 'utf8');
let js = src.match(/<script>([\s\S]*)<\/script>/)[1];
js = js.split('/* ---------- eventy ---------- */')[0];

const store = {};
global.localStorage = { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = v; } };
global.document = {
  getElementById: () => ({ addEventListener: () => {}, classList: { contains: () => false, add: () => {}, remove: () => {}, toggle: () => {} }, value: '', textContent: '', scrollLeft: 0, scrollWidth: 0, style: {} }),
  querySelectorAll: () => [],
  addEventListener: () => {},
  body: { classList: { contains: () => false, add: () => {}, toggle: () => {} } }
};

const test = `
localStorage.setItem('magic.secret', '2500');

// Test 1: tretie sčítanie je kúzelné - kliká sa 555, musí sa donútiť na 2500
digitPress('5'); digitPress('0'); digitPress('0');
opPress('+');
digitPress('3'); digitPress('0'); digitPress('0');
opPress('+');
digitPress('9'); digitPress('9'); digitPress('9');
opPress('+');   // 3. plus -> kúzlo
digitPress('5'); digitPress('5'); digitPress('5');   // kliká hocičo
equalsPress();
console.log('výraz:', exprShown, '| výsledok:', lastResultStr);
const norm = s => s.replace(/[\s\u00A0\u202F]/g, '');
if (norm(lastResultStr) !== '2500') { console.log('FAIL 1'); process.exit(1); }

// Test 2: len dve sčítania - normálny výsledok
acPress();
digitPress('1'); opPress('+'); digitPress('2'); opPress('+'); digitPress('3'); equalsPress();
console.log('bez kúzla (2 plusy):', lastResultStr);
if (lastResultStr !== '6') { console.log('FAIL 2'); process.exit(1); }

// Test 3: po '=' začína nová séria
acPress();
digitPress('1'); digitPress('0'); opPress('+'); digitPress('2'); digitPress('0'); equalsPress();
console.log('nová séria, prvé sčítanie:', lastResultStr);
if (lastResultStr !== '30') { console.log('FAIL 3'); process.exit(1); }

// Test 4: násobenie a Samsung-style percentá (100 + 50% = 150)
acPress();
digitPress('5'); digitPress('0'); opPress('×'); digitPress('2'); opPress('+'); digitPress('5'); digitPress('0'); digitPress('%'); equalsPress();
console.log('50 × 2 + 50% =', lastResultStr);
if (norm(lastResultStr) !== '150') { console.log('FAIL 4'); process.exit(1); }

// Test 5: spúšťač × na 2. stlačenie - kúzlo pri násobení
localStorage.setItem('magic.secret', '600');
localStorage.setItem('magic.triggerOp', '×');
localStorage.setItem('magic.triggerCount', '2');
acPress();
digitPress('4'); opPress('×'); digitPress('5');
opPress('×');   // 2. krát -> kúzlo
digitPress('7'); digitPress('7'); digitPress('7');   // kliká hocičo
equalsPress();
console.log('spúšťač ×: výraz:', exprShown, '| výsledok:', lastResultStr);
if (norm(lastResultStr) !== '600') { console.log('FAIL 5'); process.exit(1); }

// Test 6: spúšťač + na 1. stlačenie - násobenie predtým normálne, kúzlo pri pluse
localStorage.setItem('magic.secret', '100');
localStorage.setItem('magic.triggerOp', '+');
localStorage.setItem('magic.triggerCount', '1');
acPress();
digitPress('6'); opPress('×'); digitPress('7');
opPress('+');   // 1. plus -> kúzlo
digitPress('9'); digitPress('9');   // kliká hocičo
equalsPress();
console.log('spúšťač + po násobení: výraz:', exprShown, '| výsledok:', lastResultStr);
if (norm(lastResultStr) !== '100') { console.log('FAIL 6'); process.exit(1); }

// Test 7: spúšťač − na 1. stlačenie
localStorage.setItem('magic.secret', '25');
localStorage.setItem('magic.triggerOp', '−');
localStorage.setItem('magic.triggerCount', '1');
acPress();
digitPress('8'); digitPress('0');
opPress('−');   // 1. mínus -> kúzlo
digitPress('1'); digitPress('1'); digitPress('1');   // kliká hocičo
equalsPress();
console.log('spúšťač −: výraz:', exprShown, '| výsledok:', lastResultStr);
if (norm(lastResultStr) !== '25') { console.log('FAIL 7'); process.exit(1); }

// Test 8: vedecké funkcie v parseri
const approx = (a, b) => Math.abs(a-b) < 1e-9;
if (!approx(evalExpr('sin(30)'), 0.5)) { console.log('FAIL 8a sin'); process.exit(1); }
if (!approx(evalExpr('cos(60)'), 0.5)) { console.log('FAIL 8b cos'); process.exit(1); }
if (!approx(evalExpr('log(100)'), 2)) { console.log('FAIL 8c log'); process.exit(1); }
if (!approx(evalExpr('ln(e)'), 1)) { console.log('FAIL 8d ln'); process.exit(1); }
if (!approx(evalExpr('√9'), 3)) { console.log('FAIL 8e sqrt'); process.exit(1); }
if (!approx(evalExpr('5!'), 120)) { console.log('FAIL 8f faktorial'); process.exit(1); }
if (!approx(evalExpr('2^10'), 1024)) { console.log('FAIL 8g mocnina'); process.exit(1); }
if (!approx(evalExpr('2×π'), 2*Math.PI)) { console.log('FAIL 8h pi'); process.exit(1); }
if (!approx(evalExpr('sin(30)+cos(60)'), 1)) { console.log('FAIL 8i kombinacia'); process.exit(1); }
if (!approx(evalExpr('1÷(5)'), 0.2)) { console.log('FAIL 8j prevratena'); process.exit(1); }
console.log('vedecké funkcie: OK');

// Test 9: režim "dokončí sa po N číslicach" - force číslice ako doteraz,
// ale pri 3. kliknutí sa celé číslo hneď dokončí
localStorage.setItem('magic.secret', '2500');
localStorage.setItem('magic.triggerOp', '+');
localStorage.setItem('magic.triggerCount', '3');
localStorage.setItem('magic.revealMode', 'after');
localStorage.setItem('magic.revealAfter', '3');
acPress();
digitPress('5'); digitPress('0'); digitPress('0');
opPress('+');
digitPress('3'); digitPress('0'); digitPress('0');
opPress('+');
digitPress('9'); digitPress('9'); digitPress('9');
opPress('+');   // kúzlo aktívne
digitPress('7');   // 1. klik -> force číslica 7
if (cur !== '7') { console.log('FAIL 9a, cur=' + cur); process.exit(1); }
digitPress('8');   // 2. klik -> force číslica 0 (bez ohľadu na kliknuté)
if (cur !== '70') { console.log('FAIL 9b, cur=' + cur); process.exit(1); }
digitPress('6');   // 3. klik -> celé číslo 701 sa dokončí naraz
if (cur !== '701') { console.log('FAIL 9c, cur=' + cur); process.exit(1); }
digitPress('9'); digitPress('9');   // ďalšie kliknutia sa ignorujú
if (cur !== '701') { console.log('FAIL 9d, cur=' + cur); process.exit(1); }
equalsPress();
console.log('režim "dokončí sa po 3 číslicach": výraz:', exprShown, '| výsledok:', lastResultStr);
if (norm(lastResultStr) !== '2500') { console.log('FAIL 9e'); process.exit(1); }

console.log('OK - všetky testy prešli');
`;

eval(js + test);
