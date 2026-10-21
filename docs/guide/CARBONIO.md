# Energia, carbonio e modelli: scegliere il perimetro

[English](../en/guide/CARBON.md) | **Italiano**

## Tre domande differenti

1. Quante risorse prepara o trasferisce la pagina? Build e Network aiutano a rispondere.
2. Quale lavoro svolge il dispositivo nel percorso scelto? Trace e profili aiutano a osservarlo.
3. Quale impatto ambientale stimiamo entro confini dichiarati? Serve un modello con input, ipotesi e unità.

Non convertire automaticamente una riduzione di byte in una percentuale di
energia risparmiata. Nel progetto conserva separatamente osservazioni, parametri
e risultati stimati. Se una quantità non è stata misurata, dichiarala stimata
o assunta invece di completare la tabella con un numero apparentemente preciso.

## CO2.js

[CO2.js](https://developers.thegreenwebfoundation.org/co2js/overview/) fornisce
modelli per stimare emissioni da input dichiarati. Prima di usarlo scegli il
modello e la versione della libreria; documenta gli input e le impostazioni.
Nel tuo esperimento prova a variare un'ipotesi per capire quanto influenza
l'esito. Non confrontare risultati calcolati con versioni e parametri differenti
senza esplicitare il cambiamento.

Una scheda riproducibile del progetto dovrebbe contenere: attività, confini,
fonte dei byte o dell'energia, unità, cache, traffico considerato, eventuali
assunzioni sul mix elettrico e dati mancanti. Mantieni gli input grezzi insieme
al risultato. Non è necessario aggiungere una libreria di stima nel browser del
visitatore: un'analisi separata può bastare per la domanda del team.

## Firefox Profiler

[Firefox Profiler](https://profiler.firefox.com/) consente di registrare e
ispezionare attività del browser. L'[integrazione descritta da Green Web Foundation](https://www.thegreenwebfoundation.org/news/carbon-emissions-in-browser-devtools-firefox-profiler-and-co2-js/)
usa CO2.js per contribuire alle stime quando sono disponibili dati energetici.
La disponibilità dipende da piattaforma e hardware; l'assenza di un contatore
non è un consumo nullo.

Per il tuo test registra lo stesso percorso prima e dopo, mantieni dispositivo
e condizioni comparabili e annota processi concorrenti e durata. Guarda quali
attività persistono quando la pagina sembra ferma. Se esporti o condividi un
profilo, revisiona gli URL e i dati registrati. Non presentare il profilo di un
singolo dispositivo come impatto dell'intero servizio.

## Impact Framework

[Impact Framework](https://if.greensoftware.foundation/) organizza osservazioni,
trasformazioni e risultati in una pipeline ispezionabile. Usalo quando devi
rendere ripetibile un calcolo con più input. Parti dalla guida ufficiale e
conserva manifest, plugin/versioni e dati di ingresso.

Nel progetto affianca al manifest un dizionario delle unità e la provenienza
delle osservazioni. Controlla a ogni passaggio che una trasformazione non confonda
potenza ed energia o un valore per visita con un totale di periodo. Una pipeline
eseguibile rende la logica verificabile; non risolve da sola input inaffidabili.

## SCI e SCI for Web

Il progetto [SCI for Web](https://greensoftware.foundation/standards/sci-web/)
si presenta come estensione specifica per il web della specifica SCI ed è
indicato dalla GSF come progetto in bozza nella fonte consultata. Aiuta ad
approfondire confini e unità funzionale, includendo componenti oltre alla singola
pagina. Non è il nome di uno score già calcolato dal toolkit.

Per una valutazione del tuo servizio scegli prima l'attività di riferimento:
per esempio un acquisto completato, con i sistemi pertinenti. Spiega quali
componenti includi e quali escludi. Un numero per pagina non può sostituire
silenziosamente il risultato di quell'intera attività.

## Website Carbon ed altri report sintetici

[Website Carbon](https://www.websitecarbon.com/) è un riferimento da esplorare
per una stima della pagina. La documentazione del servizio non era consultabile
automaticamente durante questa revisione (HTTP 403): verifica il metodo corrente
prima di riportare numeri, parametri o confronti. Non assumere che sia equivalente
a EcoIndex o a una pipeline CO2.js configurata da te.

## Formazione e decisioni

Il corso [Green Software Practitioner in italiano](https://learn.greensoftware.foundation/it/)
è una traduzione della community; la pagina segnala possibili differenze rispetto
all'inglese. I [Green Software Patterns](https://patterns.greensoftware.foundation/personas/front-end-engineer/)
sono un catalogo da usare per scegliere un esperimento. GSF e Green Web Foundation
sono organizzazioni differenti, anche quando i loro materiali si collegano.

Per pubblicare i risultati usa [DICHIARAZIONE.md](../../templates/DICHIARAZIONE.md):
indica cosa hai cambiato, come l'hai verificato, cosa hai stimato e cosa resta
fuori dal perimetro. Evita espressioni assolute come «impatto zero» basate su un
singolo test o sulla verifica del provider.
