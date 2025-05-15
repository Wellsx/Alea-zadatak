### Requirements

- Node.js (v20+)
- npm

---

#### Pokretanje projekta

`npm install` - instaliranje svih dependencia

`npm run test` - pokrece sve testove u headless mode na chromium/firefox/webkit browserima

`npm run testgui` - pokrece Playwright GUI Test Runner

`npm run report` - otvara prethodno generisan report

`npm run test:chromium  ` - pokrece testove u headless mode sa Chromium

`npm run test:firefox` - pokrece testove u headless mode sa Firefox

`npm run test:webkit` - pokrece testove u headless mode sa WebKit

---

#### Struktura projekta

**tests/** - Sadrzi test fajlove

**pages/** - Page Object Model klase.

**data/** - Testni podaci

**playwright-report/** - Nakon izvrsavanja testova playwright generise HTML report koji se automatski otvara, ili preko gore navedene komande
