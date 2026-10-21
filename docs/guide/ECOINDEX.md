# EcoIndex, Ecograder e lettura dei risultati

[English](../en/guide/ECOINDEX.md) | **Italiano**

## Quale domanda affronta EcoIndex

[EcoIndex](https://www.ecoindex.fr/en/how-it-works/) costruisce un indicatore
usando peso trasferito, richieste e complessità del DOM. Il report può includere
score, classe e valori ambientali stimati. I primi dati servono a localizzare
un costo tecnico; i valori ambientali appartengono al modello, non a una misura
diretta di energia, emissioni o acqua del tuo dispositivo.

## Eseguire e documentare un'analisi

1. Scegli l'URL pubblico esatto. Se hai appena pubblicato, verifica che il contenuto corretto sia raggiungibile e non richieda login.
2. Apri EcoIndex, avvia l'analisi dall'interfaccia e attendi il risultato. Annotane data, URL, identificativo e versione del motore quando disponibili.
3. Controlla che risultato e screenshot corrispondano alla pagina attesa. Consenso, blocchi o redirect possono cambiare ciò che viene osservato.
4. Registra separatamente dimensione, richieste e nodi DOM. Nel modello incluso mantieni le unità del servizio.
5. Leggi le raccomandazioni, scegli una causa da verificare nel browser e apri un intervento.
6. Dopo la modifica esegui una nuova rilevazione confrontabile. Conserva il risultato precedente e le differenze di contenuto o condizioni.

La [metodologia ufficiale](https://www.ecoindex.fr/en/how-it-works/) è il
riferimento per interpretare il calcolo. Non ricostruire lo score con soglie
inventate e non trattare classe e punteggio come indicatori universali.

## Importare un risultato già disponibile

Lo script deriva da `update-ecoindex-snapshot.mjs` del sito originale, generalizzato
per richiedere l'URL atteso e scrivere in una cartella di report. Recupera un
risultato esistente dall'API, senza richiedere una nuova scansione:

```sh
npm run metrics:ecoindex -- ID_DEL_RISULTATO https://tuo-dominio.it/pagina/ reports/ecoindex-prima
```

`ID_DEL_RISULTATO` va sostituito con l'UUID reale della rilevazione, non con il
nome della pagina. Lo script controlla URL completo, data, valori numerici e
classe. Conserva risposta grezza, snapshot normalizzato, origine e data di importazione.
Lo snapshot mantiene `size` nell'unità dichiarata dall'API (KB) senza convertirla
implicitamente in byte. Le emissioni sono etichettate `gCO2e`, l'acqua `cl`.
La versione del motore viene conservata se presente; non è dedotta dall'URL API.

L'endpoint delle buone pratiche può rispondere 204 se quei dati non sono stati
raccolti: lo snapshot riporta `null`, senza sostituirli con zeri o inventare esiti.
Un risultato 404 o relativo a un URL diverso interrompe l'importazione.
La corrispondenza è intenzionalmente stretta: se il report riguarda l'apice del
dominio, fornisci quell'URL e annota separatamente il redirect verso `www`.

Le risposte importate finiscono in report ignorati da Git. Per pubblicarle,
copia solo un risultato revisionato in una cartella versionata dedicata e
accompagnalo con [ECOINDEX.md](../../templates/ECOINDEX.md). Non avviare una nuova
scansione esterna a ogni commit: conserva una rilevazione e aggiornala quando
serve verificare un cambiamento significativo.

Riferimenti tecnici: [API](https://api.ecoindex.fr/docs),
[schema OpenAPI](https://api.ecoindex.fr/openapi.json).

## Passare dal report a una modifica

Usa questa tabella come traccia di diagnosi, non come formula del servizio:

| Osservazione | Verifica nel tuo progetto | Intervento da sperimentare |
| --- | --- | --- |
| Immagini dominanti in Network | Quali varianti scarica quella viewport? | Ridimensionare, correggere sizes o caricare su richiesta |
| Molti script avviati subito | Quale attività richiede ciascuno script? | Eliminare codice inutilizzato o rinviare integrazioni |
| Struttura HTML molto ripetitiva | I wrapper o contenuti duplicati hanno una funzione? | Semplificare markup preservando semantica e navigazione |
| Richieste esterne non previste | Quale elemento o servizio le avvia? | Rimuovere o rendere esplicita l'attivazione |
| Risultati incoerenti tra prove | Stessa pagina, versione e condizioni? | Ripetere una serie controllata e spiegare le esclusioni |

La riuscita dell'intervento va provata anche sul percorso utente. Un DOM più
corto che elimina etichette o contenuti utili non è un buon esito.

## Ecograder

[Ecograder](https://ecograder.com/) offre un'altra lettura con raccomandazioni.
Il servizio consultato il 21 ottobre 2026 presenta una beta e un collegamento
alla versione legacy: annota quale hai usato. Esegui l'analisi dell'URL scelto,
conserva il report e verifica una raccomandazione alla volta nel tuo ambiente.

Per esempio, un avviso sulla compressione va controllato con una risposta GET
della risorsa indicata; un avviso su CSS bloccante va confrontato con il reale
ritardo osservato. Non cambiare architettura solo per eliminare un avviso privo
di effetto dimostrato. I punteggi di Ecograder ed EcoIndex non sono intercambiabili.
