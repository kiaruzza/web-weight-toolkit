# Accessibilità: una prova completa del percorso

[English](../en/guide/ACCESSIBILITY.md) | **Italiano**

Il template fornisce semantica e controlli iniziali. Il lavoro continua sui
contenuti e sulle interazioni aggiunti. Usa [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
come riferimento tecnico: conserva criteri pertinenti ed evidenze per pagina e
stato. Il toolkit non rilascia certificazioni né dichiarazioni legali.

## Preparare la prova

Scegli lettura, navigazione e azione principale. Elenca stati iniziali, errori,
risultati, finestre sovrapposte e contenuti espansi. Annota browser, tecnologia
assistiva, versione, viewport e preferenze del sistema. Un controllo della home
chiusa non copre il menu aperto o un form in errore.

## Controlli automatici e revisione del documento

Esegui axe sullo stato interessato. Per ogni violazione apri il nodo coinvolto,
comprendi la causa, correggi e ripeti. Esamina anche gli esiti che richiedono
valutazione umana. Un'alternativa testuale presente può essere inadeguata al
contenuto: la sola presenza non dimostra qualità.

Con [WAVE](https://wave.webaim.org/) esamina annotazioni e struttura nel contesto
della pagina; distingui errori e avvisi. Con [Nu HTML Checker](https://validator.w3.org/nu/)
o HTML Validate controlla il markup generato. Il [W3C WAI](https://www.w3.org/WAI/test-evaluate/tools/)
spiega perché strumenti ed esperienza umana vanno combinati.

## Protocollo manuale del toolkit

Questa sequenza è un piano di test del progetto, da integrare con i criteri
ufficiali pertinenti:

| Prova | Azione | Evidenza da registrare |
| --- | --- | --- |
| Titolo e struttura | Leggi titolo pagina, h1, sezioni e landmark | Etichette comprensibili e gerarchia coerente |
| Tastiera | Tab e Shift+Tab, poi Enter/Space dove previsti | Ordine, focus visibile, attivazione e nessuna trappola |
| Salto al contenuto | Dal primo Tab attiva il link | Arrivo sul contenuto e sequenza successiva |
| Controlli espansi | Apri details/menu/dialog e richiudi | Stato annunciato, comando accessibile, ritorno del focus |
| Form | Invia dati mancanti o errati, poi correggi | Etichette, istruzioni, errori e conferma identificabili |
| Screen reader | Naviga per titoli, landmark e link; completa l'azione | Nomi, ruoli, stati e ordine di lettura |
| Zoom e schermo stretto | Aumenta zoom e testo, prova la pagina stretta | Nessun testo perso o comando coperto |
| Temi e contrasto | Controlla testo, link, focus e controlli in ogni tema | Coppie cromatiche e stati testati |
| Movimento | Prova preferenze di movimento ridotto e animazioni | Contenuti utilizzabili e controlli di pausa pertinenti |
| Senza JavaScript | Ricarica e ripeti lettura e navigazione | Funzioni disponibili, alternative e messaggi necessari |

Per Orca, NVDA o VoiceOver, annota i comandi usati e ciò che viene annunciato; se non
hai esperienza coinvolgi una persona competente e, quando possibile, utenti
con disabilità. Non dichiarare superata una prova soltanto perché il browser
mostra correttamente la pagina.

## Orca su Linux

[Orca](https://help.gnome.org/orca/) è uno screen reader da includere nelle prove
su Linux. Configura voce, layout tastiera e modificatore secondo il
[manuale ufficiale](https://help.gnome.org/orca/); usa la modalità di apprendimento
per familiarizzare con i comandi della configurazione scelta.

Per la prova del tuo progetto:

1. Registra distribuzione, ambiente desktop, browser e relative versioni, versione di Orca e layout tastiera.
2. Apri la pagina e verifica titolo, lingua e ordine di lettura. Usa la navigazione strutturale per trovare titoli, sezioni e link.
3. Completa il percorso senza mouse, includendo il salto al contenuto e gli elementi espansi. Annota nomi, ruoli e stati annunciati.
4. Se presenti, prova form, errori, conferme e aggiornamenti dinamici: verifica che siano percepibili e che il focus resti comprensibile.
5. Ripeti dopo la correzione nelle stesse condizioni; conserva passi, annunci osservati e problemi ancora aperti.

Mantieni distinta la prova con Orca da quella con la sola tastiera: la seconda
non verifica gli annunci dello screen reader. Un esito riguarda la combinazione
di browser, desktop e tecnologia assistiva provata; non va esteso automaticamente
alle altre. Non serve installare Orca nel toolkit o aggiungere codice al sito
per documentare questo protocollo manuale.

## Criterio di chiusura di un problema

Descrivi comportamento atteso e osservato, passi di riproduzione, pagina/stato,
evidenza e criterio pertinente. Un problema si chiude ripetendo gli stessi passi
dopo la modifica, con esito documentato. «Lighthouse 100» da solo non chiude un
problema manuale.

Nel sito originale questi controlli coprivano anche temi, traduzioni e poesie.
Nell'estrazione restano il metodo e i test riutilizzabili; gli esiti personali
non vengono attribuiti a chi adotta il template.
