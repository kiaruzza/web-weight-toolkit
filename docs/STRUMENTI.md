# 🧰 Catalogo ragionato degli strumenti

[English](en/TOOLS.md) | **Italiano**

Non serve usare tutto a ogni audit. Scegli gli strumenti in base alla domanda;
conserva output e condizioni, quindi ripeti la prova dopo la modifica.
«Incluso» indica uno script di questo repository; gli altri strumenti vanno
aperti o installati separatamente. Non sono integrati automaticamente dal toolkit.

## Pagine, rete e lavoro nel browser

| Strumento | Domanda e procedura iniziale | Evidenza e limite | Guida |
| --- | --- | --- | --- |
| [Chrome Network](https://developer.chrome.com/docs/devtools/network/reference/) | Quali file arrivano? Disabilita cache, ricarica e ordina per peso | Waterfall, richieste e trasferiti; prova iniziale diversa da cache calda | [Performance](guide/PERFORMANCE.md) |
| [Chrome Performance](https://developer.chrome.com/docs/devtools/performance) | Che cosa occupa il thread principale? Registra un'interazione | Trace con script/layout/render; dipende da dispositivo e scenario | [Performance](guide/PERFORMANCE.md) |
| [Chrome Coverage](https://developer.chrome.com/docs/devtools/coverage/) | Quanto CSS/JS viene usato? Registra l'intero percorso | Byte usati/non usati in quel percorso; non autorizza a cancellare codice alla cieca | [Progettazione](guide/PROGETTAZIONE.md) |
| [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) | Quali problemi emergono in laboratorio? Esegui tre prove | Report HTML/JSON e diagnostica; voto variabile | [Performance](guide/PERFORMANCE.md) |
| [PageSpeed Insights](https://developers.google.com/speed/docs/insights/v5/about) | Come si confrontano dati sul campo e laboratorio? Analizza l'URL esatto | CrUX quando disponibile e Lighthouse; ambiti e tempi differenti | [Performance](guide/PERFORMANCE.md) |
| [WebPageTest](https://www.webpagetest.org/) | Come cambia il caricamento per rete e località? Imposta lo stesso profilo prima/dopo | Waterfall e sequenza visiva; disponibilità e accesso al servizio da verificare | [Performance](guide/PERFORMANCE.md) |
| [Firefox Profiler](https://profiler.firefox.com/) | Quali attività pesano durante l'uso? Registra il percorso | Profilo CPU e, dove disponibili, contatori energetici; non tutti gli hardware li espongono | [Carbonio](guide/CARBONIO.md) |
| `measure-network.mjs` — incluso | Quanto viene trasferito in una finestra fissa? Fornisci URL e cartella output | Tre prove Chromium, richieste grezze e mediana; non misura un'intera sessione | [Automazione](guide/AUTOMAZIONE.md) |

## Accessibilità e qualità del documento

| Strumento | Uso pratico | Evidenza e limite | Guida |
| --- | --- | --- | --- |
| [axe-core / axe DevTools](https://github.com/dequelabs/axe-core) | Analizza pagine e stati aperti dell'interfaccia | Violazioni con elementi coinvolti; copertura parziale | [Accessibilità](guide/ACCESSIBILITA.md) |
| [WAVE](https://wave.webaim.org/) | Esamina struttura e avvisi nel contesto della pagina | Annotazioni per revisione umana; alcuni avvisi richiedono interpretazione | [Accessibilità](guide/ACCESSIBILITA.md) |
| [Nu HTML Checker](https://validator.w3.org/nu/) | Invia URL o HTML generato | Errori di markup; HTML valido non basta per l'accessibilità | [Accessibilità](guide/ACCESSIBILITA.md) |
| [HTML Validate](https://html-validate.org/) | Controlla i file generati in CI | Errori associati a regole configurate; non esegue il sito | [Automazione](guide/AUTOMAZIONE.md) |
| [Orca](https://help.gnome.org/orca/) — screen reader su Linux | Prova navigazione strutturale, lettura e form nel browser scelto | Annunci e percorso completato; registra desktop, browser, versione e configurazione di Orca | [Accessibilità](guide/ACCESSIBILITA.md#orca-su-linux) |
| [NVDA](https://www.nvaccess.org/) / VoiceOver del sistema | Ascolta titoli, landmark, link e form; completa il percorso | Note di prova e problemi reali; richiede familiarità con lo screen reader | [Accessibilità](guide/ACCESSIBILITA.md) |
| Tastiera, zoom e strumenti contrasto del browser | Prova focus, reflow e coppie cromatiche | Risultati manuali per stato/tema; il colore campionato deve corrispondere all'uso reale | [Accessibilità](guide/ACCESSIBILITA.md) |

## Risorse e regressioni

| Strumento | Uso pratico | Evidenza e limite | Guida |
| --- | --- | --- | --- |
| [Squoosh](https://squoosh.app/) | Confronta pixel, formato e qualità | File esportato e confronto visivo; serve una verifica alla dimensione d'uso | [Media/font](guide/MEDIA-FONT.md) |
| [Astro Picture](https://docs.astro.build/en/guides/images/) | Genera varianti responsive da originali locali | HTML e file ottimizzati; controlla quale variante scarica il browser | [Media/font](guide/MEDIA-FONT.md) |
| `measure-page-weight.mjs` — incluso | Misura una directory di build | JSON per route, byte grezzi e stime compresse; analisi statica con limiti documentati | [Automazione](guide/AUTOMAZIONE.md) |
| `check-budget.mjs` — incluso | Applica le soglie di budget.json a tutte le pagine | Codice di uscita e report; le soglie sono decisioni del progetto | [Automazione](guide/AUTOMAZIONE.md) |
| `check-links.mjs` — incluso | Verifica collegamenti HTML locali e frammenti | Link mancanti; non esegue il controllo dei servizi esterni | [Automazione](guide/AUTOMAZIONE.md) |
| [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) | Ripeti audit sulle route rappresentative | Report locali e soglie configurabili; non è monitoraggio continuo dei visitatori | [Automazione](guide/AUTOMAZIONE.md) |
| curl — strumento di sistema | Richiedi risposte e ispeziona header e redirect | HTTP osservato sul deploy; HEAD e GET possono differire | [Hosting](guide/HOSTING.md) |

## Indicatori, hosting e modelli ambientali

| Strumento o riferimento | Uso pratico | Evidenza e limite | Guida |
| --- | --- | --- | --- |
| [WSG](https://www.w3.org/TR/web-sustainability-guidelines/) | Rivedi prodotto, UX, codice e infrastruttura | Criteri collegati a evidenze; non è uno scanner di URL | [WSG](guide/WSG.md) |
| [EcoIndex](https://www.ecoindex.fr/) | Analizza una pagina e leggi peso, richieste e DOM prima del voto | Risultato datato, classe e stime del modello; non misura direttamente l'energia | [EcoIndex](guide/ECOINDEX.md) |
| `import-ecoindex.mjs` — incluso | Archivia un risultato già esistente con verifica dell'URL | Snapshot e risposta grezza; non avvia nuove scansioni | [EcoIndex](guide/ECOINDEX.md) |
| [Ecograder](https://ecograder.com/) | Usa le raccomandazioni come ipotesi da verificare | Report e suggerimenti; annota versione del servizio e pagina esaminata | [EcoIndex](guide/ECOINDEX.md) |
| [Website Carbon](https://www.websitecarbon.com/) | Esplora un'altra valutazione ambientale della pagina | Stima con metodo proprio; evitare confronti numerici tra modelli diversi | [Carbonio](guide/CARBONIO.md) |
| [Green Web Check](https://www.thegreenwebfoundation.org/green-web-check/) | Cerca il dominio effettivamente servito | Associazione con un provider verificato nel dataset; non valuta il codice | [Hosting](guide/HOSTING.md) |
| [Green Web Directory](https://www.thegreenwebfoundation.org/tools/directory/) | Cerca provider e verifica documentazione e servizio | Elenco e riferimenti; non è una comparazione completa dei servizi | [Hosting](guide/HOSTING.md) |
| [carbon.txt builder / validator](https://carbontxt.org/tools) | Descrivi fornitori e documenti pubblici, poi valida | File leggibile dalle macchine; sintassi valida non prova le dichiarazioni | [Hosting](guide/HOSTING.md) |
| [CO2.js](https://developers.thegreenwebfoundation.org/co2js/overview/) | Applica un modello esplicito a input dichiarati | Stima e parametri riproducibili; non trasforma i byte in una misura diretta | [Carbonio](guide/CARBONIO.md) |
| [Impact Framework](https://if.greensoftware.foundation/) | Organizza osservazioni e trasformazioni in una pipeline | Manifest e risultati ispezionabili; qualità dipendente dagli input | [Carbonio](guide/CARBONIO.md) |
| [GSF Learn, italiano](https://learn.greensoftware.foundation/it/) / [Patterns](https://patterns.greensoftware.foundation/personas/front-end-engineer/) | Studia principi e scegli un pattern da sperimentare | Decisione progettuale motivata; formazione distinta dall'audit | [Carbonio](guide/CARBONIO.md) |
| [SCI for Web](https://greensoftware.foundation/standards/sci-web/) | Approfondisci confini e unità funzionali per applicazioni web | Progetto in bozza, non un punteggio già prodotto dal toolkit | [Carbonio](guide/CARBONIO.md) |

Per gli strumenti presenti anche nel talk, le guide riprendono le prove:
Network, navigazione senza JavaScript, Squoosh, build/EcoIndex e tastiera.
