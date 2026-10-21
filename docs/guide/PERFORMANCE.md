# Performance: caricamento, interazione e condizioni reali

[English](../en/guide/PERFORMANCE.md) | **Italiano**

## Network: il primo inventario

Apri [Network](https://developer.chrome.com/docs/devtools/network/reference/),
lascia DevTools aperto, disabilita la cache e ricarica. Salva URL, orario,
profilo rete, richieste e quantità trasferita. La dimensione del file decodificato
può differire dai byte passati sulla rete. Ripeti separatamente con cache attiva.

Per il tuo audit costruisci un inventario: documento, CSS, script, immagini,
font, media e servizi esterni. Per ogni risorsa grande annota chi la avvia e
quando è necessaria. Esamina anche richieste fallite o ripetute: nasconderle dal
totale rende il report meno utile. Conserva un HAR solo dopo averne revisionato
e rimosso dati personali, cookie e token.

## Lighthouse: diagnostica di laboratorio

Esegui tre prove della build di produzione con lo stesso profilo, senza estensioni
che alterino il sito. Conserva report e versione. Parti dal problema dell'utente:
contenuto principale in ritardo, layout che si sposta o interazione bloccata.
Il [report Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)
è un punto di partenza per trovare la causa, non un obiettivo da inseguire isolatamente.

Proposta di esperimento: se l'immagine principale arriva tardi, verifica dimensione,
scoperta nell'HTML, priorità e tempi di risposta. Cambia una causa, ripeti le prove
e confronta anche le schermate. Non precaricare tutte le immagini per tentare
di alzare il voto: potresti competere con la risorsa importante.

## PageSpeed Insights e dati sul campo

[PageSpeed Insights](https://developers.google.com/speed/docs/insights/v5/about)
può mostrare sia Lighthouse sia dati CrUX di esperienze reali. I dati sul campo
coprono una finestra temporale e potrebbero riguardare l'origine quando non è
disponibile il dettaglio dell'URL. Annota quale ambito viene mostrato. L'assenza
di dati sul campo non prova un problema e non equivale a un risultato eccellente.

LCP descrive l'arrivo del contenuto principale, CLS la stabilità del layout,
INP la reattività delle interazioni. TBT aiuta nella diagnosi di laboratorio,
ma non è una misura equivalente a INP. Non aspettarti che un deploy appena
eseguito cambi immediatamente un aggregato sul campo.

## Performance e Coverage: osservare un percorso

Con [Performance](https://developer.chrome.com/docs/devtools/performance),
registra un'azione concreta: aprire il menu, filtrare una lista, inviare un form.
Annota inizio e fine dell'azione; cerca script lunghi, layout e rendering nella
trace. Ripeti senza modificare il percorso. Una pagina piccola può comunque
eseguire lavoro continuo e rallentare l'interazione.

Apri [Coverage](https://developer.chrome.com/docs/devtools/coverage/) e visita
gli stati pertinenti prima di valutare il codice apparentemente inutilizzato.
Nel tuo esperimento prova anche mobile, tema e stampa. Un ramo non eseguito
nel primo caricamento potrebbe servire a uno stato successivo.

## WebPageTest

Quando serve un'altra località o un confronto visivo ripetibile, usa
[WebPageTest](https://www.webpagetest.org/). Scegli località, browser e connessione
tra quelli disponibili, ripetizioni e prima visita/visita ripetuta. Annota gli
identificativi dei test. Esamina waterfall e sequenza visiva: quale risorsa
separa la pagina vuota dal contenuto leggibile? Esporta l'evidenza disponibile.
Accesso e opzioni del servizio possono cambiare; non sono prerequisiti degli
script locali del toolkit.

## Come presentare il confronto

Mantieni una tabella per pagina e per scenario. Riporta singole prove, mediana,
minimo/massimo e cause di esclusione. Non mediare home mobile, articolo desktop
e visita con cache in un unico valore «del sito».

| Problema | Ipotesi | Evidenza dopo la modifica |
| --- | --- | --- |
| Contenuto appare tardi | Immagine scoperta solo dopo JS | Waterfall e sequenza visiva |
| Pagina si sposta | Spazio delle immagini non riservato | Layout e trace CLS |
| Form risponde tardi | Script occupa il thread durante l'azione | Trace dell'interazione |
| Visite ripetute riscaricano asset | Cache o URL instabili | Header e seconda visita |

Per automatizzare una finestra di caricamento con richieste grezze usa
[measure-network](AUTOMAZIONE.md). Non sostituisce i test delle interazioni.
