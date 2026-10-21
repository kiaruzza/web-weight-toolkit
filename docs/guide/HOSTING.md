# Hosting, HTTP e carbon.txt

[English](../en/guide/HOSTING.md) | **Italiano**

## Separare prestazioni e dichiarazioni del fornitore

Un hosting può servire bene una pagina pesante; una pagina leggera può essere
penalizzata da redirect, compressione assente o cache sbagliata. Verifica quindi
sia il comportamento HTTP sia le evidenze sul servizio acquistato.

Per [Green Web Check](https://www.thegreenwebfoundation.org/support/how-does-the-green-web-check-work/)
l'esito dipende dall'associazione del dominio a informazioni presenti nel dataset
dei provider verificati. Un esito positivo riguarda quella verifica, non il
codice del sito; uno negativo può dipendere da informazioni mancanti. Conserva
dominio, data ed evidenza, senza trasformarli in una dichiarazione di emissioni zero.

## Valutare il servizio

Nel tuo confronto tra fornitori raccogli: servizio e località effettivi,
documenti ambientali pubblici e loro periodo, gestione di backup e retention,
funzioni di cache/compressione, supporto a HTTPS, accesso ai log e possibilità di
esportare i contenuti. Chiedi se le evidenze coprono il piano specifico, non solo
una parte dell'organizzazione. Una sede europea o una CDN vicina non provano da
sole la prestazione ambientale complessiva.

La [Green Web Directory](https://www.thegreenwebfoundation.org/tools/directory/)
è un punto di partenza per cercare provider; completa la ricerca con documenti,
vincoli di progetto, resilienza e necessità delle persone.

## Controllare il deploy con curl

Sostituisci dominio e percorsi. Usa richieste GET per controllare la risposta
che interessa davvero; HEAD potrebbe seguire un comportamento diverso.

```sh
curl -sS -D - -o /dev/null -H 'Accept-Encoding: br, gzip' https://tuo-dominio.it/
curl -sS -L -D - -o /dev/null https://tuo-dominio.it/
curl -sS -D - -o /dev/null -H 'Accept-Encoding: br, gzip' https://tuo-dominio.it/assets/stile.VERSIONE.css
curl -sS -D - -o /dev/null https://tuo-dominio.it/percorso-che-non-esiste/
```

Controlla status e catena dei redirect, Content-Type, Content-Encoding,
Cache-Control e Vary quando pertinente. Un asset con nome versionato può avere
una cache lunga; l'HTML richiede una strategia che permetta di pubblicare
aggiornamenti. Non applicare `immutable` a file che cambiano mantenendo lo stesso URL.
Verifica la cache anche nel browser, distinguendo cache locale e cache condivisa.
Riferimento: [HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching).

Nel percorso inesistente cerca un vero HTTP 404 e una pagina utile. Una home
restituita con stato 200 per qualsiasi URL rende opaca la diagnosi. Verifica
anche i redirect verso il dominio canonico e l'assenza di passaggi superflui.

## Pubblicare carbon.txt

[carbon.txt](https://carbontxt.org/) collega informazioni su fornitori e
sostenibilità in un formato leggibile da strumenti automatici. Per iniziare usa
[builder e validator ufficiali](https://carbontxt.org/tools): raccogli le evidenze,
compila i campi richiesti dalla sintassi corrente, pubblica il file e verifica
la risoluzione con il validator.

Non copiare il provider del sito originale nel tuo progetto. Prima devi sapere
chi eroga il tuo servizio e quali documenti puoi collegare. Il template non
pubblica un carbon.txt con dichiarazioni inventate.

Per il registro conserva URL del file, risultato di validazione, riferimenti
ai documenti e data di riesame. Un file sintatticamente valido rende la
comunicazione ispezionabile; non certifica automaticamente le affermazioni.

## Dopo il rilascio

Ripeti Network sul dominio pubblico, verifica che non vengano caricati servizi
inattesi, controlla cache e 404 e aggiorna le evidenze del fornitore quando cambia
piano o infrastruttura. Riduci frequenza e conservazione dei log solo dopo aver
considerato le esigenze operative e i requisiti applicabili al tuo servizio.
