# 📚 Manuale del Web Weight Toolkit

[English](en/README.md) | **Italiano**

Un audit utile parte da una domanda: quale attività deve riuscire a svolgere la
persona, e quante risorse le chiediamo per farlo? Le misure tecniche aiutano a
rispondere; contenuti, accessibilità, infrastruttura e manutenzione completano il quadro.

## 🧭 Percorsi di lettura

| Situazione | Percorso | Risultato da produrre |
| --- | --- | --- |
| Primo audit su un sito pubblico | [Metodo](guide/METODO.md) → [Performance](guide/PERFORMANCE.md) → [EcoIndex](guide/ECOINDEX.md) | Baseline e tre interventi motivati |
| Revisione di un progetto | [WSG](guide/WSG.md) → [Progettazione](guide/PROGETTAZIONE.md) → [Accessibilità](guide/ACCESSIBILITA.md) | Registro delle decisioni e prove manuali |
| Pagina ricca di immagini e video | [Media e font](guide/MEDIA-FONT.md) → Network | Varianti e caricamento verificati |
| Scelta o revisione dell'hosting | [Hosting e carbon.txt](guide/HOSTING.md) | Evidenze sul servizio e controlli HTTP |
| Richiesta di una stima ambientale | [Modelli e carbonio](guide/CARBONIO.md) | Metodo, confini e ipotesi espliciti |
| Controlli a ogni modifica | [Automazione](guide/AUTOMAZIONE.md) | Budget, baseline e report ripetibili |

Il [catalogo degli strumenti](STRUMENTI.md) collega ogni strumento a una domanda,
a un risultato e alla guida pertinente. La [guida introduttiva](GUIDA.md) resta
un percorso breve. Il [glossario](GLOSSARIO.md) chiarisce le unità e le metriche.

## 📝 Materiali da compilare

- [Scheda di audit](../templates/AUDIT.md): condizioni e risultati prima/dopo.
- [Revisione WSG](../templates/REVISIONE-WSG.md): ambito, criterio ufficiale, evidenza, responsabile.
- [Registro degli interventi CSV](../templates/INTERVENTI.csv) / [English CSV](../templates/en/IMPROVEMENTS.csv): backlog importabile in un foglio di calcolo.
- [Scheda EcoIndex](../templates/ECOINDEX.md): input osservati e stime separati.
- [Decisione sul JavaScript](../templates/DECISIONE-JAVASCRIPT.md): bisogno, alternativa nativa e costi.
- [Dichiarazione tecnica](../templates/DICHIARAZIONE.md): rendere pubblici scelte e limiti.
- [Checklist estesa](CHECKLIST.md): riesame prima del rilascio e dopo il deploy.

## Provenienza e aggiornamenti

Il metodo riprende layout, budget, script, decisioni architetturali e prove
manuali del sito di Chiara Corrado, insieme alle dimostrazioni del talk
«Il peso invisibile». Le guide sono disponibili in italiano e inglese; i riferimenti ufficiali
possono avere lingue e traduzioni proprie. Non costituiscono una traduzione ufficiale di WSG o WCAG.

Riferimenti verificati il **21 ottobre 2026**. Per WSG è fissata la bozza del
16 ottobre 2026; i servizi online e le loro interfacce possono cambiare.
[Fonti e manutenzione](FONTI.md) elenca versioni e riferimenti da riesaminare.

## Lingue e navigazione

Ogni guida e modello ha un collegamento alla versione inglese equivalente.
Il README principale del repository è in inglese, `README.it.md` in italiano.
La corrispondenza dei documenti è registrata in `translations.json`: quando
cambi una procedura, aggiorna entrambe le lingue nello stesso intervento.
Le icone degli indici affiancano etichette testuali, senza sostituirle.
Gli script e le chiavi dei report usano l'inglese in entrambe le edizioni.
