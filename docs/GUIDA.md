# Analizzare e alleggerire un sito esistente

[English](en/GUIDE.md) | **Italiano**

Questo è il percorso introduttivo. Il [manuale completo](README.md) offre guide
dedicate, [catalogo degli strumenti](STRUMENTI.md), WSG, modelli e procedure di automazione.

## 1. Definisci una prova ripetibile

Scegli home, pagina di contenuto e un percorso importante per le persone.
Annota URL esatto, data, browser/versione, viewport, rete, CPU, cache, consenso
e interazioni. Misura almeno tre volte con le stesse condizioni e conserva
risultati grezzi e mediana. Confronta la stessa pagina prima e dopo.
Una pagina di blocco, un errore HTTP o un contenuto diverso invalida il confronto.

## 2. Network: capire che cosa viene scaricato

Apri DevTools → Network, attiva la disabilitazione della cache e ricarica con
DevTools aperto. Registra numero di richieste, byte trasferiti e dimensioni
delle risorse; sono grandezze distinte. Ordina per dimensione, filtra immagini,
font e JS. Controlla la cascata delle richieste, status, Initiator e dominio.
Conserva un HAR solo dopo aver rimosso cookie, token e dati personali.

Ripeti con cache attiva per distinguere prima visita e visita successiva.
Non confrontare una prova con cache vuota con una che riusa risorse locali.
Le richieste verso altre origini includono CDN e sottodomini: non sono tutte tracker.

Riferimento: [Chrome DevTools Network](https://developer.chrome.com/docs/devtools/network/reference/).

## 3. Senza JavaScript e da tastiera

Da DevTools disabilita JavaScript e ricarica. Verifica che testo, link e
navigazione rimangano disponibili. Individua cosa richiede realmente uno script:
un pulsante presente ma inerte va corretto, nascosto o dotato di alternativa.

Riabilita JS e prova Tab, Shift+Tab, Enter, Space ed Escape dove pertinenti.
Controlla ordine del focus, salto al contenuto, indicatore visibile, assenza di
trappole e nomi comprensibili. Prova zoom e uno screen reader. axe e Lighthouse
coprono soltanto una parte dei problemi; non sostituiscono queste prove.

Riferimenti: [axe-core](https://github.com/dequelabs/axe-core),
[controlli di accessibilità Lighthouse](https://developer.chrome.com/docs/lighthouse/accessibility/).

## 4. Immagini: riduci pixel e qualità con criterio

In [Squoosh](https://squoosh.app/) confronta originale e varianti alla dimensione
in cui saranno visualizzate. Parti dalle immagini più pesanti viste in Network.
Riduci prima i pixel inutili, poi prova WebP/AVIF e qualità. Conserva l'originale.
Usa srcset e sizes coerenti con il layout, width/height per riservare spazio,
lazy loading sotto la piega. L'immagine principale non va caricata in lazy.
Verifica leggibilità, dettagli significativi e variante scaricata dal browser.

## 5. Lighthouse e PageSpeed Insights

Esegui Lighthouse su una build di produzione, con condizioni annotate e tre
ripetizioni. Leggi diagnostica e opportunità, oltre al punteggio. Controlla LCP,
CLS e il costo del JavaScript; TBT è una metrica di laboratorio e non sostituisce
INP. Le metriche sul campo descrivono visite reali; quelle di laboratorio una
simulazione. PageSpeed Insights può mostrare entrambe quando i dati sul campo
sono disponibili. Non attribuire all'intervento differenze dovute a rete o contenuti.

Riferimenti: [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/),
[PageSpeed Insights](https://developers.google.com/speed/docs/insights/v5/about),
[Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci).

## 6. Build, budget e regressioni

Se hai il sorgente, genera la build e applica gli script del toolkit. Guarda
quali categorie crescono e quali pagine superano il budget. Prima di aumentare
una soglia verifica dipendenze, font, immagini e contenuti incorporati.
Controlla poi sul sito pubblicato compressione, cache, redirect e 404:
la build locale non descrive la configurazione del server.

## 7. EcoIndex e stime ambientali

[EcoIndex](https://www.ecoindex.fr/en/how-it-works/) usa peso della pagina,
richieste e dimensione del DOM per costruire un indicatore. Conserva data,
URL e condizioni della rilevazione; usa gli input per orientare gli interventi.
Le stime di emissioni o consumo d'acqua dipendono da un modello. Non sono
misure dirette dell'energia del sito e non vanno ricavate dai soli byte della build.
Per esplorare modelli espliciti: [CO2.js](https://developers.thegreenwebfoundation.org/co2js/overview/).

## 8. Scegli e verifica un intervento

Privilegia modifiche che riducono costi inutili senza ostacolare l'uso: eliminare
uno script inutilizzato, ridimensionare un'immagine, usare font locali o di
sistema, rinviare un embed fino alla richiesta dell'utente. Cambia una cosa,
ripeti lo stesso percorso e registra risultato e compromessi nel modello di audit.
Non dichiarare risparmi energetici percentuali sulla sola base dei byte risparmiati.
