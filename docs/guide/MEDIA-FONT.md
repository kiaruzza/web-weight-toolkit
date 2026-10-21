# Immagini, video, audio e font

[English](../en/guide/MEDIA-FONTS.md) | **Italiano**

## Parti dall'inventario reale

Apri Network e associa ogni risorsa al contenuto che sostiene. Nel registro
segna URL, peso, pixel, dimensione visualizzata, caricamento iniziale o su
richiesta e valore per l'attività. Un'immagine decorativa enorme e un diagramma
necessario richiedono decisioni diverse. Conserva originali, diritto d'uso e
impostazioni di esportazione, così la prossima persona può rigenerare le varianti.

## Laboratorio Squoosh

1. Apri una copia dell'originale in [Squoosh](https://squoosh.app/).
2. Mantieni formato e pixel costanti mentre cerchi una qualità accettabile; poi prova un ridimensionamento e confronta separatamente.
3. Confronta dettagli significativi, bordi, gradienti e testo alla dimensione d'uso.
4. Esporta una variante e annota impostazioni, byte e difetti osservati.
5. Inseriscila nella pagina, verifica la scelta del browser e ripeti il percorso.

La procedura controllata evita di attribuire alla qualità una differenza
prodotta soprattutto dalla riduzione dei pixel. Non scegliere una qualità uguale
per tutte le immagini: loghi, fotografie e screenshot hanno vincoli differenti.

## Distribuzione responsive

Con Astro usa [Picture e immagini locali](https://docs.astro.build/en/guides/images/).
Il browser deve poter scegliere in base a layout e densità: widths da soli non
bastano se sizes dichiara una larghezza errata. Controlla `currentSrc` e Network
alle viewport previste, mantenendo dimensioni intrinseche che riservino spazio.

Per l'immagine principale visibile subito valuta eager e priorità appropriata;
per quelle lontane dal primo schermo prova lazy. Evita una regola «lazy su tutto».
Il progetto complementare Lighter Web Starter include un esempio di Picture;
per la sintassi corrente fai riferimento alla documentazione Astro collegata sopra.

## SVG e contenuti equivalenti

Per icone semplici preferisci il formato vettoriale quando è adeguato al disegno.
Rimuovi metadati e contenuto non necessario senza rompere viewBox, contrasto o
semantica. Un SVG decorativo non richiede la stessa descrizione di un grafico.
Per diagrammi complessi valuta una descrizione estesa o una tabella equivalente.

## Video, audio ed embed

Nel tuo esperimento confronta caricamento iniziale e attivazione esplicita.
Prepara poster leggero, dimensioni ragionevoli, controlli e alternative pertinenti
come sottotitoli o trascrizioni. Evita di scaricare un player esterno quando
basta un link al contenuto. Se scegli il caricamento su richiesta, il comando
deve funzionare da tastiera e spiegare quale servizio viene aperto.

Non moltiplicare varianti video senza un uso: considera qualità, durata e
risoluzione effettivamente necessarie. Anche un file mai scaricato continua a
richiedere gestione nel repository e nelle copie di backup.

## Font

Il template parte dai font di sistema. Se il progetto richiede un font dedicato,
verifica licenza, caratteri delle lingue realmente pubblicate e pesi necessari.
Valuta formati appropriati al supporto browser previsto, fallback e comportamento
durante il caricamento. Prima di fare un subset controlla accenti, simboli e
contenuti futuri: rimuovere glifi necessari crea regressioni.

Testa tre condizioni: prima visita lenta, risorsa in cache e font non disponibile.
Osserva leggibilità e spostamenti del layout. Non precaricare pesi che non servono
alla prima schermata e non convertire testo in immagini per imporre una tipografia.
