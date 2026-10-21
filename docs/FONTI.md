# Fonti, versioni e manutenzione

[English](en/SOURCES.md) | **Italiano**

Revisione: 21 ottobre 2026. Le guide sono una rielaborazione operativa originale
in italiano, con link alle fonti per verificare definizioni e comportamento dei
servizi. Codice e documenti di terzi mantengono licenze e attribuzioni proprie.

| Ambito | Fonte primaria | Nota di manutenzione |
| --- | --- | --- |
| WSG | [Bozza fissata 16 ottobre 2026](https://www.w3.org/TR/2026/DNOTE-web-sustainability-guidelines-20261016/) / [ultima pubblicata](https://www.w3.org/TR/web-sustainability-guidelines/) | Riesaminare titoli, criteri e collegamenti quando cambia versione |
| WCAG | [WCAG 2.2](https://www.w3.org/TR/WCAG22/) / [WAI, valutazione](https://www.w3.org/WAI/test-evaluate/) | Distinguere test automatici e verifica completa |
| Rete e runtime | [Network](https://developer.chrome.com/docs/devtools/network/reference/), [Performance](https://developer.chrome.com/docs/devtools/performance), [Coverage](https://developer.chrome.com/docs/devtools/coverage/) | Registrare versione del browser usato |
| Laboratorio/campo | [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/), [PSI](https://developers.google.com/speed/docs/insights/v5/about) | Registrare versione, profilo e ambito dei dati |
| Automazione | [LHCI](https://github.com/GoogleChrome/lighthouse-ci), [Playwright](https://playwright.dev/docs/intro), [axe-core](https://github.com/dequelabs/axe-core) | Lockfile e controlli dopo gli aggiornamenti |
| Screen reader Linux | [Orca, manuale GNOME](https://help.gnome.org/orca/) | Registrare desktop, browser, versione e layout tastiera; comandi secondo configurazione |
| Immagini | [Squoosh](https://squoosh.app/), [Astro](https://docs.astro.build/en/guides/images/) | Formati e varianti da verificare nel browser |
| EcoIndex | [Metodo](https://www.ecoindex.fr/en/how-it-works/), [API](https://api.ecoindex.fr/docs), [OpenAPI](https://api.ecoindex.fr/openapi.json) | Endpoint verificati: GET /v1/ecoindexes/{id} e /best-practices; gestire 204 |
| Ecograder | [Servizio](https://ecograder.com/) | Il sito presenta beta e collegamento legacy: annotare quale versione si usa |
| Hosting | [Green Web Check](https://www.thegreenwebfoundation.org/support/how-does-the-green-web-check-work/), [Directory](https://www.thegreenwebfoundation.org/tools/directory/) | Riesaminare dominio e documenti al cambio di servizio |
| Dichiarazioni | [carbon.txt tools](https://carbontxt.org/tools) / [sintassi](https://carbontxt.org/syntax) | Usare il validator corrente, non copiare dichiarazioni altrui |
| Modelli | [CO2.js](https://developers.thegreenwebfoundation.org/co2js/overview/), [IF](https://if.greensoftware.foundation/) | Conservare versione, parametri, unità e input |
| Profiler | [Firefox/CO2.js, descrizione GWF](https://www.thegreenwebfoundation.org/news/carbon-emissions-in-browser-devtools-firefox-profiler-and-co2-js/) | Verificare disponibilità contatori per piattaforma |
| Formazione | [GSF Learn IT](https://learn.greensoftware.foundation/it/), [Patterns](https://patterns.greensoftware.foundation/personas/front-end-engineer/), [SCI for Web](https://greensoftware.foundation/standards/sci-web/) | Traduzione community; SCI for Web presentato come progetto in bozza |

Durante la revisione il fetch automatico di WebPageTest e della sua documentazione
ha restituito 403/502; Website Carbon ha restituito 403. Sono inclusi come
riferimenti da consultare manualmente, senza attribuire loro prezzi, parametri,
funzioni di account o formule non verificati.

Per aggiornare il manuale: aprire la fonte primaria, confrontare versione e
stato, verificare comandi ed esempi pertinenti, aggiornare data e note. Non
copiare testi completi di standard nel repository: collegare la versione precisa.
