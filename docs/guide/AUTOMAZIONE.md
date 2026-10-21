# Automazione: build, browser, EcoIndex e CI

[English](../en/guide/AUTOMATION.md) | **Italiano**

I controlli locali servono a intercettare regressioni ripetibili. Le scansioni
esterne e la revisione manuale hanno frequenze e scopi distinti.
Esegui i comandi dalla radice del toolkit; i percorsi di output relativi sono
risolti rispetto alla directory corrente.

## 1. Misurare la build

Gli script statici richiedono soltanto Node.js 22.12 o successivo:

```sh
node scripts/measure-page-weight.mjs /percorso/alla/build
node scripts/check-budget.mjs /percorso/alla/build
node scripts/check-links.mjs /percorso/alla/build
```

Il report `reports/page-weight.json` contiene tutte le route HTML trovate,
risorse locali uniche, byte grezzi, stime gzip/Brotli e risorse mancanti. Il
budget si applica a ogni pagina, non soltanto alla home. Gli importi nel budget
sono in byte: 1024 byte = 1 KiB. Le soglie sono scelte iniziali da motivare.

Il parser usa espressioni regolari: non è un browser. Non segue import JS,
import CSS o tutte le dipendenze CSS annidate; considera l'ultimo candidato di
ogni srcset e può contare alternative che il browser non caricherà insieme.
Classifica gli URL HTTP assoluti come remoti anche per il dominio originale.
Non usare l'assenza di riferimenti rilevati come prova assoluta di zero servizi
esterni. Il link checker è limitato a pagine HTML e frammenti locali.

## 2. Baseline e budget sono diversi

```sh
mkdir -p performance
cp reports/page-weight.json performance/page-weight-baseline.json
```

La baseline registra il punto di partenza. I report successivi confrontano le
stesse route con differenze assolute e percentuali. Una crescita della baseline
non causa da sola un fallimento: lo fanno le soglie in `budget.json`.
Non aggiornare entrambe solo per far passare un controllo; registra la decisione.

## 3. Misurare il caricamento nel browser

Installa gli strumenti e il browser una volta:

```sh
npm ci
npx playwright install chromium
npm run measure:network -- https://tuo-dominio.it/pagina/ reports/network-prima
```

Il comando deriva dalla misurazione usata nel talk. Esegue **tre** ripetizioni,
ciascuna in un contesto nuovo, cache HTTP disabilitata e service worker esclusi.
Viewport 1440×900, scala 1, locale it-IT, fuso Europe/Rome, nessuna simulazione
di CPU/rete e nessuna interazione. Osserva 15 secondi dall'inizio della navigazione.
Per una finestra diversa usa il terzo argomento, da 1 a 120 secondi:

```sh
npm run measure:network -- http://127.0.0.1:4321/ reports/network-locale 5
```

Conserva `results.json` e lo screenshot della prima prova. Il JSON include
versione Chromium, protocollo, URL finale, titolo, status, tempi, errori e singole
richieste. I byte sono quelli riportati da CDP per le richieste HTTP(S) concluse;
richieste incomplete e fallite vengono conteggiate separatamente e non ricevono
byte inventati. Le richieste verso altre origini non sono una classificazione
di tracker. Il contatore JS riguarda risorse di tipo Script: non misura tempo CPU
e non separa gli script inline dai byte del documento.

La mediana viene pubblicata soltanto con tre prove ammissibili. Timeout, status
di errore e alcune pagine di blocco vengono esclusi, ma il riconoscimento non
può essere completo: controlla sempre titolo e screenshot. Se le mediane sono
`null`, il comando ha conservato dati diagnostici, non un risultato confrontabile.
Le mediane delle metriche sono calcolate indipendentemente e non corrispondono
necessariamente a una stessa esecuzione.

Per consenso, scroll, login e interazioni usa una prova specifica e documentala:
questo script descrive il caricamento iniziale, non l'intera esperienza.

## 4. Importare EcoIndex

```sh
npm run metrics:ecoindex -- UUID_DEL_RISULTATO https://tuo-dominio.it/ reports/ecoindex-prima
```

Lo script importa solo un risultato esistente; valida URL e campi e separa
osservazioni e stime. Vedi [la guida EcoIndex](ECOINDEX.md) per interpretazione,
unità, risposte 204 e criteri di pubblicazione. Non è un job da lanciare su ogni
pull request e non sostituisce Network.

## 5. Lighthouse CI

La configurazione inclusa usa `./dist`, tre run della home e output locale.
Modifica `staticDistDir` e `url` per il progetto; usa URL assoluti e rimuovi
`staticDistDir` se vuoi misurare un sito remoto.

```sh
npm run lighthouse
```

Richiede Chrome/Chromium disponibile. Se necessario imposta `CHROME_PATH` al
suo eseguibile. Performance sotto 0,90 produce un avviso; accessibilità sotto
1 produce un errore. Queste soglie non sono dichiarazioni di conformità.
Non confondere `.lighthouseci/` con il report statico `reports/page-weight.json`.
Riferimento: [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci).

## 6. Frequenze ragionevoli

| Momento | Controlli suggeriti per questo progetto |
| --- | --- |
| Modifica al codice o al contenuto | Build, HTML, link, budget e test delle parti modificate |
| Nuova interazione | Browser, tastiera, screen reader e scenario senza JS |
| Rilascio rappresentativo | Lighthouse sulle route principali e confronto Network |
| Dopo il deploy | Compressione, cache, redirect, 404 e percorsi pubblici |
| Revisione pianificata o cambiamento sostanziale | EcoIndex, fornitore, WSG e dichiarazione tecnica |

Il template include una CI con i controlli del sito. Il toolkit include una CI
per i propri test: non cerca di costruire un sito che non contiene.
Per i test del toolkit: `npm test`; per la verifica browser locale dello script
Network: `npm run test:browser`, dopo l'installazione Chromium.

La lingua dei messaggi CLI è inglese. Il locale del browser osservato resta
it-IT, indipendente dalla lingua del manuale; riportalo nel protocollo anche
quando misuri pagine inglesi. Lo screenshot della prima prova è `page.png`.
