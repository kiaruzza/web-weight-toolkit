# 📏 Web Weight Toolkit

[English](README.md) | **Italiano**

Strumenti, checklist e guide in italiano e inglese per analizzare un sito esistente e
migliorarne prestazioni ed efficienza. Estratti dagli script di chiaracorrado.dev:
[origine e adattamenti](ORIGINE.md). Licenza [MIT](LICENSE).

## 📚 Manuale completo

Il [manuale in italiano](docs/README.md) raccoglie procedure e materiali compilabili:

- [Catalogo degli strumenti](docs/STRUMENTI.md): rete, runtime, accessibilità, risorse, hosting e modelli.
- [Metodo di audit](docs/guide/METODO.md) e [revisione WSG](docs/guide/WSG.md).
- [EcoIndex ed Ecograder](docs/guide/ECOINDEX.md), con importazione di risultati esistenti.
- [Performance](docs/guide/PERFORMANCE.md), [accessibilità](docs/guide/ACCESSIBILITA.md), [media e font](docs/guide/MEDIA-FONT.md).
- [Hosting e carbon.txt](docs/guide/HOSTING.md), [energia e modelli ambientali](docs/guide/CARBONIO.md).
- [Decisioni di progetto](docs/guide/PROGETTAZIONE.md), [automazione e CI](docs/guide/AUTOMAZIONE.md).
- [Glossario](docs/GLOSSARIO.md), [fonti verificate e versioni](docs/FONTI.md), modelli di audit e registro degli interventi.

```sh
npm ci
npx playwright install chromium
npm run measure:network -- https://tuo-dominio.it/ reports/network-prima
npm run metrics:ecoindex -- UUID_DEL_RISULTATO https://tuo-dominio.it/ reports/ecoindex-prima
```

Il comando `metrics:ecoindex` importa una rilevazione EcoIndex già esistente;
non avvia scansioni. Gli URL e gli UUID qui sono segnaposto da sostituire.
Per unità, condizioni e limiti, leggere le guide prima di confrontare risultati.

## 🧭 Scegli il percorso

- **Hai solo l'URL pubblico:** segui la [guida agli strumenti](docs/GUIDA.md), partendo da Network e Lighthouse. Gli script di build non scaricano il sito.
- **Hai una build statica:** usa i comandi sotto per misurare HTML e risorse locali e controllare un budget.
- **Devi decidere gli interventi:** usa la [checklist](docs/CHECKLIST.md) e registra i risultati nel [modello di audit](templates/AUDIT.md).

## Analizzare una build

Richiede Node.js 22.12 o successivo. I tre script di analisi locale non richiedono
pacchetti esterni. Esegui dalla cartella del toolkit:

```sh
node scripts/measure-page-weight.mjs /percorso/assoluto/alla/build
node scripts/check-budget.mjs /percorso/assoluto/alla/build
node scripts/check-links.mjs /percorso/assoluto/alla/build
```

Puoi usare anche `npm run measure:weight -- /percorso/build` e gli equivalenti
`check:budget` e `check:links`. Senza argomento cercano `dist/` nella directory corrente.
Il report viene scritto in `reports/page-weight.json` della directory corrente;
il comando budget lo rigenera e termina con codice 1 se una soglia viene superata
su qualunque pagina o se manca una risorsa referenziata.

Modifica `budget.json` per adattare i limiti al progetto: i valori in byte usano
KiB (1024 byte), `requests` conta risorse locali uniche più il documento,
`thirdParty` conta riferimenti remoti rilevati. Zero JS è una scelta del template:
per un sito con interazioni necessarie stabilisci una soglia motivata.
Il link checker verifica pagine HTML locali e frammenti, non disponibilità dei
link esterni o download non HTML. Non impone l'apertura in una nuova scheda.

## Confrontare prima e dopo

Dopo una build rappresentativa, conserva il report come baseline:

```sh
mkdir -p performance
cp reports/page-weight.json performance/page-weight-baseline.json
```

Modifica il sito, rigenera la build e ripeti la misura. Il report successivo
include differenze assolute e percentuali per le stesse route. Non sovrascrivere
la baseline prima di avere valutato la regressione. Versiona solo una baseline
revisionata, priva di dati riservati.

## Lighthouse CI opzionale

```sh
npm ci
npm run lighthouse
```

La configurazione inclusa cerca `./dist` e analizza la home tre volte. Copia lì
la build oppure modifica `staticDistDir` in `.lighthouserc.json`; aggiungi le
route rappresentative in `url`. Richiede Chrome/Chromium installato:
se necessario imposta `CHROME_PATH` sul suo eseguibile. I report restano locali
in `.lighthouseci/`. Per un sito remoto rimuovi `staticDistDir` e inserisci URL
assoluti. La soglia performance 0,90 genera un avviso; accessibilità 1 un errore.
Sono scelte iniziali: il punteggio 100 non certifica la conformità WCAG.

## Cosa significano le misure

Il report statico somma HTML e risorse locali rilevate e stima gzip/Brotli.
Non misura rete, CPU, energia o emissioni. Le dimensioni inline sono incluse
nell'HTML e mostrate anche per categoria: non sommare le categorie al totale.

Il parser deriva dal sito originale e usa espressioni regolari. Assume una build
servita alla radice; non risolve ogni costrutto HTML/CSS. Considera l'ultimo
candidato di ciascun srcset e conta separatamente alternative di un picture,
anche se il browser ne scaricherà una sola. Non esegue JS, non segue import JS,
import CSS o tutte le dipendenze CSS annidate, e non applica media query. I
riferimenti HTTP assoluti sono classificati come esterni anche per il dominio
originale. `thirdParty` descrive quei riferimenti, non identifica tracker.
Usa Network per confermare richieste, risorse selezionate e byte trasferiti.

`npm test` verifica il conteggio dei file, le risorse mancanti e l'applicazione
del budget anche alle pagine interne. I test non richiedono installazioni npm.

Progetto complementare: [Lighter Web Starter](https://github.com/kiaruzza/lighter-web-starter).

I messaggi CLI e le chiavi dei report sono in inglese; le guide hanno edizioni
complete in entrambe le lingue.
