# Glossario operativo

[English](en/GLOSSARY.md) | **Italiano**

| Termine | Significato nel toolkit |
| --- | --- |
| B, kB, KiB | Byte; 1 kB = 1000 B, 1 KiB = 1024 B. Non cambiare unità senza dirlo |
| Byte grezzi | Dimensioni dei file della build, non traffico osservato |
| Trasferiti | Quantità riferita dalla misura di rete, con confini specificati dal tool |
| Dimensione decodificata | Contenuto dopo la decompressione; può essere maggiore dei trasferiti |
| gzip / Brotli stimati | Compressione locale dei file, non prova della configurazione dell'hosting |
| Risorsa locale | File risolto dentro la build secondo le regole dell'analizzatore |
| Altra origine | Schema, host o porta diversi dalla pagina finale; non implica tracker |
| Cache fredda / calda | Risorse non riutilizzate / riutilizzabili da una visita precedente; documentare anche CDN e service worker |
| DOM | Struttura del documento costruita dal browser; numero di nodi diverso dal peso dell'HTML |
| LCP | Metrica sull'arrivo del contenuto principale nel viewport |
| CLS | Metrica degli spostamenti inattesi del layout |
| INP | Metrica di reattività alle interazioni, distinta da TBT |
| TBT | Metrica di blocco del thread nel test di laboratorio |
| Dati sul campo | Esperienze reali aggregate, con finestra e campione propri |
| Laboratorio | Esecuzione con scenario e condizioni impostati |
| W, Wh, kWh | Potenza, energia, energia; non sono unità intercambiabili |
| gCO2e | Grammi di emissioni equivalenti; serve indicare modello, confini e unità funzionale |
| Indicatore | Sintesi utile alla diagnosi entro una metodologia |
| Baseline | Punto di partenza registrato per il confronto |
| Budget | Soglia deliberata che un controllo può far rispettare |
| Progressive enhancement | Funzionalità di base disponibile, con miglioramenti quando supportati |
| WSG / WCAG | Linee guida per sostenibilità del web / accessibilità dei contenuti; ambiti distinti |

Per le metriche browser usa le definizioni e la documentazione collegate nella
[guida performance](guide/PERFORMANCE.md), senza dedurre equivalenze tra score.
