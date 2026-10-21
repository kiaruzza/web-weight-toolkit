# WSG: usare le linee guida nel progetto

[English](../en/guide/WSG.md) | **Italiano**

Le Web Sustainability Guidelines del W3C riguardano l'intero ciclo del prodotto:
esperienza d'uso, sviluppo, hosting e infrastruttura, strategia e gestione.
La versione consultata è la [W3C Group Note Draft del 16 ottobre 2026](https://www.w3.org/TR/2026/DNOTE-web-sustainability-guidelines-20261016/).
È una bozza, distinta da una W3C Recommendation. Per verificare gli aggiornamenti:
[ultima versione pubblicata](https://www.w3.org/TR/web-sustainability-guidelines/).

Questa guida propone un metodo di lavoro originale: non traduce tutti i criteri
e non attribuisce conformità WSG al template. Per ogni revisione apri la versione
fissata, scegli il criterio pertinente e registra il collegamento esatto. Le
identificazioni qui sotto sono interne al toolkit e non numeri ufficiali WSG.

## Collegamenti a linee guida ufficiali

Questi riferimenti appartengono alla versione fissata del 16 ottobre 2026.
La colonna a destra indica il materiale operativo del toolkit da affiancare
alla lettura; non sostituisce i criteri contenuti nella fonte.

| Riferimento WSG | Approfondimento operativo |
| --- | --- |
| [2.9 — Media](https://www.w3.org/TR/2026/DNOTE-web-sustainability-guidelines-20261016/#x2-9-optimize-media-to-reduce-resource-use) | [Varianti, qualità e caricamento](MEDIA-FONT.md) |
| [3.11 — JavaScript e API](https://www.w3.org/TR/2026/DNOTE-web-sustainability-guidelines-20261016/#x3-11-use-sustainable-javascript-and-apis) | [Decisione e fallback](PROGETTAZIONE.md) |
| [3.12 — Dipendenze](https://www.w3.org/TR/2026/DNOTE-web-sustainability-guidelines-20261016/#x3-12-use-dependencies-sparingly-and-maintain-them) | [Inventario e manutenzione](PROGETTAZIONE.md) |
| [4.1 — Hosting](https://www.w3.org/TR/2026/DNOTE-web-sustainability-guidelines-20261016/#x4-1-use-sustainable-hosting) | [Servizio ed evidenze](HOSTING.md) |
| [4.2 — Cache](https://www.w3.org/TR/2026/DNOTE-web-sustainability-guidelines-20261016/#x4-2-optimize-caching-and-support-offline-access) | [Header e visita successiva](HOSTING.md) |
| [4.3 — Compressione](https://www.w3.org/TR/2026/DNOTE-web-sustainability-guidelines-20261016/#x4-3-reduce-data-transfer-with-compression) | [Controlli sul deploy](HOSTING.md) |
| [5.13 — Necessità del prodotto](https://www.w3.org/TR/2026/DNOTE-web-sustainability-guidelines-20261016/#x5-13-evaluate-if-a-digital-product-or-service-is-necessary) | [Bisogno e percorso](METODO.md) |
| [5.18 — Dati](https://www.w3.org/TR/2026/DNOTE-web-sustainability-guidelines-20261016/#x5-18-promote-responsible-data-practices) | [Conservazione e ciclo di vita](PROGETTAZIONE.md) |

## Organizza una revisione con il team

Prima dell'incontro scegli una funzione reale, per esempio «trovare e leggere
un articolo». Invita chi pubblica i contenuti, chi progetta, chi sviluppa e chi
gestisce il servizio. Porta la baseline tecnica e i problemi d'uso. Evita di
ridurre la discussione al singolo punteggio della home.

Usa questa agenda di progetto per far emergere decisioni ed evidenze:

| ID interno | Domanda da portare al team | Esperimento proposto | Evidenza da conservare |
| --- | --- | --- | --- |
| P01 | Quale bisogno copre questa pagina? | Togliere un blocco che non sostiene l'attività | Percorso prima/dopo e motivazione editoriale |
| P02 | Il contenuto si trova senza tentativi ripetuti? | Riscrivere etichette e semplificare un passaggio | Test di reperibilità e note degli utenti |
| P03 | Può usarlo chi naviga da tastiera? | Completare il percorso senza mouse | Sequenza del focus e problemi aperti |
| P04 | Che cosa arriva prima di essere richiesto? | Rinviare un embed fino all'attivazione | Waterfall iniziale e dopo il click |
| P05 | Stiamo consegnando pixel inutili? | Confrontare due dimensioni della stessa immagine | File, schermate e variante selezionata |
| P06 | Questa interazione richiede uno script? | Prototipo con HTML nativo e fallback | ADR, prova senza JS e confronto dei costi |
| P07 | Che cosa succede alla seconda visita? | Ricaricare con cache e asset versionati | Header, risposta 304 o riuso locale |
| P08 | Chi risponde dei contenuti obsoleti? | Assegnare proprietario e scadenza alle pagine | Inventario editoriale e data di riesame |
| P09 | Le evidenze del fornitore coprono il servizio acquistato? | Confrontare contratto e documenti pubblici | Riferimenti datati e domande aperte |
| P10 | Un job automatico continua a essere utile? | Rivedere frequenza di build, scansioni e conservazione | Durate, frequenza, politica di retention |
| P11 | Stiamo raccogliendo dati che non useremo? | Rimuovere un evento o un log ridondante | Inventario e requisiti di conservazione |
| P12 | Possiamo spiegare pubblicamente il risultato? | Scrivere una dichiarazione con metodo e limiti | Pagina tecnica e prove collegate |

Questa è un'agenda selettiva, non l'inventario completo delle WSG. Apri il testo
ufficiale durante la revisione e aggiungi gli aspetti del tuo servizio che la
tabella non copre. Per un negozio online, per esempio, considera anche ricerca,
checkout, aggiornamenti di catalogo e sistemi collegati.

## Compila il registro

Nel [modello di revisione](../../templates/REVISIONE-WSG.md) riporta per ogni voce:
versione della fonte, titolo e URI del criterio, ambito, evidenza disponibile,
esito, azione, responsabile e scadenza. Usa esiti interni chiari:
`da valutare`, `evidenza raccolta`, `intervento aperto`, `non applicabile con motivazione`.
Questi esiti descrivono il lavoro del team; non sono livelli di conformità ufficiali.

Un esempio compilabile: P04, articolo con video incorporato. Prima del click il
player contatta altri domini. Ipotesi: sostituirlo con un'anteprima locale e
un link, oppure caricarlo su richiesta con comando accessibile. Conserva HAR,
prova da tastiera e confronto del percorso. Collega poi il criterio ufficiale
che il gruppo ha scelto e motiva la relazione, senza inventare un ID WSG.

## Collegamento al template

Il template fornisce un punto di partenza verificabile: contenuti statici,
font di sistema, nessuno script iniziale, metadati e controlli di build. Chi lo
adotta deve ancora motivare contenuti, media, fornitori, conservazione dei dati,
servizi esterni e manutenzione. Copiare il template non completa questa revisione.

WSG e WCAG hanno ambiti differenti. Per valutare l'accessibilità segui il
[percorso dedicato](ACCESSIBILITA.md) e conserva evidenze specifiche; un punteggio
ambientale non risolve un problema di accesso ai contenuti.
