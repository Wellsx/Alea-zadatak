### Requirements

- Node.js (v20+)
- npm

---

#### Instalacija projekta

`npm install` - instaliranje svih dependencia

`npx playwright install` - instaliranje sva 3 browser drivera ( `npx playwright install chromium/firefox/webkit` instalira specifican driver)

---

#### Pokretanje testova

`npm run test` - pokrece sve testove u headless mode na chromium/firefox/webkit browserima

`npm run testgui` - pokrece Playwright GUI Test Runner

`npm run test path/to/test` - pokrece specifican test npr. `npm run test tests/login.spec.ts` pokrece samo login testove

`npm run test -- --grep "ime test casea"` - pokrece samo specifican test case npr. `npm run test -- --grep "Verify home page loads correctly"` izvrsava samo "Verify home page loads correctly" test

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

**playwright.config.ts** - playwright test konfiguracije (baseURL, reporter, timeout setting, retry setting, browseri)
