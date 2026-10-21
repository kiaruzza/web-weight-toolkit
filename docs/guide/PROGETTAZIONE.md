# Progettare contenuti e codice che chiedono meno risorse

[English](../en/guide/DESIGN.md) | **Italiano**

Questa guida generalizza le decisioni del sito originale: piattaforma nativa,
output statico, dipendenze motivate e progressive enhancement. Non ogni sito
può o deve essere identico al template; il punto è rendere visibile il costo
delle scelte rispetto al bisogno delle persone.

## Contenuti e percorsi

Per ogni pagina assegna un obiettivo, un proprietario e una data di riesame.
Rimuovi duplicazioni che obbligano a consultare pagine diverse per la stessa
informazione. Una pagina più breve non è automaticamente migliore: conserva
istruzioni, contatti, traduzioni e alternative necessarie.

Prima di aggiungere una ricerca, prova navigazione, titoli e collegamenti.
Se serve una ricerca, progetta anche risultati vuoti ed errori. Evita percorsi
che richiedono di aprire molti contenuti per trovare un dato semplice.

## Decidere sul JavaScript

Compila [DECISIONE-JAVASCRIPT.md](../../templates/DECISIONE-JAVASCRIPT.md).
Prova prima link, form, details/summary ed elementi HTML pertinenti; valuta CSS
per presentazione e preferenze. Se lo script risolve un bisogno reale, stabilisci
fallback, comportamento di focus, errori e costo di caricamento/esecuzione.

Nel sito originale un piccolo controller gestiva il tema. Nel template il tema
segue il sistema con CSS: è una scelta di estrazione, non una regola che vieta
un selettore manuale. Se lo aggiungi, misura byte e lavoro nel browser e prova
il sito con lo script non disponibile.

Con [Coverage](https://developer.chrome.com/docs/devtools/coverage/) registra
il percorso prima di decidere cosa rimuovere; prova gli stati che potrebbero
usare quel codice. Per capire il costo durante un'interazione usa una trace,
non solo la dimensione del bundle.

## Statico, server e cache

Se il contenuto cambia solo quando pubblica chi lo gestisce, la generazione
statica può evitare lavoro a ogni richiesta. Se serve contenuto personalizzato,
ricerca o scrittura di dati, progetta il componente dinamico entro il suo ambito.
Considera anche invalidazione della cache e gestione degli errori.

Non spostare il costo su build sempre più frequenti senza misurarlo: conserva
durata, frequenza, cache e condizioni che avviano i job. Non tutte le modifiche
editoriali richiedono scansioni esterne di tutto il sito.

## Dipendenze e servizi esterni

Per ogni nuova dipendenza annota funzione, alternativa, licenza, manutenzione,
transitive e luogo di esecuzione. Uno strumento usato durante la build non è
automaticamente codice inviato al browser. Per un widget esterno osserva anche
richieste, consenso, disponibilità, privacy e fallback.

Scegli un aggiornamento deliberato, conserva il lockfile ed esegui controlli
pertinenti. Non usare correzioni forzate che cambiano versioni incompatibili
senza esaminare gli effetti. Tieni distinti problemi degli strumenti di sviluppo
e codice esposto ai visitatori, senza ignorare nessuno dei due.

## Fine del ciclo di vita

Definisci cosa archiviare, cosa cancellare e come gestire URL pubblici spostati.
Rivedi originali media duplicati, vecchie build, backup, log e report automatici.
I limiti di conservazione devono rispettare le necessità operative e i requisiti
del servizio. Conserva le evidenze utili senza mantenere ogni artefatto per sempre.

Collega le decisioni alla [revisione WSG](WSG.md) e al registro degli interventi:
anche una scelta editoriale o organizzativa può essere il prossimo esperimento.
