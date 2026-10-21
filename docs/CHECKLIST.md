# ✅ Checklist per un audit

[English](en/CHECKLIST.md) | **Italiano**

## Prima

- [ ] Definire pagine, percorso utente e criterio di successo.
- [ ] Registrare versione pubblicata e condizioni ripetibili.
- [ ] Conservare tre prove, dati grezzi e mediana.
- [ ] Escludere risposte di errore, blocchi e contenuti non confrontabili.

## Analisi

- [ ] Network: byte trasferiti, risorse, richieste, domini e waterfall.
- [ ] Immagini: pixel utili, qualità, formati e caricamento.
- [ ] CSS, JS e font: individuare dipendenze superflue.
- [ ] Senza JS: contenuti e navigazione disponibili.
- [ ] Tastiera: focus, salto al contenuto, comandi e assenza di trappole.
- [ ] Screen reader, zoom, tema chiaro/scuro e viewport stretta.
- [ ] Lighthouse/axe: valutare le violazioni, non solo il voto.
- [ ] Hosting: HTTPS, compressione, cache, redirect e status 404.

## Dopo

- [ ] Descrivere modifica, beneficio atteso e possibili compromessi.
- [ ] Ripetere misure e percorso utente nelle stesse condizioni.
- [ ] Confrontare dati di rete separatamente da dimensioni della build.
- [ ] Confermare che accessibilità e funzionalità non peggiorino.
- [ ] Aggiornare budget e baseline solo con motivazione revisionata.
- [ ] Datare eventuali stime ambientali e specificare il modello usato.

## Revisione di prodotto e WSG

- [ ] Fissare la versione WSG e collegare i criteri pertinenti nel registro.
- [ ] Documentare bisogno della pagina, percorso e alternative più semplici.
- [ ] Assegnare proprietario e data di riesame ai contenuti.
- [ ] Motivare nuovi script, dipendenze e servizi esterni.
- [ ] Valutare frequenza e conservazione di build, report, log e backup.

## Hosting ed evidenze ambientali

- [ ] Verificare dominio e servizio nel Green Web Check e nei documenti del provider.
- [ ] Conservare data e ambito delle dichiarazioni: niente deduzioni di impatto zero.
- [ ] Se presente, validare carbon.txt e rivedere i documenti collegati.
- [ ] Per EcoIndex conservare URL, versione, data, input e stime separati.
- [ ] Per CO2.js/IF conservare modello, versione, manifest, input e unità funzionale.
- [ ] Pubblicare soltanto risultati revisionati, con limiti e problemi aperti.
