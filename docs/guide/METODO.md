# Metodo: dall'obiettivo alla verifica

[English](../en/guide/METHOD.md) | **Italiano**

## Scegli un'attività e pagine rappresentative

«Alleggerire il sito» non identifica ancora un test. Esempi: leggere un articolo,
trovare un contatto, completare un'iscrizione. Per ognuno scegli pagina iniziale,
passaggi necessari e condizione di completamento. Includi un dispositivo modesto,
una rete meno favorevole e le modalità di accesso pertinenti al pubblico.

Se il sito ha centinaia di URL, campiona i tipi di pagina e gli stati distinti:
non basta scegliere la home più semplice. Con login, consenso, ricerca o menu
aperti registra anche quegli stati. Se confronti due architetture, mantieni
contenuti e attività equivalenti; pagine diverse non isolano l'effetto della tecnologia.

## Costruisci una baseline

Compila [AUDIT.md](../../templates/AUDIT.md) prima di modificare il codice.
Registra URL iniziale e finale, commit/release, data UTC, versione browser,
viewport, sistema, profilo rete/CPU, cache, località del test, consenso e interazioni.
Fissa anche quando termina l'osservazione: evento, intervallo o completamento dell'attività.

Esegui almeno tre ripetizioni confrontabili. Conserva ogni risultato, riporta
mediana e intervallo minimo/massimo; se una prova fallisce, indica il motivo.
Non considerare valida una risposta HTTP 403, una challenge, una pagina vuota o
un articolo coperto da un blocco quando volevi misurare il contenuto completo.

## Raccogli quattro tipi di evidenza

| Livello | Esempio | Che cosa permette di dire |
| --- | --- | --- |
| Artefatto generato | HTML, CSS, immagini nel dist | Quali file prepara la build |
| Osservazione browser | Network, trace, stato del DOM | Che cosa avviene in quelle condizioni |
| Esperienza d'uso | Tastiera, screen reader, percorso completato | Se le persone possono svolgere l'attività |
| Modello o dichiarazione | EcoIndex, CO2.js, documenti del provider | Indicatore o stima entro un perimetro dichiarato |

Conserva questi livelli separati: una build piccola non prova una buona cache;
un report con classe A non prova che il form sia usabile; un provider presente
in un dataset non azzera i costi di dispositivo e rete.

## Trasforma le osservazioni in interventi

Per ogni problema annota pagina/stato, evidenza, impatto sulle persone, risorsa
coinvolta, ipotesi di causa, modifica proposta e controllo che ne dimostrerà
l'effetto. Usa [INTERVENTI.csv](../../templates/INTERVENTI.csv).

Dai precedenza agli impedimenti all'uso e alle risorse caricate senza necessità.
Valuta insieme diffusione del problema, beneficio atteso, lavoro e rischio.
Un'immagine caricata in ogni visita può meritare attenzione prima di un asset
più grande accessibile solo su richiesta. Non moltiplicare grammi per visite
senza verificare che modello e unità funzionale permettano quel calcolo.

## Ripeti e rendi il risultato revisionabile

Modifica una causa per volta quando vuoi attribuire un effetto. Ripeti gli
stessi test sulla stessa pagina e completa il percorso utente. Registra anche
regressioni e risultati nulli. Se cambiano rete, contenuto o versione del tool,
crea una nuova serie e non presentarla come confronto controllato.

Consegna baseline, report dopo, decisione, compromessi, problemi aperti,
responsabile e data del prossimo riesame. Per una pagina pubblica che racconta
il lavoro usa [DICHIARAZIONE.md](../../templates/DICHIARAZIONE.md).
