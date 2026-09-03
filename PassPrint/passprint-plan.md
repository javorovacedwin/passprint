---
title: "PassPrint — Strategisch plan, merkrichting en websitearchitectuur"
subtitle: "Fase 1: strategie, concept en architectuur. Nog geen productiecode."
date: "23 juli 2026"
---

**Over dit document.** Dit is een werkdocument, geen pitch. Ik ben op een aantal punten expliciet oneens met de briefing — dat staat er ook zo in. Alles wat ik niet zeker weet, is gelabeld als **Aanname**. Cijfers over druk, porto en marge zijn ranges, geen prijzen: die moet je met echte offertes vervangen voor je iets vastlegt.

---

# 1. Samenvatting van PassPrint in mijn eigen woorden

PassPrint is een maandelijkse kunstuitgave in een envelop. Elke maand krijgt een lid één grotere en één kleinere print van hetzelfde onderwerp — een plaats, een gebouw, een landschap, een gewoonte — plus een apart kaartje met het verhaal erachter, wie het gemaakt heeft en waarom. De prints zijn genummerd met de hand, de oplage is beperkt, en de envelop zelf is ontworpen: kleur, stempel, materiaal.

Twaalf maanden vormen samen een collectie rond één regio. De eerste is de Balkan. Wie de reeks volledig heeft, kan die achteraf als geheel bewaren of alsnog kopen in een collector's editie.

De metafoor is een paspoort: je verzamelt plaatsen in plaats van producten. Je krijgt niet "twee prints", je krijgt post uit Mostar.

Wat het in de kern verkoopt is niet decoratie en niet informatie, maar **een klein maandelijks moment**: iets fysieks dat aankomt, dat je openmaakt, dat vijf minuten van je aandacht vraagt en dat je daarna niet weggooit. De prints zijn het bewijsstuk van dat moment.

Dat is een sterk product. Het is ook een operationeel bedrijf met logistiek, marges en deadlines, en dat is het deel dat de meeste projecten van dit type doodt — niet het design.

# 2. Kritische beoordeling van het concept

## Wat er klopt

**De metafoor is echt, niet opgeplakt.** "Passport + print" werkt omdat het product letterlijk per post reist, letterlijk uit een andere plaats komt en letterlijk gestempeld kan worden. Bij de meeste merken is de metafoor decoratie. Hier is ze het productieproces.

**De verzamellogica is ingebouwd.** Nummering, oplage, twaalf maanden, een complete set — dat zijn geen marketingtrucs, dat zijn eigenschappen van het product. Verzamelaars maken je retentie voor je: wie maand 7 heeft, wil maand 8 om een andere reden dan "het is mooi".

**Het formaat past bij het budget.** Papier is goedkoop, klein, plat en vergevingsgezind. Je kunt hiermee starten met enkele honderden euro's aan drukwerk. Dat is bij zo goed als geen ander fysiek verzamelproduct zo.

**De eerste collectie heeft een echt publiek.** De Balkan-diaspora in België, Nederland, Duitsland, Oostenrijk, Zwitserland en Zweden is groot, emotioneel verbonden met de regio en koopt cadeaus binnen die verbondenheid. Dat is geen "doelgroepsegment", dat zijn mensen die iets zoeken dat nog niet bestaat.

## Waar ik het niet mee eens ben

**Je briefing gaat voor negentig procent over de website. Dat is het verkeerde eerste probleem.** De website beslist niet of PassPrint werkt. Drie dingen beslissen dat: wie de kunst maakt, wat één envelop kost om te maken en te versturen, en of mensen na maand drie blijven. Een perfecte site voor een product dat je nog niet kunt produceren is duur en traag. Een eenvoudige, mooie site voor een product dat klopt, verkoopt.

**Het grootste risico staat nauwelijks in je brief: de kunst.** Eén collectie is 24 werken (12 grote, 12 kleine) plus 12 verhalen, allemaal op consistent niveau, allemaal op tijd. Dat is de zwaarste verplichting in het hele plan. Wie maakt die? Als het antwoord "één kunstenaar" is, heb je één punt van falen, en na maand vijf stijlmoeheid. Als het antwoord "twaalf kunstenaars" is, heb je twaalf keer curatie, onderhandeling, contract, briefing en levering — als één iemand in maand negen afhaakt, heb je drie weken om het op te lossen. Dit moet opgelost zijn vóór je één ding ontwerpt aan de site. Mijn aanbeveling staat in §15.

**De maandelijkse formule is commercieel de zwakste.** Maandabonnementen op niet-noodzakelijke, esthetische producten hebben brutale churn: een groot deel valt weg in maand twee tot vier, precies wanneer het nieuwe eraf is en de kaartlast blijft. Verkoop daarom vooral **vooruitbetaalde reeksen van 6 en 12 maanden**, niet maandelijkse verlenging. Dat is meteen ook je cashflow: je hebt geld vóór je drukt. Dit is de belangrijkste commerciële beslissing in het hele document.

**Stemmen op de volgende regio is leuk en gevaarlijk.** Als mensen "Japan" kiezen en jij hebt geen kunstenaar, geen bronnen en geen affiniteit met Japan, heb je jezelf een jaar slecht werk in gestemd. Laat mensen stemmen, maar alleen tussen drie regio's die jij al kunt maken. Presenteer het als een keuze, niet als een open vraag.

**Het digitale paspoort is v2, niet MVP.** Het lost geen enkel aankoopbezwaar op. Niemand abonneert zich omdat er een profielpagina is. Het is een retentie- en cadeau-instrument dat pas betekenis krijgt als er iets te tonen valt, en dat is er na maand vier. Bouw het dan.

**De 3D-wereldbol is precies het risico dat je zegt te willen vermijden.** Een draaiende globe met oplichtende landen op de homepage is in 2026 een van de meest herkenbare AI-/startupsignalen die er zijn. Mijn advies staat in §12 en het is: geen WebGL-globe in versie 1. Er is een betere, eigenzinnigere oplossing, en die is ook nog sneller.

**Er zit een structureel spanningsveld in het collectiemodel** dat je brief niet benoemt. Je eerste publiek komt binnen voor de Balkan. Als collectie twee Scandinavië is, verlies je een groot deel van dat publiek — hun band was met de regio, niet met jou. Je moet ofwel merkloyaliteit opbouwen die de regio overstijgt (moeilijk, duurt jaren), ofwel oude collecties permanent verkoopbaar houden en later meerdere routes tegelijk laten lopen. Ik reken hierop in §15 en §21.

**Culturele gevoeligheid is bij deze specifieke regio geen bijzin.** Kosovo, Republika Srpska, Novi Pazar, de brug van Mostar, Ottomaanse erfenis, kerken en moskeeën in betwiste steden: dit zijn onderwerpen waar mensen echte gevoelens en echte politieke posities bij hebben. Eén slordige kaart met grenzen, één landenlijst in de verkeerde volgorde, één zin over "eeuwenoude spanningen" en je bent het vertrouwen kwijt van precies het publiek dat je eerst nodig hebt. Beleid hiervoor staat in §14 en §22.

# 3. De sterkste unieke elementen

Dit zijn de vijf dingen die PassPrint eigen maken. Alles wat hierna komt in dit document moet er minstens één versterken; wat dat niet doet, is optioneel.

1. **Het handgeschreven nummer.** Geen printje maar een exemplaar. Het is de goedkoopste vorm van waarde die bestaat: inkt en tijd. Het maakt van een print een edities-object en van de klant een verzamelaar. Zet dit in het hart van je communicatie, niet in de kleine lettertjes.
2. **Het verhaalkaartje.** Dit is het verschil tussen decoratie en betekenis. Het is ook je hele SEO-strategie, je hele Instagram-content en je hele reden om er een tweede jaar aan te beginnen. Behandel de tekst als product, niet als bijlage.
3. **De envelop als drager.** Bijna niemand doet dit goed. De envelop is het eerste ding dat de klant ziet, het enige wat de buurman ziet, en het meest gefotografeerde onderdeel. Een gestempelde, per maand wisselende envelop kost bijna niets en levert enorm veel.
4. **De regio als reis in plaats van als thema.** Twaalf plaatsen na elkaar in één regio geeft een boog: je begint aan de kust en eindigt in de bergen, of je begint in de grootste stad en eindigt in het kleinste dorp. Dat is een verhaallijn die een klant kan volgen, en het is de reden om niet af te haken.
5. **Diaspora als eerste markt.** Dit is je oneerlijke voordeel. Een 60-jarige uit Novi Pazar die al dertig jaar in Antwerpen woont en een print van zijn geboortestad aan zijn kleinkind geeft, is emotioneel niet te vergelijken met iemand die "leuke posters" zoekt. Bouw de lancering hierop.

# 4. Zwakke punten en risico's (kort; volledige analyse in §22)

- **Kunsttoevoer.** 24 werken per collectie, op tijd, consistent. Dit is risico nummer één.
- **Marge per envelop.** Papier + druk + envelop + porto + betaalkosten + verlies. Als je hier een euro of twee verkeerd inschat, werkt het model niet. Zie §15.
- **Churn na maand drie.** Structureel, niet oplosbaar met design. Wel oplosbaar met prepaid termijnen en een verhaalboog.
- **Beschadigde zendingen.** Papier + post = kreuken. Zonder karton of stevige envelop krijg je klachten, en één slechte unboxing weegt zwaarder dan tien goede.
- **Jij als enige.** Curatie, tekst, design, druk, verpakking, klantendienst, marketing. Twaalf maanden lang, elke maand een deadline die niet verschuift. Dit is de reden om klein te starten met vooruitbetaalde termijnen.
- **Culturele misstap.** Klein risico, catastrofale impact bij deze regio.
- **Overbouw.** Een site met globe, paspoort, archief, journal, stemmodule en shop vóór klant nummer één is de klassieke manier om zes maanden te verliezen.

# 5. Aanbevolen positionering

## Kernpositionering

> **PassPrint is een maandelijkse kunstuitgave in een envelop. Elke maand één plaats, door één kunstenaar, in een genummerde oplage — met het verhaal erbij.**

Let op de woorden die er *niet* staan: box, abonnement, deal, decoratie, ontdekking, reis. "Uitgave" en "oplage" plaatsen je naast kunstboeken en gelimiteerde edities in plaats van naast maandboxen. Gebruik intern consequent **editie** voor één maand en **collectie** voor twaalf.

## Unieke waardepropositie

Er bestaan kunstprintwinkels (veel keuze, geen verhaal, geen ritme), kunstabonnementen (meestal willekeurige werken zonder samenhang) en reisdecoratie (toeristisch, massaproductie). PassPrint is het enige waar het werk, de plaats, het verhaal, de oplage en het ritme één ding zijn. Je koopt geen print; je volgt een regio, twaalf maanden lang, en je hebt aan het eind iets dat af is.

## Elevator pitch (gesproken, ±20 seconden)

"PassPrint is een kunstclub per post. Elke maand krijg je een envelop met twee prints van één plaats — dit jaar in de Balkan — met een kaartje over wat je ziet en wie het gemaakt heeft. Alles is met de hand genummerd en de oplage is beperkt. Na twaalf maanden heb je een complete collectie."

## Uitgebreid merkverhaal (te gebruiken op *Over PassPrint*)

*De meeste plaatsen leer je kennen via foto's die op elkaar lijken. Dezelfde brug, dezelfde hoek, hetzelfde licht. Wat je daar niet uit leert, is hoe een plaats aanvoelt voor iemand die er woont — welk gebouw iedereen kent en waarom, welk raam niemand fotografeert, wat er stond voor er iets anders stond.*

*PassPrint begon met een simpele vaststelling: die verhalen zitten meestal in de familie, niet in reisgidsen. Elke maand kiezen we één plaats en vragen we één kunstenaar om ze te tekenen, te schilderen of te drukken. Geen ansichtkaartversie — de versie die iemand ziet die er iets mee heeft.*

*Je krijgt het per post. Een envelop, twee prints, een kaartje met het verhaal, en een nummer dat met de hand op de achterkant staat. De oplage is beperkt tot wat we die maand drukken; daarna wordt ze niet herdrukt.*

*Het eerste jaar reizen we door de Balkan. Twaalf plaatsen, twaalf kunstenaars, twaalf verhalen. Daarna gaan we ergens anders heen.*

## Homepage-introductie (kort, boven de vouw)

> **Elke maand één plaats, per post.**
> Twee genummerde prints, één verhaal, in een envelop.
> Dit jaar: de Balkan.

## Vijf taglines

1. **Post uit één plaats per maand.** (helderst, minst poëtisch — mijn voorkeur)
2. **Een collectie die per post aankomt.**
3. **Twaalf plaatsen. Twaalf kunstenaars. Eén jaar.**
4. **Kunst met een adres.**
5. **Verzamel plaatsen, niet posters.**

Vermijd alles in de trant van "ontdek de wereld zoals nooit tevoren". Dat is exact het register waar je van weg wil.

## Vijf korte advertenties (Instagram/Pinterest, 1 regel + beeld)

1. *"Maand 3: Mostar. Genummerd 1 tot 180, daarna niet meer gedrukt."*
2. *"Iemand in je familie komt daarvandaan. Stuur haar de envelop."* (diaspora, cadeau)
3. *"Twee prints, één verhaal, één envelop. Elke maand."*
4. *"We hebben Kotor niet vanaf het water getekend. Iedereen doet Kotor vanaf het water."*
5. *"Het eerste jaar van PassPrint gaat door de Balkan. Nog 40 plaatsen in de club."*

## Drie versies van de abonnementsomschrijving

**Kort (productkaart):** Elke maand een envelop met twee genummerde prints en het verhaal van één plaats. Verzending inbegrepen in België en Nederland.

**Middel (checkout):** Je krijgt twaalf maanden lang, rond het einde van elke maand, een envelop in de bus: één grote print (A4), één kleine, en een kaartje met het verhaal van de plaats en de kunstenaar. Elke print is met de hand genummerd. We drukken alleen wat die maand nodig is en herdrukken niet.

**Lang (Hoe het werkt):** PassPrint werkt in collecties van twaalf maanden. Dit jaar is dat de Balkan: twaalf plaatsen, elk door een andere kunstenaar. Rond de 25e van elke maand sluiten we de oplage; wat we dan aan leden hebben, is wat we drukken, plus een klein aantal extra's. Daarna nummeren we met de hand en versturen we. Je krijgt een grote print op 300 g papier, een kleine print, en een los kaartje met het verhaal, de kunstenaar en de plaats — inclusief coördinaten, zodat je hem terugvindt. Na twaalf maanden heb je de collectie compleet; wie dat haalt, krijgt de slotstempel en kan de bewaarmap bestellen.

## Waarde tonen zonder marketingtaal

Vervang bijvoeglijke naamwoorden door feiten. Niet "premium papier", wel "300 g, ongestreken, mat, gedrukt bij [naam drukker] in [stad]". Niet "gelimiteerd", wel "oplage 180, met de hand genummerd, niet herdrukt". Niet "van echte kunstenaars", wel de naam, de stad, het atelier en het bedrag dat de kunstenaar per editie krijgt. Concreetheid is bij dit merk je enige geloofwaardige verkooptechniek, en het is meteen ook je verdediging tegen "dit lijkt door AI gemaakt".

# 6. Doelgroepanalyse

Geen persona's. Vier echte koopmotieven, in volgorde van bruikbaarheid voor de lancering.

## A. Diaspora en mensen met een band met de regio — **primair voor lancering**

**Motivatie.** Herkenning en trots. Een plaats waar hun ouders vandaan komen, waar ze elke zomer heen gaan, waar niemand in hun omgeving over praat. De emotionele lading is groot en het aanbod is bijna nul — wat bestaat is toeristische rommel.

**Koopgedrag.** Kopen impulsief en emotioneel, maar niet duur zonder vertrouwen. Kopen vaak voor iemand anders: ouders, grootouders, een broer in het buitenland. Delen actief binnen familie- en gemeenschapsgroepen. WhatsApp en Facebook, niet TikTok.

**Twijfels.** "Is dit gemaakt door iemand die de plaats kent, of door een buitenstaander die er één weekend was?" Dat is de kernvraag, en die moet je op de site expliciet beantwoorden met namen en herkomst van de kunstenaars.

**Waarom stoppen ze.** Als de reeks doorschuift naar plaatsen waar ze niets mee hebben. Oplossing: laat losse edities kopen zonder abonnement, en houd het archief open.

**Taal die overtuigt.** Concrete plaatsnamen, lokale spelling met correcte diakritische tekens (Mostar, Kotor, Novi Pazar, Šibenik, Ohrid), geen abstracte "Balkanroutes".

**Beeld dat overtuigt.** Het werk zelf, groot. Detail van een gevel die ze herkennen. Handen die de envelop openen.

## B. Mensen die post en papier missen — **secundair, breedste markt**

**Motivatie.** Verlangen naar iets traags en fysieks. Ze kopen geen kunst, ze kopen een ritueel. Overlapt met wie brieven schrijft, boeken koopt, riso-prints, zines, notitieboekjes.

**Twijfels.** "Krijg ik elke maand iets dat ik écht wil ophangen, of stapelt het zich op?" Deze groep is bang voor rommel. Antwoord: klein formaat, ophangbaar, en een map om te bewaren.

**Wat ze als te duur zien.** Boven ±€30 per maand voor twee prints zonder lijst, tenzij het duidelijk gelimiteerd en genummerd is.

**Taal die overtuigt.** Materiaal, formaat, gewicht, drukwijze. Deze groep leest specificaties.

## C. Cadeaukopers — **grootste commerciële kans, vooral Q4**

**Motivatie.** Iets vinden dat niet iedereen heeft, met een verhaal dat je kunt navertellen terwijl je het geeft. Cadeau-abonnementen van 3 of 6 maanden zijn hier het product, niet doorlopende abonnementen.

**Twijfels.** Levertijd, of het op tijd aankomt, of het er waardig uitziet bij ontvangst, en of de ontvanger er niet mee opgezadeld zit met een doorlopende betaling. Los dat laatste hard op: **cadeau-abonnementen lopen af, punt.**

**Wat ze nodig hebben op de site.** Een cadeaupagina met een afdrukbaar of digitaal aankondigingskaartje, duidelijke besteldata, en de mogelijkheid rechtstreeks naar het adres van de ontvanger te sturen.

## D. Verzamelaars en designliefhebbers — **klein maar loyaal, komt later**

**Motivatie.** Volledigheid, nummering, oplage, eerste editie. Deze groep koopt de volledige collectie achteraf en betaalt voor collector's edities. Ze komen pas als er iets te verzamelen valt — reken hier niet op in maand één, wel in maand twaalf.

## Wat dit betekent voor de lancering

**Richt de eerste 100 klanten volledig op A en C.** Niet op "kunstliefhebbers" in het algemeen; dat is geen doelgroep, dat is een categorie. Concreet: Balkan-gemeenschappen in Antwerpen, Brussel, Genk, Gent en Rotterdam, plus cadeaukopers rond die groep. De site moet daarom in de eerste versie **Nederlands en Engels** zijn (Engels omdat diaspora over landsgrenzen deelt), niet Frans en Duits.

## Bezwaren die de website moet beantwoorden

| Bezwaar | Waar je het beantwoordt |
|---|---|
| "Wie maakt dit eigenlijk?" | Homepage + kunstenaarssectie, met naam en foto |
| "Is dit echt beperkt of is dat marketing?" | Oplagegetal per editie, expliciet beleid: geen herdruk |
| "Wat als het beschadigd aankomt?" | FAQ + verzendpagina, met een concrete belofte |
| "Kan ik makkelijk stoppen?" | Bij de prijs, niet verstopt in de FAQ |
| "Is dit respectvol tegenover de regio?" | Over-pagina: bronnen, meelezers, herkomst kunstenaars |
| "Krijg ik iets dat ik wil ophangen?" | Grote, eerlijke fotografie van echte prints aan echte muren |
| "Wat kost verzending naar mijn land?" | Zichtbaar vóór de checkout |

# 7. Drie creatieve richtingen

Elke richting is compleet uitgewerkt en verschilt fundamenteel — niet alleen in kleur.

## Richting A — *Archief*

**Omschrijving.** De site gedraagt zich als een archief of een documentatiesysteem: alles heeft een nummer, een datum, een coördinaat, een status. Kunst wordt gepresenteerd als vondst, niet als product. Het referentiekader is een museumdepot, een cartografische instelling, een uitgeverij van naslagwerken.

**Sfeer.** Koel, precies, rustig, licht ambtelijk maar warm door papier. Vertrouwenwekkend.

**Kleuren.** Papier `#F2EFE7`, inkt `#17171A`, potlood `#6B6A64`, en één accentkleur per collectie (Balkan: verweerd koper `#A65B33`). Nooit meer dan drie kleuren tegelijk in beeld.

**Typografie.** Een redactionele serif voor titels en lopende tekst (Spectral of Newsreader), een monospace voor alle data: nummers, coördinaten, datums, oplages, labels (IBM Plex Mono). Die tweedeling — verhaal in serif, feiten in mono — is de hele identiteit.

**Materiaal.** Gescand papier, kartonranden, stempelinkt die niet perfect afdrukt, perforatielijnen, hechtgaatjes.

**Fotografie.** Recht van boven, hard licht, objecten los op papier. Documentatiestijl, geen lifestyle.

**Illustratie.** Beperkt tot cartografie en pictogrammen; het echte werk is de kunst.

**Animatie.** Bijna niets. Wat beweegt, beweegt als papier: iets schuift, iets stempelt, iets vult zich in. Geen fades, geen parallax.

**Verpakking.** Kraftkleurige of geverfde envelop, rubberen stempel per maand, sticker met editienummer, wikkel van dun karton.

**Sterk.** Zeer onderscheidend, kost bijna geen geld om te produceren, schaalt eindeloos over regio's, is het tegendeel van AI-look, en maakt van het nummer een designelement.

**Zwak.** Kan te droog worden als de kunst niet warm genoeg is. Vraagt discipline; één afgeronde kaart met schaduw en het effect is stuk.

**Geschikt voor.** A, B en D uitstekend. C (cadeau) redelijk — het oogt bijzonder, maar minder meteen "feestelijk".

## Richting B — *Editie*

**Omschrijving.** De site is een tijdschrift. Elke maand is een cover. Grote, hoge-contrast typografie, brede beeldvlakken, veel wit, ritme van een magazine-spread. Referentie: onafhankelijke kunstmagazines en modeuitgaven.

**Sfeer.** Stijlvol, hedendaags, een tikje zelfverzekerd. Cultureel eerder dan folkloristisch.

**Kleuren.** Zuiver wit `#FBFBF9`, diepzwart `#0E0E0E`, plus één kleur die *uit het kunstwerk van die maand* gehaald wordt. De site verandert dus mee met de editie.

**Typografie.** Eén sterke display-serif met hoog contrast in grote formaten, en een neutrale sans op klein formaat. Geen mono.

**Materiaal.** Nauwelijks textuur. De kracht zit in compositie en witruimte.

**Fotografie.** Redactioneel: portret van de kunstenaar, detailopnames, prints in echte interieurs, licht met richting.

**Animatie.** Traag, filmisch: beeldwissels, subtiele schaalveranderingen, tekst die één keer per sectie inzet.

**Verpakking.** Strak, één kleur per collectie, klein logo, klemtoon op de druk zelf.

**Sterk.** Ziet er duur uit zonder duur te zijn. Werkt heel goed op Instagram en Pinterest. Sterk voor cadeaukopers.

**Zwak.** Dit register is druk bezet — veel merken proberen het, en zonder uitstekende fotografie valt het meteen door de mand. Het leunt volledig op beeldkwaliteit die je in maand één nog niet hebt. Bovendien botst een puur redactionele look met het verzamelaspect: nummering en oplage worden bijzaak.

**Geschikt voor.** C sterk, B goed, A matig (te afstandelijk voor emotionele herkenning), D matig.

## Richting C — *Papier en pigment*

**Omschrijving.** Warm, tactiel, ambachtelijk. De site voelt aan als een atelier: gescande texturen, riso-achtige kleurlagen, handgeschreven aantekeningen, zichtbare imperfectie.

**Sfeer.** Menselijk, nabij, gemaakt door iemand.

**Kleuren.** Warm gebroken wit `#F6F1E6`, inkt `#232019`, plus twee riso-achtige spot-kleuren per collectie (bv. `#D8552F` en `#2E5B63`) die over elkaar heen mogen liggen.

**Typografie.** Een humanistische serif plus een geschreven of getekend accent voor korte woorden. Nooit een script-font voor lopende tekst.

**Materiaal.** Overvloedig: papiervezel, verfvlekken, tape, scanartefacten.

**Fotografie.** Handen, atelier, gereedschap, rommel. Bewust minder geregisseerd.

**Animatie.** Speels: inkt die doorloopt, papier dat kantelt, stempels die niet recht staan.

**Verpakking.** Handgeschilderde of handgestempelde enveloppen, wisselende papiersoorten.

**Sterk.** Meest menselijk, meest onmiskenbaar niet-AI, sluit naadloos aan bij het handgeschreven nummer.

**Zwak.** Snelst gedateerd, moeilijkst consistent te houden over twaalf maanden, en het minst "premium" — het risico is dat het aanvoelt als een hobbyproject en dus de prijs ondermijnt. Ook technisch zwaarder: veel textuurbeelden kosten bandbreedte.

**Geschikt voor.** B sterk, A goed, C matig, D zwak (verzamelaars willen precisie, geen slordigheid).

# 8. Gekozen creatieve richting

**Richting A — *Archief*, met de typografische ademruimte van B voor de kunstpagina's.**

Concreet: de structuur, taal en detaillering van een archief, maar wanneer een kunstwerk in beeld komt, wijkt alles opzij en krijgt het werk een volledige, redactionele pagina zonder franje.

## Waarom

**Het is de enige richting die het handgeschreven nummer tot systeem maakt.** Een archief heeft nummers nodig. Bij B is nummering een detail, bij C is het charmant. Bij A is het de logica van de hele site: elke editie heeft een code (`BAL-03 · MOSTAR · 43.3438 N, 17.8078 E · oplage 180`), en die code komt terug op de print, op het kaartje, op de envelop, in de URL en in het digitale paspoort. Eén idee, overal consequent doorgevoerd. Dat is wat een studio-ontworpen site onderscheidt van een verzameling mooie secties.

**Het lost je AI-probleem structureel op, niet cosmetisch.** De AI-look ontstaat uit ronde kaarten, gradiënten, gecentreerde hero's, iconen in cirkels en overal dezelfde ademende animaties. Een archiefsysteem is per definitie links uitgelijnd, rechthoekig, dicht, tabellarisch en labelgedreven. Je vermijdt de AI-look niet door dingen weg te laten, maar door een ander organisatieprincipe te kiezen.

**Het past bij een beperkt budget.** De visuele rijkdom komt uit typografie, papierscans en de kunst zelf — geen dure fotoshoots, geen 3D, geen video. Je hebt op dag één één goede scanner en één goede fotograaf-vriend nodig, niet een productiebudget.

**Het schaalt over regio's.** Alleen de accentkleur en de cartografie veranderen per collectie. Het skelet blijft. Dat betekent dat collectie twee je geen herontwerp kost.

**Het draagt de culturele lading beter.** Een archieftoon ("dit is wat we weten, dit is waar we het vandaan hebben, dit is wie het maakte") is inherent respectvoller dan een redactionele of ambachtelijke toon bij plaatsen die politiek beladen zijn. Het claimt minder en documenteert meer.

## Waarom niet B of C

B leunt volledig op fotografie die je pas na maand drie op niveau hebt, en verzwakt precies het verzamelaspect dat je retentie draagt. C is de warmste richting en ik zou hem niet volledig weggooien — gebruik hem in de *fysieke* uitvoering (handgestempelde envelop, zichtbare inktvariatie), maar niet op de site. Digitaal ambacht ziet er goedkoop uit; fysiek ambacht ziet er duur uit. Zet dus het ambacht in de envelop en de precisie in de site. Die spanning tussen strakke site en warm object is bovendien op zich al een merkidee.

# 9. Website-sitemap

## MVP (versie 1 — alles wat nodig is om te verkopen, en niets meer)

| Pagina | URL | Doel |
|---|---|---|
| Home | `/` | Concept begrijpen, editie van deze maand zien, abonneren |
| Deze maand | `/editie/bal-03-mostar` | De lopende editie in detail; ook los te koop |
| Hoe het werkt | `/hoe-het-werkt` | Ritme, formaat, papier, nummering, verzending, opzeggen |
| Abonneren | `/abonneren` | Drie opties, één beslissing |
| Cadeau | `/cadeau` | Cadeau-abonnement, aankondigingskaartje, besteldata |
| De kunstenaars | `/kunstenaars` | Wie maakt dit — één pagina, alle namen |
| Over PassPrint | `/over` | Wie jij bent, waarom, hoe je met de regio omgaat |
| Veelgestelde vragen | `/faq` | Bezwaren wegnemen |
| Verzending | `/verzending` | Landen, tarieven, timing, schade |
| Contact | `/contact` | E-mail, formulier, adres |
| Voorwaarden, Privacy, Cookies, Herroeping | `/voorwaarden` enz. | Wettelijk verplicht |
| Account | `/account` | Adres, abonnement, facturen — sober, functioneel |

Dat is het. Twaalf pagina's plus juridisch.

## Versie 2 (na de eerste 100 leden, ongeveer maand 4 tot 8)

- **Archief** `/archief` — alle verschenen edities, filterbaar op collectie en land. Dit is je SEO-motor.
- **Editiepagina's per verschenen maand** — elk een eigen verhaalpagina.
- **Kunstenaarsdetail** `/kunstenaars/[naam]` — portret, werk, andere edities.
- **Verhalen / Journal** `/verhalen` — langere stukken over plaatsen, technieken, achtergrond.
- **Stemmen** `/volgende-reis` — keuze uit drie voorbereide regio's.
- **Losse verkoop** `/winkel` — restanten van vorige edities.

## Versie 3 (lange termijn, maand 12+)

- **Digitaal paspoort** `/paspoort` — verzamelde edities, nummers, stempels, voltooide collecties.
- **Collector's edities** `/collecties/de-balkan` — volledige set, box, bewaarmap, boekje.
- **Kaart** `/kaart` — interactieve kaart van alle bezochte plaatsen.
- **Meertaligheid uitgebreid** — `/fr/`, `/de/`.

## Navigatie

**Desktop.** Eén horizontale balk, links uitgelijnd, geen logo in het midden. Links: `PassPrint` (woordmerk). Midden-links: `Deze maand · Hoe het werkt · Kunstenaars · Over`. Rechts: `Cadeau` en `Abonneren` (het enige element met een kader). In de balk, klein en in mono: de lopende editiecode, bijvoorbeeld `BAL-03 · MOSTAR`. Dat kost niets en zegt onmiddellijk wat voor site dit is.

**Mobiel.** Geen hamburgermenu voor vier links. Onderaan een vaste, dunne balk met links de editiecode en rechts `Abonneren`. De rest van de navigatie staat als eenvoudige lijst in de voettekst. Dit is bewust ongebruikelijk en werkt beter: één permanente actie in plaats van een verstopt menu.

**Voettekst.** Behandel de voettekst als colofon van een uitgave, in mono, in kolommen: uitgave, contact, verzending, juridisch, nieuwsbrief. Geen sociale-media-iconen in gekleurde cirkels — gewoon de woorden.

# 10. Volledige homepage-opbouw

## Eerst: vijf hero-concepten

**1. Stilleven.** Één grote foto van de envelop en de prints op een tafel, full-bleed, met één zin en één tekstlink. *Sterk maar volledig afhankelijk van fotokwaliteit die je op dag één nog niet hebt.*

**2. De paspoortpagina.** De hero is een blanco paspoortpagina die zich tijdens het scrollen vult met stempels van de verschenen edities. *Charmant, maar het paspoortidee te letterlijk en te vroeg ingezet — precies de kinderachtigheid die je wil vermijden.*

**3. Het adresveld.** De hero is de voorkant van een envelop: poststempel linksboven (`SARAJEVO · 03.2026`), adresregels rechts, en op de adresregel staat de propositie. *Origineel, goedkoop, meteen begrijpelijk, en het typografische systeem doet het werk in plaats van beeld.*

**4. De print die eruit schuift.** Scroll-gestuurde animatie waarbij het werk uit de envelop tevoorschijn komt. *Mooi idee, maar scroll-gekoppelde animatie boven de vouw is op mobiel traag en frustrerend, en het houdt de propositie tegen tot je klaar bent met animeren.*

**5. De cover.** Het werk van deze maand, groot, met eronder een mono-onderschrift: plaats, kunstenaar, coördinaten, oplage, druk. Verder niets. *Sterkste als het werk sterk is; het maakt de kunst het argument.*

**Keuze: 3 en 5 gecombineerd, in die volgorde.** Het eerste scherm is de envelop (concept), één scrolbeweging lager ligt de print (bewijs). Dat is precies de fysieke ervaring van het product, vertaald naar de eerste tien seconden op de site — zonder animatie die iets vertraagt. Concept 4 bewaren we voor de sectie *Wat je krijgt*, waar de vertraging wél iets oplevert.

## Sectie voor sectie

**S1 — De envelop (hero).**
*Doel:* binnen vijf seconden begrijpen wat dit is.
*Inhoud:* de hero is opgebouwd als envelopvoorkant. Linksboven, in mono en licht gedraaid, een stempelblok: `PASSPRINT · BAL-03 · MOSTAR · 03.2026`. Rechts, op adresregels: **"Elke maand één plaats, per post."** en daaronder in kleiner formaat: "Twee genummerde prints, één verhaal, in een envelop. Dit jaar: de Balkan." Eén tekstlink: `Bekijk de editie van deze maand →`, en één omkaderde knop: `Abonneren`.
*Visueel:* papierwitte achtergrond met een nauwelijks zichtbare vezelstructuur, geen foto, geen gradiënt. De enige kleur is de stempel in koper.
*Interactie:* geen. Wel: bij het laden zet de stempel zich één keer, in 400 ms, met een lichte inktonregelmatigheid. Eén keer, nooit meer.
*Waarom dit werkt:* je verkoopt in het eerste scherm de vorm van het product, niet een belofte.
*Overgang:* de onderrand van de envelop wordt de bovenrand van de volgende sectie.

**S2 — De cover.**
*Doel:* laten zien dat de kunst goed is. Dit is het beslissende moment.
*Inhoud:* het grote werk van de lopende editie, zo groot mogelijk, met eronder in mono: `Mostar, Bosnië en Herzegovina · 43.3438 N, 17.8078 E · Amina H. · zeefdruk, 2026 · oplage 180 · A4, 300 g`.
*Interactie:* één subtiel detail — bij hover (desktop) verschijnt een uitsnede op ware grootte, zodat je de druk ziet. Op mobiel: een knop `Detail op ware grootte`.
*Waarom:* het bezwaar "is dit echt kwaliteit?" beantwoord je door in te zoomen op papier en inkt, niet door het woord "premium".

**S3 — Wat er in de envelop zit.**
*Doel:* de belofte concreet maken.
*Inhoud:* vijf genummerde items met naam en specificatie: `01 Grote print — A4, 300 g, mat, met de hand genummerd`, `02 Kleine print — A6, zelfde papier`, `03 Verhaalkaartje — 10 × 15 cm, tweezijdig`, `04 Kunstenaarsnotitie — met de hand ondertekend`, `05 Envelop — gestempeld, per maand anders`.
*Visueel:* platliggende foto van alle onderdelen naast elkaar, met dunne aanwijslijnen zoals in een technische tekening.
*Animatie:* hier hoort concept 4 thuis — bij het scrollen schuiven de onderdelen één voor één uit de envelop naar hun plaats. Kort, 600 ms totaal, en volledig uitgeschakeld bij `prefers-reduced-motion`.
*CTA:* geen. Deze sectie mag rustig zijn.

**S4 — Het nummer.**
*Doel:* het verschil met een poster in één beeld.
*Inhoud:* extreme close-up van een achterkant met een handgeschreven `037/180` en een stempel. Eén zin ernaast: **"We drukken wat die maand nodig is en herdrukken niet. Je exemplaar heeft een nummer, met de hand geschreven."**
*Waarom dit een eigen sectie krijgt:* dit is je sterkste onderscheidende element en het kost je één foto.

**S5 — De reis van dit jaar.**
*Doel:* laten zien dat er een boog is, en nieuwsgierigheid opwekken naar wat komt.
*Inhoud:* een horizontale tijdlijn van twaalf velden: verschenen edities tonen een kleine uitsnede van het werk plus plaatsnaam; toekomstige velden zijn leeg met alleen een maand en een gestippelde omtrek. Twee of drie toekomstige plaatsen zijn al zichtbaar, de rest niet.
*Visueel:* geen wereldbol. Een dunne, cartografische lijn verbindt de velden — de route.
*Interactie:* horizontaal scrollbaar op mobiel, klikbaar naar de editiepagina's.
*Waarom:* dit is functioneel het beste deel van de paspoortmetafoor, zonder één keer het woord paspoort te gebruiken.

**S6 — Wie het maakt.**
*Doel:* het "wie zit hierachter"-bezwaar wegnemen.
*Inhoud:* portret van de kunstenaar van deze maand, twee alinea's in zijn of haar eigen woorden (echt citaat, niet geparafraseerd), naam, stad, techniek. Daaronder één regel: `Alle kunstenaars →`.
*Toon:* ik zou hier ook expliciet vermelden wat de kunstenaar per editie betaald krijgt, of dat het een vast bedrag plus royalty is. Dat is ongebruikelijk en het is precies het soort transparantie waar dit publiek op reageert.

**S7 — Waarom deze plaatsen.**
*Doel:* de culturele verantwoording.
*Inhoud:* korte tekst van jou als oprichter, over hoe plaatsen gekozen worden, wie meeleest, welke bronnen gebruikt worden. Dit is een vertrouwenssectie, geen verhaalsectie.

**S8 — Abonneren.**
*Doel:* conversie.
*Inhoud:* drie opties naast elkaar, in tabelvorm, in mono voor de cijfers: `1 maand`, `6 maanden`, `12 maanden`. Bij de twaalfmaandsoptie: `inclusief Founding-print en bewaarmap`. Eronder, klein maar zichtbaar: "Verzending inbegrepen in België en Nederland. Je kunt op elk moment opzeggen, tot de 20e van de maand."
*Visueel:* geen kaarten met schaduwen. Drie kolommen gescheiden door haarlijnen. De aanbevolen optie krijgt een dunne kaderlijn en een klein label `meest gekozen`.
*Waarom drie en niet zes:* elke extra optie kost conversie. Drie maanden voegt niets toe dat zes niet doet.

**S9 — Veelgestelde vragen (verkort).**
Vijf vragen, uitklapbaar: Wanneer wordt verzonden? Wat als het beschadigd aankomt? Kan ik pauzeren? Wordt er herdrukt? Verzenden jullie buiten de Benelux?

**S10 — Voettekst / colofon.**
Nieuwsbriefveld met een eerlijke belofte ("één mail per maand, wanneer de nieuwe editie sluit"), links, juridisch, uitgavegegevens.

**Wat er bewust níét op de homepage staat:** testimonials (je hebt er nog geen, en verzonnen sociale bewijskracht is onmiddellijk zichtbaar), statistieken, een wereldbol, een stemmodule (dat leidt af van kopen), en logo's van "as seen in".

# 11. Pagina-voor-pagina-plan

**Deze maand / editiepagina.** Kop met editiecode. Het grote werk, full-bleed. Daaronder de specificatietabel (plaats, land, coördinaten, kunstenaar, techniek, papier, formaat, oplage, verzenddatum). Dan het verhaal — 400 tot 700 woorden, redactioneel, met bronvermelding onderaan. Dan de kleine print. Dan de kunstenaar. Dan twee acties: `Abonneer en start met deze editie` en `Koop deze editie los`. Deze pagina is later, in het archief, je belangrijkste SEO-bezit.

**Hoe het werkt.** Chronologisch, in vijf stappen met datums: je bestelt (voor de 20e) → we sluiten de oplage → we drukken en nummeren (rond de 24e) → we versturen (rond de 28e) → je ontvangt (binnen 2 tot 5 werkdagen). Daarna: papier en formaten, nummering en oplagebeleid, verzendlanden en tarieven, pauzeren en opzeggen. Alles in feiten, geen sfeer. Dit is de pagina die twijfelaars overtuigt.

**Abonneren.** Eén beslissing per scherm. Termijn kiezen → startmaand kiezen (deze editie of de volgende) → adres → betalen. Geen accountverplichting vóór de betaling.

**Cadeau.** Termijn, ontvangeradres, startdatum, en een aankondigingskaartje dat de gever direct kan downloaden of laten meesturen. Vermeld expliciet: het loopt af, er wordt niets automatisch verlengd bij de ontvanger. Toon de uiterste besteldata voor de feestdagen prominent vanaf november.

**Kunstenaars.** In v1 één pagina met een lijst; per kunstenaar naam, stad, één werk, twee zinnen. In v2 detailpagina's.

**Over PassPrint.** Wie je bent, in de eerste persoon, kort. Waarom de Balkan als eerste. Hoe je plaatsen kiest. Wie meeleest. Hoe kunstenaars betaald worden. Waar er gedrukt wordt. Dit is de vertrouwenspagina; hij mag persoonlijk zijn en moet eerlijk zijn over hoe klein je bent — dat is een voordeel, geen zwakte.

**Verzending.** Landen met tarieven in een tabel, timing, wat er gebeurt bij schade of verlies, douane buiten de EU.

**FAQ.** Groepen: het product, het abonnement, verzending, kunstenaars en rechten, praktisch.

**Archief (v2).** Een tabel, geen raster van kaarten: code, maand, plaats, land, kunstenaar, oplage, status (`uitverkocht` / `beperkt beschikbaar`). Filterbaar. Dit is de meest archiefachtige pagina van de site en waarschijnlijk de mooiste.

**Volgende reis / stemmen (v2).** Drie voorgestelde regio's, elk met drie voorbeeldplaatsen en één zin waarom. Eén stem per e-mailadres. Toon de tussenstand als staafjes in mono, niet als een spelletje.

**Digitaal paspoort (v3).** Zie §14 in de briefing; mijn uitwerking staat in §21.

# 12. 3D- en animatieconcept

## Eerlijk oordeel over de wereldbol

Je vraagt om acht varianten te vergelijken. Hier zijn ze, kort en zonder omhaal.

| Variant | Originaliteit | Past bij PassPrint | Technisch | Performance | Mobiel | Technologie |
|---|---|---|---|---|---|---|
| 1. Realistische 3D-globe | Zeer laag | Slecht | Hoog | Slecht (texturen 5–20 MB) | Slecht | Three.js + R3F |
| 2. Wireframe-globe | Laag | Matig | Middel | Redelijk | Redelijk | Three.js |
| 3. Stippenglobe | Zeer laag (het AI-cliché bij uitstek) | Slecht | Middel | Redelijk | Redelijk | Three.js |
| 4. Papieren/illustratieve globe | Hoog | Goed | Hoog (moeilijk mooi te krijgen) | Matig | Matig | R3F + custom shader |
| 5. Typografische globe | Hoog | Matig (te concept-achtig) | Hoog | Redelijk | Matig | Three.js of SVG |
| 6. Globe met de kunstwerken erop | Middel | Matig (verminkt de werken) | Hoog | Slecht | Slecht | R3F |
| **7. Platte, cartografische kaart** | **Middel-hoog mits eigen stijl** | **Uitstekend** | **Laag** | **Uitstekend** | **Uitstekend** | **SVG + GSAP of Motion** |
| 8. 2D/3D-combinatie | Middel | Matig | Hoog | Matig | Matig | Divers |

**Aanbeveling: variant 7, en pas in versie 2.**

Waarom geen globe, ook al vraag je erom:

- Een globe toont de hele wereld, terwijl PassPrint over één regio per jaar gaat. Je zoomt dus meteen in, en dan had je net zo goed een kaart kunnen tonen. De globe *werkt tegen je verhaal*: hij zegt "overal", jij zegt "hier, deze maand".
- Een globe met oplichtende landen is in 2026 het meest herkenbare AI- en startupsignaal dat er is. Je vraagt in §5 van je briefing expliciet om dat te vermijden.
- Op mobiel, waar het merendeel van je verkeer zit, is een WebGL-canvas boven de vouw een directe aanslag op je laadtijd, je batterij en je Core Web Vitals.
- Landsgrenzen tekenen in de Balkan is een politieke handeling. Een kaart met plaatsen en zonder grenzen is niet alleen technisch eenvoudiger, het is ook verstandiger.

**Wat in de plaats komt.** Een handgetekende, cartografische SVG-kaart van de regio: kustlijn, bergketens en rivieren in dunne lijn, geen grenzen, geen landkleuren. Plaatsen als kleine gestempelde punten. Verschenen edities zijn ingevuld, toekomstige zijn open cirkels. Een dunne route verbindt de bezochte plaatsen in volgorde van verschijnen. Dit is één SVG van ongeveer 40 tot 80 KB, laadt onmiddellijk, is toetsenbordnavigeerbaar, werkt in dark mode, is doorzoekbaar door Google en ziet er niet uit als iets anders op het internet — want jij hebt hem laten tekenen.

Als je later per se diepte wil: laat de kaart bij het scrollen heel licht kantelen in CSS 3D (`rotateX(4deg)`) met een papierschaduw. Dat kost nul kilobyte en geeft precies genoeg fysieke suggestie.

## Animatieprincipes

Vier regels, en meer niet:

1. **Alles wat beweegt, beweegt als papier of als inkt.** Schuiven, kantelen, stempelen, doordrukken. Nooit vervagen, zweven, pulseren of gloeien.
2. **Eén betekenisvolle beweging per sectie, maximaal.** Geen scroll-reveal op elk element; dat is het duidelijkste AI-signaal in bewegend design.
3. **Kort en beslist.** 200 tot 500 ms, een enkele scherpe easing (`cubic-bezier(.2,.7,.3,1)`), geen bounce, geen spring.
4. **Volledig uitschakelbaar.** `prefers-reduced-motion: reduce` schakelt alles uit; de site moet zonder één animatie even goed werken. Als hij dan slechter oogt, was het design het probleem.

**Concrete animaties in v1 (dit is de volledige lijst):**

- De stempel in de hero, één keer bij het laden.
- De onderdelen die uit de envelop schuiven in S3.
- Het uitklappen van FAQ-items.
- De overgang tussen editiepagina's: de nieuwe pagina schuift omhoog als een blad papier.
- De bevestigingsstempel na het afronden van een bestelling.

**Technologie.** CSS-transities en `@keyframes` voor het meeste. Eén kleine animatiebibliotheek (Motion One of GSAP, ongeveer 15 KB) voor de envelopsequentie en de paginaovergang. Geen Three.js, geen React Three Fiber, geen Spline, geen Lottie in v1. Lottie voegt hier niets toe dat SVG plus CSS niet doet, en Spline levert bestanden op die je niet zelf kunt onderhouden.

# 13. Brandingplan

## De naam

**Wat hij communiceert.** "Pass" leest als paspoort, doorgang en toegangspas; "print" is ondubbelzinnig druk. Samen: toegang via drukwerk. Sterk, want beide helften zijn concreet en internationaal begrijpelijk.

**Risico's.** In het Engels ligt "pass" dicht bij "passport" maar ook bij "toegangsbewijs" en, in de VS, bij skipassen en evenementen. In het Nederlands hoort men vaak eerst "pas" (kaart) — dat is geen probleem, want de betekenis overlapt.

**Uitspraak.** In het Nederlands, Engels en Duits probleemloos. In het Frans klinkt het als "pass-prin(t)" — bruikbaar. In Zuid-Slavische talen (belangrijk voor je eerste publiek) is het goed uitspreekbaar; de schrijfwijze *PassPrint* blijft in Latijns schrift herkenbaar.

**Praktisch, en dit is dringender dan het lijkt:** controleer vandaag nog `passprint.com`, `.be`, `.eu` en de Instagram-handle, en doe een merkregistercheck in de EUIPO-databank (klasse 16 drukwerk, klasse 35 detailhandel, klasse 41 culturele activiteiten). De naam is generiek genoeg om al bezet te kunnen zijn in een aangrenzende sector — er bestaat bijvoorbeeld drukkerij- en badgingsoftware in de buurt van deze woordcombinatie. Dit moet je weten vóór je logo's laat maken. **Aanname:** ik heb dit niet gecontroleerd.

**Schrijfwijze.** Kies één vorm en houd hem overal aan. Mijn advies: **PassPrint** met interne hoofdletter in lopende tekst, en **PASSPRINT** in mono voor stempels en labels.

## Tagline en merkbelofte

- Tagline: **Post uit één plaats per maand.**
- Merkbelofte (intern, één zin): *Elke maand komt er iets in je bus dat ergens vandaan komt, gemaakt door iemand met een naam, in een oplage die niet groeit.*

## Logo-richtingen

**1. Het woordmerk (basis, verplicht).** PassPrint in de display-serif, licht verruimde letterafstand, geen symbool. Dit is het primaire merk op de site, op het verhaalkaartje en op facturen. Woordmerken zijn tijdloos en kosten niets om goed te krijgen.

**2. Het stempelmerk (het karakter).** Een rond of ovaal poststempel: `PASSPRINT` langs de bovenrand, langs de onderrand de editiecode of de plaats, en in het midden een `P` of een klein kadertje. Dit is het merk dat op de envelop staat, in koperkleurige of zwarte inkt, letterlijk gestempeld met een echte rubberen stempel. Elke maand kan de tekst binnenin veranderen. Dit is je sterkste merkidee: het combineert logo, datering, plaats en ambacht in één object van vijftien euro bij een stempelmaker.

**3. Het monogram (favicon en klein gebruik).** Een `P` in een rechthoekig kader met een enkele verticale lijn ernaast, zodat het leest als een kaderd blad papier én als de eerste letter. Werkt op 16 × 16 pixels omdat het uit twee vormen bestaat.

**Wat ik zou vermijden:** twee overlappende P's (leest snel als een modelabel uit de jaren tachtig), een wereldbol (cliché, en het gaat over één regio), en een letterlijk paspoortboekje (kinderachtig, en het dateert meteen).

## Kleursysteem

| Rol | Kleur | Gebruik |
|---|---|---|
| Papier | `#F2EFE7` | Achtergrond |
| Inkt | `#17171A` | Tekst, lijnen |
| Potlood | `#6B6A64` | Bijschriften, mono-labels |
| Accent collectie 1 (Balkan) | `#A65B33` | Stempels, één detail per scherm |
| Waarschuwing | `#8A2B18` | Alleen foutmeldingen |

Regel: **de accentkleur mag per scherm maar op één plek voorkomen.** Zodra hij op twee plaatsen staat, verliest hij zijn functie als stempel.

Elke nieuwe collectie krijgt één nieuwe accentkleur. Dat is meteen je visuele signaal dat er een nieuw jaar begint, en het kost je geen herontwerp.

## Typografie

- **Titels en lopende tekst:** Spectral of Newsreader (beide gratis, met volledige Latin Extended — noodzakelijk voor č, ć, š, ž, đ). Als er later budget is: een betaalde display-serif met hoger contrast voor de grote koppen.
- **Data, labels, codes, prijzen, nummers:** IBM Plex Mono. Dit is het lijmelement van het hele systeem.
- **Geen** Inter, Poppins, Montserrat of Space Grotesk. Niet omdat ze slecht zijn, maar omdat ze de site onmiddellijk in de verkeerde categorie plaatsen.
- Maximaal twee families, drie gewichten (regular, medium, en één italic voor citaten). Twee tot vier woff2-bestanden totaal.

## Toepassingen

**Op de envelop:** stempelmerk in accentkleur linksboven, adresvenster of adreslabel rechts, editiecode in mono onderaan, en één sticker of zegel achteraan met het editienummer.

**Op de print:** niets aan de voorkant. Op de achterkant, klein en in mono: `PASSPRINT · BAL-03 · MOSTAR · 037/180 · Amina H. · 2026`. Een logo op de voorkant van een kunstprint verlaagt de waarde onmiddellijk.

**Als favicon en social:** het monogram in het kader, wit op inkt.

# 14. Tone of voice en voorbeeldteksten

## Principes

Schrijf zoals een goede museumbijschrift-schrijver: precies, kort, warm, zonder bijvoeglijke naamwoorden die niets bewijzen. Drie regels:

1. **Een feit is beter dan een gevoel.** "300 g, ongestreken" verslaat "prachtig papier".
2. **Noem mensen bij naam.** Kunstenaars, drukkers, meelezers, plaatsen. Anonimiteit voelt industrieel.
3. **Geen woorden die alles kunnen betekenen.** Schrappen: ontdekken, beleven, uniek, exclusief, magisch, reis (behalve letterlijk), verhaal (behalve wanneer je er echt één vertelt), curated.

**Culturele regels voor de Balkan-collectie**, en dit is niet vrijblijvend: gebruik lokale plaatsnamen in lokale spelling met correcte diakritische tekens; noem het land alleen ter oriëntatie en nooit als thema; schrijf over gebouwen en mensen, niet over "de Balkan" als eenheid; vermijd de woorden turbulent, verscheurd, eeuwenoude spanningen, verborgen parel en ongerepte schoonheid; laat elke tekst nalezen door iemand die uit die plaats komt en vermeld die persoon.

## Voorbeeldteksten

**Homepagekoppen**
- "Elke maand één plaats, per post."
- "Wat er in de envelop zit"
- "037 van 180, met de hand geschreven"
- "De reis van dit jaar"
- "Wie dit maakt"

**Editie-introductie (Mostar)**
> "De brug van Mostar is de meest gefotografeerde plek van Bosnië en Herzegovina, en bijna altijd vanaf hetzelfde punt. Amina H. tekende hem vanuit de smalle straat erachter, waar de winkeltjes staan die er al waren voor de brug in 1993 instortte en die er nog steeds staan. Zeefdruk in twee lagen, oplage 180."

**Productteksten**
- Grote print: "A4 (21 × 29,7 cm), 300 g ongestreken mat papier, gedrukt in [stad]. Achteraan met de hand genummerd en gedateerd."
- Verhaalkaartje: "10 × 15 cm, tweezijdig. Voorkant: de plaats. Achterkant: de kunstenaar, de techniek en waar we het vandaan hebben."

**Abonnementsuitleg**
> "Je kiest een termijn en wij sturen elke maand een envelop. Bestellen kan tot de 20e; wat er dan besteld is, drukken we. Verzending rond de 28e. Opzeggen kan altijd vóór de 20e, zonder uitleg en zonder telefoontje."

**Knoppen** — kort, zonder uitroeptekens: `Abonneren`, `Deze editie los kopen`, `Bekijk de editie`, `Cadeau geven`, `Adres bewaren`, `Abonnement stopzetten`.

**Foutmeldingen** — zeg wat er mis is en wat te doen:
- "Deze kaart is geweigerd door de bank. Probeer een andere kaart of Bancontact."
- "We hebben geen huisnummer gevonden in dit adres. Vul het aan, dan komt de envelop aan."
- "Deze editie is uitverkocht. We herdrukken niet — maar je kunt vanaf de volgende maand instappen."

**Bevestigingsmail (na bestelling)**
> Onderwerp: *Je staat op de lijst voor BAL-03 · Mostar*
>
> "Bedankt. Je editie van maart wordt rond 24 maart gedrukt en genummerd, en gaat rond de 28e op de post. Je krijgt geen trackingnummer — het gaat als gewone post, in een envelop die door je brievenbus past.
>
> Je nummer weten we pas als we drukken. Dat staat achteraan op je print.
>
> Als er iets beschadigd aankomt: stuur ons een foto en we sturen een nieuw exemplaar, zonder discussie."

**Verpakkingskaartje (in de envelop, achterzijde)**
> "PASSPRINT · BAL-03 · MOSTAR · 03.2026 · oplage 180
> Gedrukt in [stad] op 300 g ongestreken papier. Genummerd met de hand.
> Verhaal: [naam]. Nagelezen door [naam], geboren in Mostar.
> Bewaar hem uit direct zonlicht — de inkt is licht, het papier niet."

**Bedanktekst van de kunstenaar (sjabloon, door de kunstenaar zelf in te vullen, handgeschreven)**
> "Dit is de straat achter de brug. Mijn grootmoeder had daar een winkel. Bedankt dat je hem in huis hebt gehaald. — Amina"

**Stemtekst**
> "Waar gaan we volgend jaar heen? Je kunt kiezen uit drie regio's die we kunnen maken — dat wil zeggen: waar we kunstenaars en meelezers voor hebben. Eén stem per e-mailadres. De uitslag is bindend, niet adviserend."

**Cadeaupagina**
> "Een cadeau-abonnement loopt af. Er wordt niets automatisch verlengd en de ontvanger krijgt nooit een rekening. Bestel je vóór 15 december, dan is de eerste envelop er voor de feestdagen; bestel je later, dan sturen we een kaartje dat je zelf kunt geven en begint de reeks in januari."

# 15. Abonnements- en productstructuur

## Kostenstructuur — je moet dit eerst weten

Hier zijn realistische ranges voor een oplage van 100 tot 250 exemplaren in België. **Aanname: alle bedragen hieronder zijn schattingen op basis van gangbare tarieven en moeten vervangen worden door drie echte offertes voor je één prijs publiceert.**

| Post | Range per envelop |
|---|---|
| Grote print A4, 300 g, digitaal/giclée, oplage 100–250 | € 1,20 – 2,80 |
| Kleine print A6, zelfde papier | € 0,25 – 0,60 |
| Verhaalkaartje 10 × 15, tweezijdig | € 0,20 – 0,45 |
| Envelop C5 stevig, gekleurd | € 0,25 – 0,70 |
| Stempelinkt, sticker, zegel, kartonnen stijfsel | € 0,20 – 0,50 |
| Kunstenaarsvergoeding (per abonnee, bij 150 abonnees en € 400–800 per editie) | € 2,70 – 5,30 |
| Porto België, brievenbuspost tot 2 cm | € 1,80 – 3,00 |
| Porto Nederland en EU | € 4,00 – 8,00 |
| Betaalkosten (± 2,5 % + € 0,25) | € 0,80 – 1,10 |
| Verlies, herzendingen, retour (± 4 %) | € 0,40 – 0,80 |

**Indicatieve totale kostprijs per envelop: ± € 8 – 13 in België, ± € 11 – 18 binnen de EU.**

Twee conclusies die je hele model bepalen:

1. **De kunstenaarsvergoeding is je grootste kostenpost, en ze daalt per abonnee naarmate je groeit.** Bij 50 abonnees betaal je € 8 tot 16 per envelop aan kunst; bij 300 abonnees € 1,30 tot 2,70. Dat betekent dat je onder ongeveer 80 tot 120 abonnees structureel verlies draait tegen elke redelijke prijs. Plan daar op: hetzij een lagere vergoeding voor de eerste edities met een royaltyclausule bij de collector's box, hetzij eigen werk in de eerste maanden, hetzij een hogere lanceringsprijs voor Founding Members.
2. **De maximale afmeting bepaalt je porto.** Een envelop die door de brievenbus past en onder de gewichtsgrens blijft, is twee tot vier keer goedkoper dan een pakje of een koker. Ontwerp daar naartoe: **grote print op A4, plat, in C5 of C4, met een kartonnen stijfsel** — geen A3, geen koker. Dat is geen esthetisch compromis; het is de reden dat het model kan werken.

## Prijsscenario's

Drie scenario's, geen aanbeveling zonder je echte cijfers.

**Scenario 1 — toegankelijk (€ 17 – 19 per maand).** Mikt op volume en cadeaukopers. Werkt alleen boven ± 200 abonnees en met een lage kunstenaarsvergoeding. Risico: je verkoopt op prijs, en dan concurreer je met posterwinkels.

**Scenario 2 — juiste positionering (€ 22 – 26 per maand, verzending inbegrepen in BE/NL).** Mijn voorkeur. Dit is genoeg om de kwaliteit waar te maken en laag genoeg voor een cadeau. Op deze hoogte kun je 300 g papier, een echte kunstenaarsvergoeding en een gestempelde envelop verantwoorden zonder verlies vanaf ± 120 abonnees.

**Scenario 3 — kleine oplage, hoge waarde (€ 32 – 39 per maand, oplage 60 – 100).** Positioneert PassPrint als kleine kunstuitgeverij. Hogere marge per klant, veel kleiner publiek, en het vraagt een sterk portfolio dat je in maand één nog niet hebt. Bewaar dit als optie voor collectie twee.

**Wat je moet weten om te kiezen:** de drukprijs bij drie drukkers voor oplage 100/200/400; de exacte portoklasse bij bpost voor jouw envelop met inhoud, gewogen; de kunstenaarsvergoeding die je kunt afspreken; en of je verzending inbegrepen wil hebben in de prijs (ja — verborgen verzendkosten in de checkout zijn de grootste conversiekiller die er is).

## Aanbevolen productstructuur

**Drie abonnementen, meer niet:**

| Product | Betaling | Positie |
|---|---|---|
| **Maandelijks** | elke maand, opzegbaar vóór de 20e | volle prijs — bewust de duurste per maand |
| **Zes maanden** | één keer vooraf | ± 10 % voordeliger — het standaardaanbod |
| **Twaalf maanden** | één keer vooraf | ± 15 % voordeliger, met Founding-print en bewaarmap |

Waarom prepaid het zwaartepunt is: je krijgt cash vóór je drukt, je oplage staat vast vóór de productie, je churn is nul binnen de termijn, en je klant heeft een reden om de reeks af te maken. De maandoptie behoud je alleen als instap voor twijfelaars — je maakt hem bewust minder aantrekkelijk, en dat is eerlijk, want hij is voor jou ook duurder.

**Losse producten (v1):** de lopende editie los kopen. Dat is alles. Restanten van vorige edities komen in v2 in de winkel — en pas als er restanten zijn.

**Later (v2/v3):** collector's box per collectie, bewaarmap, het verhalenboekje, kunstenaarseditie op groot formaat, en een digitale aanvulling.

**Cadeau:** dezelfde drie termijnen, maar zonder verlenging. Aparte afreken- en leveringsstroom, met een startdatum die de gever kiest.

## Operationele regels

- **Sluitdatum de 20e, druk rond de 24e, verzending rond de 28e.** Één cyclus per maand, geen uitzonderingen. Nieuwe leden na de 20e starten met de volgende editie — communiceer dat vóór de betaling, niet erna.
- **Pauzeren:** één maand, maximaal twee keer per jaar. Simpel te implementeren en het redt abonnees die anders opzeggen.
- **Opzeggen:** één knop in het account, geen mail, geen retentievraag. Wettelijk moet dit in België sowieso even makkelijk kunnen als abonneren; maak er geen gevecht van, want je publiek praat met elkaar.
- **Mislukte betaling:** drie automatische herpogingen over acht dagen, met mail. Na de derde: abonnement gepauzeerd, niet geannuleerd, en één persoonlijke mail. Dat laatste redt in de praktijk een aanzienlijk deel.
- **Adreswijziging:** zelf aanpasbaar tot de 20e; daarna neemt de klant contact op.
- **Schade:** één foto, nieuw exemplaar, geen retour. Reken op 2 tot 4 %; dat is goedkoper dan het alternatief.
- **Internationale verzending:** start met BE en NL (verzending inbegrepen), voeg DE, FR en LU toe met een toeslag zodra de verpakking bewezen is, en de rest van de EU daarna. Buiten de EU pas als er vraag is — douane op kunstprints is beheersbaar maar niet gratis in tijd.

# 16. Technische architectuuropties

## Optie 1 — Shopify met een volledig zelfgebouwd theme

**Wat het is.** Shopify als backend (producten, checkout, btw, verzendlabels, klantaccounts, abonnementen via de gratis Shopify Subscriptions-app), en een van nul geschreven theme in Liquid met eigen CSS en een minimum aan JavaScript. Geen gekocht theme, geen page builder.

**Voordelen.** Betaling, btw en OSS-aangifte, facturatie, adresvalidatie, verzendlabels, dunning bij mislukte betalingen, herroepingsstroom, boekhoudkoppelingen en fraudebescherming zijn opgelost — dat is minstens twee maanden werk die je niet doet. Abonnementen werken met Shopify Payments zonder extra maandkosten. Klantenaccount, pauzeren en opzeggen zitten erin.

**Nadelen.** Maandelijkse kosten (± € 30 – 90 afhankelijk van plan) plus transactiekosten. Liquid is beperkter dan React. Het datamodel is productgericht, dus redactionele inhoud (verhalen, kunstenaars, plaatsen) is er niet elegant in te modelleren — je hebt metaobjecten of een apart CMS nodig. Meertaligheid via Markets is werkbaar maar niet fijn.

**Kosten.** ± € 400 – 1 100 per jaar plus 1,5 – 2,5 % transactiekosten.
**Moeilijkheid.** Laag tot middel. **Onderhoud.** Laag. **Snelheid.** Zeer goed mits je geen apps stapelt. **3D.** Mogelijk maar onhandig. **Meertaligheid.** Redelijk. **Accounts.** Ingebouwd. **Kleine start.** Uitstekend. **Internationale groei.** Uitstekend.

## Optie 2 — Volledig custom: Next.js + Sanity + Stripe Billing

**Wat het is.** Next.js (App Router) op Vercel, Sanity als CMS voor collecties, edities, plaatsen, kunstenaars en verhalen, Stripe Billing voor abonnementen, Auth.js of Clerk voor accounts, en een eigen orderadministratie.

**Voordelen.** Volledige controle over elk pixel en elke URL. Uitstekend datamodel voor het redactionele deel, wat bij PassPrint de helft van het product is. Beste SEO-controle. Beste performance. 3D en animatie zonder beperkingen. Meertaligheid netjes op te lossen.

**Nadelen.** Jij bouwt en onderhoudt: btw-berekening per land en OSS-drempels, factuurnummering, adresvalidatie, verzendlabels, retour- en herroepingsstroom, dunning, cadeau-abonnementen met uitgestelde start, pauzeren, prorata bij wijziging, en klantenservice-tooling. Dat is niet moeilijk maar wel véél, en fouten hierin zijn duur en juridisch relevant.

**Kosten.** ± € 0 – 40 per maand aan hosting en CMS bij lage volumes, plus Stripe 1,5 % + € 0,25, maar veel meer tijd.
**Moeilijkheid.** Hoog. **Onderhoud.** Middel tot hoog. **Snelheid.** Uitstekend. **3D.** Uitstekend. **Meertaligheid.** Uitstekend. **Kleine start.** Matig. **Internationale groei.** Goed, mits je de fiscale kant serieus neemt.

## Optie 3 — Headless: Next.js frontend op Shopify

**Wat het is.** Next.js voor alles wat de bezoeker ziet, Shopify Storefront API voor producten en winkelmandje, Shopify checkout voor betaling, Sanity voor de redactionele inhoud.

**Voordelen.** Design- en performancevrijheid van optie 2 met de operationele rust van optie 1.

**Nadelen.** Twee systemen om te onderhouden, twee plekken waar inhoud staat, en abonnementen headless afhandelen is het lastigste onderdeel — de meeste abonnementsoplossingen willen je terug naar de standaard checkout. Voor een merk met nul klanten is dit te veel machinerie.

**Kosten en moeilijkheid.** Hoogste van de drie in de opstartfase, laagste risico op lange termijn.

# 17. Aanbevolen technische stack

**Voor de MVP: optie 1 — Shopify met een volledig zelfgebouwd theme.**

Dit is waarschijnlijk niet het antwoord dat je verwachtte, en het is niet het antwoord dat het leukst is om te bouwen. Toch is het het juiste, om drie redenen.

**Ten eerste: het echte werk zit niet in de site.** Als je twaalf edities per jaar moet cureren, teksten schrijven, drukwerk aansturen, met de hand nummeren, verpakken, versturen en klantvragen beantwoorden, dan is elk uur dat je aan btw-logica of dunning-mails besteedt een uur dat niet naar het product gaat. Shopify neemt exact die uren over.

**Ten tweede: het design is niet het probleem dat Shopify veroorzaakt.** Een van nul geschreven Liquid-theme geeft je volledige controle over markup en CSS. Alles wat er in §8 en §10 staat — het typografische systeem, de envelop-hero, de archieftabel, de SVG-kaart — bouw je even goed in Liquid als in React. Wat een site op Shopify laat lijken, zijn gekochte themes en gestapelde apps, niet het platform.

**Ten derde: het is de veiligste weg naar optie 3.** Als PassPrint werkt, zet je er later een Next.js-frontend op met de Storefront API en verhuis je het redactionele deel naar Sanity, terwijl Shopify de commerce blijft doen. Je gooit dan je merk, je content en je klantenbestand niet weg — alleen je theme. Beginnen met optie 2 en later beseffen dat je een boekhoudsysteem hebt gebouwd, is de duurdere fout.

**Concreet voor v1:**

| Onderdeel | Keuze |
|---|---|
| Platform | Shopify Basic |
| Theme | Zelf geschreven, gestart vanaf een leeg skelet, geen page builder |
| Abonnementen | Shopify Subscriptions (gratis, vereist Shopify Payments) |
| Betaalmethodes | Bancontact, kaarten, iDEAL, Apple/Google Pay, PayPal |
| Redactionele inhoud | Shopify metaobjecten voor editie, plaats, kunstenaar en verhaal |
| Beeld | Shopify CDN, AVIF en WebP, `srcset` |
| Analytics | Plausible of Fathom (cookieloos, scheelt je een cookiebanner) |
| E-mail | Shopify Email voor transactioneel, MailerLite of Klaviyo voor de nieuwsbrief |
| Verzending | Sendcloud of rechtstreeks bpost |
| Apps | Zo weinig mogelijk. Elke app is laadtijd, geld en een afhankelijkheid |

**Als je toch per se custom wil bouwen** — en dat is een legitieme keuze als je dit ook als leerproject ziet — dan is de juiste vorm: Next.js App Router + Sanity + Stripe Billing + Vercel, met Stripe Tax aan (dat lost het btw-probleem grotendeels op) en Stripe Customer Portal voor pauzeren en opzeggen (dat lost het accountprobleem grotendeels op). Reken dan op zes tot tien weken voor je live kunt, tegen twee tot vier weken bij optie 1. Bouw in dat geval je datamodel exact zoals in §18, want dat is het deel dat je niet wil overdoen.

# 18. CMS- en datamodel

Dit model geldt voor beide stacks — als metaobjecten in Shopify of als schema's in Sanity.

## Entiteiten

**Collection** — één regio, twaalf edities.
`slug`, `titel` (De Balkan), `ondertitel`, `accentkleur`, `startmaand`, `eindmaand`, `status` (aangekondigd / lopend / afgesloten), `intro` (lang), `kaart` (SVG-referentie), `boxProduct` (verwijzing).

**Edition** — één maand. Het hart van het model.
`code` (`BAL-03`), `collection` (→ Collection), `maand`, `jaar`, `place` (→ Place), `artist` (→ Artist), `artworkLarge` (→ Artwork), `artworkSmall` (→ Artwork), `story` (→ Story), `oplage` (getal), `sluitdatum`, `drukdatum`, `verzenddatum`, `status` (gepland / open / gesloten / verzonden / uitverkocht), `product` (→ Product, voor losse verkoop), `beeldPakket` (foto's van de envelop en de onderdelen), `makingOf` (video, optioneel), `beschikbaarLos` (ja/nee).

**Place** — een plaats, geen land.
`naam` (lokale spelling), `naamAlternatief` (andere spellingen, belangrijk voor zoekverkeer), `land` (alleen ter oriëntatie), `coordinaten` (lat/lon), `korteBeschrijving`, `regio`.

**Artist**
`naam`, `slug`, `stad`, `portret`, `bio` (kort en lang), `techniek`, `website`, `socials`, `vergoedingsafspraak` (intern, niet publiek), `contract` (intern).

**Artwork**
`titel`, `formaat` (A4 / A6), `techniek`, `jaar`, `afbeeldingHoog` (voor druk, intern), `afbeeldingWeb`, `detailUitsnede` (voor de zoom op ware grootte), `altTekst` (verplicht veld, redactioneel geschreven).

**Story** — de tekst op het kaartje en op de site.
`titel`, `korteVersie` (kaartje, ± 90 woorden), `langeVersie` (site, 400–700 woorden), `bronnen` (lijst), `meelezer` (naam + herkomst), `taal`, `vertalingen`.

**Product / Variant** — commercieel, leeft in Shopify of Stripe.
Abonnement 1/6/12 maanden, cadeauvarianten, losse editie, collector's box, bewaarmap.

**Member** — klant.
Abonnement, termijn, startmaand, status, adres, taal, ontvangen edities, toegewezen printnummers.

**PassportEntry** (v3) — koppelt Member aan Edition met `printnummer` en `ontvangenOp`. Dit is de enige tabel die het digitale paspoort nodig heeft; alles wat je toont, is een weergave hiervan.

**Vote** (v2) — `regiovoorstel`, `e-mail`, `datum`.

## Relaties

Een `Collection` heeft twaalf `Editions`. Elke `Edition` heeft precies één `Place`, één `Artist`, twee `Artworks` en één `Story`, en verwijst naar één `Product` voor losse verkoop. Een `Artist` kan meerdere `Editions` hebben (in latere collecties). Een `Member` heeft één actief abonnement en veel `PassportEntries`. Een `Place` hoort bij één `Edition` — als je dezelfde plaats ooit opnieuw bezoekt, is dat een nieuwe `Edition` met dezelfde `Place`.

## Waarom dit model belangrijk is

Alles op de site is een weergave van `Edition`: de homepage toont de lopende, het archief toont alle afgesloten, de kaart toont hun `Place`, de SEO-pagina's zijn hun `Story`, en het paspoort is een filter op wat één lid ervan heeft. Eén goed gemodelleerde entiteit levert je vijf paginatypes. Als je één ding zorgvuldig bouwt, is het dit.

**Praktisch:** houd de hoge-resolutiebestanden voor druk buiten het CMS (aparte cloudmap met een strikte naamgeving `BAL-03_MOSTAR_LARGE_300dpi.tif`). CMS-media zijn voor het web.

# 19. Performance- en toegankelijkheidsplan

## Prestatiebudget (dit is een harde grens, geen streefdoel)

| Meting | Grens |
|---|---|
| LCP op 4G-mobiel | < 2,0 s |
| Totaal JavaScript | < 120 KB gecomprimeerd |
| Grootste beeld boven de vouw | < 180 KB |
| Lettertypebestanden | maximaal 4 woff2, samen < 180 KB |
| CLS | < 0,05 |
| INP | < 200 ms |
| Verzoeken op de homepage | < 35 |

## Maatregelen

**Lettertypes.** Subset naar `latin` + `latin-ext` — dat laatste is niet optioneel, want zonder Latin Extended-A krijg je geen č, ć, š, ž of đ, en dan spel je de namen van je eigen edities verkeerd. Als je later Servisch of Macedonisch cyrillisch gebruikt, subset dan een aparte cyrillische variant en laad die alleen op die pagina's. `font-display: swap`, preload alleen het gewicht dat boven de vouw staat, en definieer `size-adjust` in een fallback zodat er geen layoutverschuiving is.

**Beeld.** AVIF met WebP-fallback. Vaste `width` en `height` op elke afbeelding. `loading="lazy"` overal behalve de hero. De hero is in het gekozen ontwerp typografisch, dus je LCP is tekst — dat is de goedkoopste LCP die bestaat en een direct voordeel van richting A. Werken op de editiepagina's krijgen `srcset` met vier breedtes; de detail-uitsnede op ware grootte wordt pas geladen bij interactie.

**Video.** Geen video boven de vouw. Making-of-video's op een aparte pagina, met poster, `preload="none"`, en geen autoplay.

**JavaScript.** In v1 heb je nodig: de envelopsequentie, het uitklappen van FAQ's, de winkelmandlogica en de zoom. Dat is samen minder dan 30 KB eigen code. Laad de animatiebibliotheek dynamisch en pas na `load`.

**Kaart (v2).** SVG inline in de pagina, niet als `<img>` — dan is hij toetsenbordnavigeerbaar, doorzoekbaar en stylebaar. Optimaliseer met SVGO en beperk het aantal padpunten; een kustlijn heeft geen tienduizend coördinaten nodig.

**Trage verbindingen.** Test op een gesimuleerde "Slow 4G" met CPU-vertraging 4×, niet op je eigen wifi. De site moet zonder JavaScript leesbaar en bestelbaar blijven tot aan de checkout.

**Caching en CDN.** Statische pagina's cachen op de rand, editiepagina's herbouwen bij publicatie. Op Shopify krijg je dit; bouw je custom, gebruik dan ISR met revalidatie bij webhook.

## Toegankelijkheid

**Contrast.** Inkt op papier (`#17171A` op `#F2EFE7`) haalt ruim AAA. Het aandachtspunt is de accentkleur `#A65B33` op papier: die haalt ongeveer 4,4:1 en is dus **niet** geschikt voor kleine tekst. Gebruik hem voor grafische elementen en grote koppen, nooit voor labels van 12 px. Mono-labels in `#6B6A64` op papier halen ± 4,6:1 — gebruik ze minimaal op 14 px met medium gewicht.

**Toetsenbord.** Alles bereikbaar in logische volgorde, met een zichtbare focusring die bij het ontwerp past — een rechthoekig kader van 2 px in inkt, geen standaard blauwe gloed, maar wel altijd zichtbaar. Skip-link bovenaan.

**Screenreaders.** De editiespecificaties zijn een `<dl>`, niet een reeks divs. De archieftabel is een echte `<table>` met `<th>`. De kaart krijgt een tekstueel alternatief: een lijst van plaatsen met datum en status, direct eronder — die lijst is nuttig voor iedereen en is meteen je SEO-inhoud.

**Alt-teksten als redactioneel werk.** Dit past bij het merk: schrijf ze als bijschriften, niet als labels. Niet "afbeelding van Mostar", wel "Zeefdruk van de straat achter de Stari Most, met de winkeltjes langs de rechterkant". Maak `altTekst` een verplicht veld in het CMS.

**Beweging.** `prefers-reduced-motion: reduce` schakelt de stempel, de envelopsequentie en de paginaovergangen volledig uit. Dat is geen degradatie; de site is ontworpen om stil goed te zijn.

**Formulieren.** Labels boven de velden, geen placeholder-als-label, foutmeldingen in tekst naast het veld en gekoppeld met `aria-describedby`, en autocomplete-attributen op adresvelden.

**Mobiel.** Raakdoelen minimaal 44 px, geen hover-afhankelijke informatie (de zoom heeft daarom een knop op mobiel), en tekst minimaal 16 px zodat iOS niet inzoomt bij formuliervelden.

## Kunst en toegankelijkheid samen

De spanning tussen de twee wordt meestal veroorzaakt door lichtgrijze tekst, dunne lettergewichten en animatie. Geen daarvan is nodig voor dit ontwerp. Een archiefsysteem is inherent toegankelijk: hoog contrast, duidelijke hiërarchie, echte tabellen, veel structuur. Dat is nog een reden waarom richting A de juiste keuze is.

# 20. SEO- en marketingplan

## Eerst de eerlijke verwachting

SEO levert je de eerste zes tot twaalf maanden vrijwel geen klanten op. Nieuwe domeinen ranken traag, en "kunstabonnement" is commercieel bezet. Je eerste 100 klanten komen uit gemeenschappen, mond-tot-mond en Instagram. Bouw SEO daarom op als een bezit voor jaar twee, niet als lanceerkanaal — maar bouw het wel vanaf dag één correct, want de editiepagina's die je nu schrijft, zijn precies wat later gaat ranken.

## Waar het verkeer vandaan komt

**Wat kan ranken (informatief, lange staart, weinig concurrentie):** je verhaalpagina's. "Stari Most Mostar geschiedenis", "Novi Pazar Altun-Alem moskee", "waarom de daken van Kotor rood zijn", "houten huizen Sarajevo Baščaršija". Dit zijn onderwerpen waar Nederlandstalige inhoud van kwaliteit nauwelijks bestaat. Elke editie levert je één zo'n pagina — twaalf per jaar, gratis, want je schrijft ze toch al voor het kaartje.

**Wat commercieel is (moeilijk, maar het geld):** "kunstabonnement cadeau", "origineel cadeau kunstliefhebber", "gelimiteerde kunstprints kopen", "art print subscription", "collectible art prints Europe".

**Wat je moet vermijden:** "posters Balkan", "Sarajevo poster kopen". Dat is precies het toeristische segment waar je niet in wil staan, en je verliest daar sowieso van marktplaatsen.

**Praktisch.** Eén URL-structuur, vanaf het begin: `/editie/bal-03-mostar`. Hreflang tussen `nl` en `en` vanaf dag één. Gestructureerde data: `Product` en `Offer` op editiepagina's, `Article` op verhaalpagina's, `Organization` en `Person` voor kunstenaars. Schrijf de meta-omschrijvingen zelf; de eerste zin van je verhaal is meestal beter dan wat een plugin genereert. Zorg dat alternatieve spellingen (Mostar/Мостар, Kotor/Cattaro, Novi Pazar) in de tekst voorkomen.

## Marketing

**Instagram** is je hoofdkanaal, maar niet als merkaccount met mooie plaatjes. Wat werkt bij dit product: het proces. De proefdruk die niet klopt, de stempel die scheef staat, honderd enveloppen op een tafel, de kunstenaar die tekent, de hand die nummert. Post het werk groot, en de rest rauw.

**Pinterest** wordt vaak vergeten en is voor kunstprints uitzonderlijk effectief, met een lange staart die maanden blijft leveren. Elk werk als verticale pin, met de plaats in de titel.

**TikTok** alleen als jij het leuk vindt om te maken. Het onderwerp werkt daar wel (unboxing, ambacht, "plaatsen die je niet kent"), maar het is een baan op zich.

**Balkan-gemeenschappen — je belangrijkste kanaal en tegelijk het gevoeligste.** Verenigingen, culturele centra en moskeeën/kerken in Antwerpen, Brussel, Genk, Gent en Rotterdam; Facebookgroepen per stad van herkomst; diaspora-podcasts en -media. Ga daar niet binnen als adverteerder maar met een concreet aanbod: de eerste editie gratis voor de vereniging, een print voor hun tombola, een gesprek met iemand die de plaats kent. Deze groepen delen enorm, maar alleen wat authentiek voelt.

**Fysiek.** Eén goede pop-up is meer waard dan drie maanden advertenties: een tafeltje op een designmarkt, een boekhandel of een museumshop in Antwerpen, met echte prints die mensen kunnen aanraken. Dit product verkoopt zichzelf in de hand en slecht op een scherm — gebruik dat.

**Samenwerkingen.** Onafhankelijke boekhandels, koffiezaken met kunstwanden, kleine galerieën, museumshops (het Red Star Line Museum in Antwerpen is thematisch bijna te toepasselijk voor een merk over migratie en post — de moeite van een mail waard).

**E-mail.** Vanaf dag één een lijst opbouwen, ook zonder site: één pagina met de belofte en een veld. Eén mail per maand, met het werk van die maand en het verhaal. Dit wordt op termijn je meest winstgevende kanaal.

**Pers.** Lokale en culturele media zijn realistisch bereikbaar voor dit verhaal (Bruzz, regionale kranten, designblogs, diasporamedia). Het aanknopingspunt is niet "nieuwe webshop" maar "iemand uit Antwerpen laat kunstenaars uit de Balkan hun eigen steden tekenen". Dat is een verhaal; een abonnement is dat niet.

**Advertenties.** Niet vóór klant 100. Daarna alleen retargeting en Pinterest, met een klein budget.

## Lanceerplan in drie stappen

**De eerste 25 — "Founding Members".** Geen site nodig, alleen een wachtlijstpagina en echte foto's van een echte proefdruk. Verkoop deze 25 persoonlijk: familie, vrienden, klasgenoten, één vereniging, één markt. Aanbod: twaalf maanden vooruitbetaald, nummers 001 tot 025, een aparte Founding-stempel op elke envelop en hun naam in het colofon van het collectieboekje. Dit geld financiert je eerste druk. **Dit is de belangrijkste stap in het hele plan** — 25 vooruitbetaalde jaarabonnementen tegen scenario 2 is voldoende startkapitaal voor drie tot vier edities.

**De eerste 100.** Site live, twee tot drie edities verschenen, echte foto's van echte pakketten. Nu draait het om bewijs: unboxings van bestaande leden, de kunstenaars in beeld, en gerichte aanwezigheid in twee of drie diasporagemeenschappen. Verwijzingsactie: wie iemand aanbrengt, krijgt een extra kleine print (geen korting — korting verlaagt de waargenomen waarde van een gelimiteerd product).

**De eerste 500.** Engels volledig live, verzending naar de EU, cadeaucampagne in november en december (dit wordt je grootste maand), de eerste collector's box van de afgesloten collectie, en pers. Nu pas advertenties, nu pas het digitale paspoort, nu pas de kaart.

## Starten zonder honderden pakketten

Druk op bestelling, niet op voorraad. Sluitdatum de 20e, je weet dan exact hoeveel abonnees je hebt, je drukt dat aantal plus 15 tot 20 % voor losse verkoop, schade en pers. Je oplage is dus per definitie klein en dat is geen beperking maar je verkoopargument. Vraag bij drie drukkers een prijs voor 50, 100, 200 en 400 exemplaren — het verschil tussen 50 en 200 zal je verrassen en bepaalt of je minimum abonneeaantal haalbaar is.

# 21. MVP, versie 2 en langetermijnversie

## MVP — wat je nodig hebt om te verkopen

**Product:** één afgewerkte editie die je fysiek in handen hebt (proefdruk, envelop, kaartje, stempel, nummering). Drie edities gepland en met kunstenaars vastgelegd.
**Site:** de twaalf pagina's uit §9, Nederlands en Engels, drie abonnementen, één losse editie, cadeau-optie.
**Techniek:** Shopify Basic, eigen theme, Shopify Subscriptions, Bancontact en kaarten.
**Beeld:** één fotoshoot volgens de shotlist in §24.
**Niet in de MVP:** archief, kaart, stemmen, journal, paspoort, winkel, collector's box, kunstenaarsdetailpagina's, Frans, Duits, verzending buiten BE en NL.

## Versie 2 — na 100 leden, ongeveer maand 4 tot 8

Archief met alle verschenen edities (je SEO-motor), editiepagina's als volwaardige verhaalpagina's, kunstenaarsdetailpagina's, de cartografische kaart, de stemmodule met drie voorbereide regio's, losse verkoop van restanten, EU-verzending, en pauzeren in het account.

## Lange termijn — vanaf maand 12

Digitaal paspoort (verzamelde edities, printnummers, stempels per voltooide collectie, ontbrekende edities aanvullen), collector's box en bewaarmap voor de afgesloten collectie, het verhalenboekje, Frans en Duits, meerdere lopende collecties naast elkaar zodat een lid kan kiezen welke route hij volgt, en eventueel een tweede kunstenaarslijn met grotere, duurdere edities.

**Over het paspoort, concreet.** Houd het sober en functioneel: een tabel met de edities die je hebt, je printnummers, welke collectie compleet is, en één gestempeld zegel per voltooide collectie. Geen punten, geen niveaus, geen voortgangsbalken met percentages. De waarde zit in "ik heb 037/180 van Mostar", niet in een badge. Voeg één ding toe dat echt nuttig is: de ontbrekende edities uit collecties die je niet volledig hebt, direct bij te bestellen zolang de voorraad strekt. Dat is meteen een omzetkanaal.

# 22. Risicoanalyse

| Risico | Kans | Impact | Preventie | Noodplan |
|---|---|---|---|---|
| Kunstenaar levert te laat of niet | Hoog | Hoog | Contract met leverdatum zes weken vóór verzending; altijd twee edities vooruit klaar | Reserve-editie in de la (eigen werk of gekocht werk), of één maand opschuiven met eerlijke mail en een extra kleine print als excuus |
| Te weinig abonnees (< 80) | Hoog | Hoog | Founding-verkoop vóór productie; niet drukken zonder betaalde bestellingen | Oplage verkleinen, kunstenaarsvergoeding tijdelijk deels in royalty, collectie verlengen naar zes edities in plaats van twaalf |
| Marge klopt niet (porto of druk hoger dan gedacht) | Middel | Hoog | Drie offertes en een gewogen testzending vóór de prijs vastligt | Formaat verkleinen (A4 → A5), kleine print schrappen, prijs verhogen bij volgende collectie (nooit tijdens een lopende termijn) |
| Churn na maand drie | Hoog | Middel | Zwaartepunt op 6 en 12 maanden prepaid; verhaalboog met een sterke maand 4 en 5 | Pauzefunctie, terugwinmail met de editie die ze missen, losse verkoop als vangnet |
| Beschadigde zendingen | Middel | Middel | Kartonnen stijfsel, stevige envelop, testzendingen naar vijf adressen vóór de lancering | Direct herzenden zonder discussie; bij > 5 % van verpakking wisselen |
| Culturele misstap | Laag | Zeer hoog | Meelezer per editie die uit de plaats komt; geen grenzen op kaarten; bronvermelding; nooit landen als thema | Snel, publiek en zonder verdediging corrigeren; de tekst aanpassen en de meelezer vermelden |
| Site oogt generiek of AI-gemaakt | Middel | Middel | De regels uit §8; geen gekochte templates; echte foto's | Herontwerp van de homepage kost bij dit systeem één week, niet een maand — daarom is het typografische systeem robuust |
| Technische overbouw | Middel | Middel | MVP-lijst in §21 hard aanhouden | Functies schrappen, niet uitstellen |
| Afhankelijkheid van één kunstenaar | Middel | Hoog | Minimaal vier verschillende kunstenaars in de eerste collectie | Eigen werk of archiefmateriaal met licentie |
| Klanten wachten op de volledige collectie | Middel | Middel | Oplage per editie beperken en dat waarmaken: wie wacht, mist edities | Collector's box duurder maken dan de som van de abonnementen — dat is eerlijk en het beloont wie meeging |
| Auteursrecht en licenties onduidelijk | Middel | Hoog | Schriftelijk contract per editie vóór de druk (zie §25) | Editie terugtrekken; nooit doorverkopen zonder recht |
| Jij valt uit (ziekte, examens, drukte) | Middel | Hoog | Altijd twee edities vooraf klaar; verzending kan door iemand anders gedaan worden als alles gelabeld is | Eén maand opschuiven met eerlijke communicatie; abonnees verlengen automatisch met een maand |
| Te veel producten en varianten | Middel | Laag | Drie abonnementen, één los product. Punt | Snoeien |

# 23. Volledige projectroadmap

**Fase 0 — Fundering (week 1–2).** Doel: weten of het model rekenkundig werkt. Taken: drie drukofferten, envelop- en portotest met echt gewicht, naam- en domeincheck, gesprekken met drie kunstenaars. Beslissingen: formaat, papier, oplagebeleid, prijsscenario. Output: één ingevuld kostenoverzicht. Ga pas verder als de marge per envelop positief is bij 100 abonnees. Risico: dat je dit overslaat omdat ontwerpen leuker is.

**Fase 1 — Product (week 3–5).** Doel: één echte editie in handen. Taken: eerste kunstenaar contracteren, editie 1 (Mostar of Kotor) volledig produceren als proef, stempel laten maken, enveloppen bestellen, verhaal schrijven en laten nalezen. Output: één fysiek exemplaar, gefotografeerd. Dit exemplaar is je hele marketing.

**Fase 2 — Merk (week 4–6, parallel).** Doel: het typografische systeem vastleggen. Taken: woordmerk, stempelmerk, monogram, kleuren, lettertypes, één stijlpagina met alle componenten. Output: een korte merkgids van vier tot zes pagina's. Beslissing: definitieve richting (voorgesteld: A).

**Fase 3 — Wachtlijst en Founding-verkoop (week 5–8).** Doel: 25 vooruitbetaalde leden. Taken: één pagina online, e-maillijst, persoonlijke verkoop, één markt of pop-up. Criterium om verder te gaan: 25 betalende leden of minstens 150 e-mailadressen.

**Fase 4 — UX en ontwerp (week 7–10).** Doel: de site op papier vóór er code is. Taken: wireframes van de twaalf pagina's mobiel-eerst, alle teksten definitief geschreven, componentenlijst. Output: een klikbaar prototype of nette schetsen. Criterium: alle teksten af — bouwen met placeholders is de duurste fout in webdesign.

**Fase 5 — Bouw (week 9–13).** Doel: verkopende site. Taken: Shopify opzetten, theme bouwen, producten en abonnementen configureren, metaobjecten, teksten plaatsen, checkout testen, mails opzetten.

**Fase 6 — Content en fotografie (week 10–12, parallel).** Doel: echt beeld. Taken: shotlist afwerken, alle producten en detailfoto's, portret van de eerste kunstenaar.

**Fase 7 — Testen (week 13–14).** Betalingen met echte kaarten en Bancontact, cadeaustroom, opzeggen, adreswijziging, testzendingen naar vijf adressen, Lighthouse op mobiel, toetsenbordtest, screenreadertest van de bestelstroom.

**Fase 8 — Lancering (week 15).** Persmail, gemeenschappen, e-maillijst, eerste editie voor Founding Members eerst en publiek daarna.

**Fase 9 — Ritme (maand 4–12).** Elke maand dezelfde cyclus. Meten: conversie, churn per maand, kostprijs per envelop, verzendschade, herkomst van verkeer. Versie 2 bouwen tussen de cycli door.

**Fase 10 — Afsluiten van collectie 1 (maand 12–13).** Collector's box, boekje, stemmen over collectie 2, terugblik, en de prijs voor jaar twee herbekijken met echte cijfers.

# 24. Concrete eerstvolgende acties

## De eerste 48 uur

1. Controleer `passprint.com`, `.be` en `.eu` en de Instagram-handle. Registreer wat vrij is — dat kost minder dan twintig euro en is onomkeerbaar als je te laat bent.
2. Doe een merkencheck in de EUIPO-databank op "PassPrint" en op "Pass Print".
3. Bepaal het formaat: A4 grote print, A6 kleine print, C5 of C4 envelop, plat. Weeg een dummy (papier, karton, kaartje) op een keukenweegschaal en zoek de exacte portoklasse en dikteregel op bij bpost.
4. Maak een lijst van twaalf plaatsen voor de Balkan-collectie, in de volgorde waarin ze verschijnen. Denk aan de boog: begin sterk en herkenbaar, eindig verrassend.
5. Schrijf de namen op van drie kunstenaars die je zou willen vragen, en van drie mensen die als meelezer kunnen dienen.

## De eerste week

6. Vraag bij drie drukkers een offerte voor 50/100/200/400 exemplaren, A4 en A6, 300 g ongestreken mat, digitaal en zeefdruk of giclée ter vergelijking.
7. Vul het kostenoverzicht in met echte getallen en kies je prijsscenario.
8. Benader de eerste kunstenaar. Bespreek meteen: vergoeding, leverdatum, oplage, wat jij mag met het werk en wat niet, en of ze bereid zijn een korte handgeschreven notitie te doen.
9. Zet één wachtlijstpagina online. Eén scherm, één belofte, één e-mailveld. Dit hoeft geen mooie site te zijn.
10. Vraag prijs voor een rubberen stempel met verwisselbare tekst en voor 250 gekleurde enveloppen.

## De eerste maand

11. Produceer editie 1 volledig, ook al is er geen enkele klant. Eén envelop die je in je hand kunt houden verandert elk gesprek dat je daarna voert.
12. Fotografeer die editie goed (zie shotlist hieronder).
13. Verkoop de eerste 25 Founding-plaatsen persoonlijk.
14. Leg editie 2 en 3 vast met kunstenaars en leverdata.
15. Kies definitief het platform en start de bouw.

## Vóór het eerste ontwerp

Formaat en papier vast · prijsscenario gekozen · twaalf plaatsen in volgorde · eerste kunstenaar bevestigd · foto's van de echte editie beschikbaar · alle homepageteksten geschreven.

## Vóór de eerste regel websitecode

Alle teksten af · merkgids af (kleuren, lettertypes, logo) · fotomateriaal klaar · sitemap bevroren op de twaalf pagina's · beslist welke functies níét in v1 zitten, zwart op wit.

## Vóór de eerste pre-order

Voorwaarden, privacybeleid en herroepingsbeleid nagelezen · betaalmethodes getest met een echte betaling · verzendtarieven en -termijnen zwart op wit · schadeprocedure geformuleerd · duidelijkheid over wanneer de eerste envelop vertrekt.

## Vóór de eerste verzending

Vijf testzendingen aangekomen en beoordeeld op schade · nummering en registratie van printnummers per klant geregeld (een eenvoudig rekenblad volstaat) · retour- en herzendprocedure klaar · verzendlabels en adressenexport werkend · en één laatste keer een dummy gewogen mét inhoud.

## Shotlist eerste fotoshoot

*Product, recht van boven, hard licht, papieren ondergrond:* alle onderdelen naast elkaar uitgestald · de gesloten envelop met stempel · de envelop half open met de print die eruit komt · de grote print alleen · de kleine print alleen · het verhaalkaartje voor- en achterkant.
*Detail, macro:* het handgeschreven nummer op de achterkant · de stempelinkt op de envelop · de papierrand op ooghoogte (dit toont dikte, en dikte is je prijsargument) · het rasterdetail van de druk.
*Menselijk:* handen die de envelop openen · handen die nummeren · de kunstenaar aan het werk · portret van de kunstenaar in zijn of haar ruimte.
*In context:* de print aan een muur in een echt interieur · drie maanden naast elkaar aan een muur · de envelop op een keukentafel bij post · een stapel enveloppen klaar voor verzending.
*Voor later:* dezelfde opstelling met de envelopkleur van maand 2 en 3, zodat je variatie kunt tonen.

Vermijd mock-ups. Bij dit merk is één eerlijke foto van een licht gekreukte envelop op een echte tafel meer waard dan tien perfecte 3D-renders — en het publiek ziet het verschil onmiddellijk.

# 25. Openstaande vragen en aanbevolen standaardkeuzes

Dit zijn de beslissingen die ik niet voor je kan nemen. Bij elke vraag staat wat ik zou kiezen als je vandaag moet beslissen.

| # | Vraag | Aanbevolen standaardkeuze |
|---|---|---|
| 1 | Wie maakt de kunst? | Vier tot zes kunstenaars voor twaalf edities, elk twee of drie maanden. Genoeg variatie, beheersbare curatie, minder afhankelijkheid |
| 2 | Wat is het budget voor de eerste drie maanden? | Streef ernaar dat de Founding-verkoop de eerste druk financiert; kom niet met eigen geld verder dan één editie vooruit |
| 3 | Hoeveel tijd heb je per week? | Onder tien uur per week is een maandelijkse cyclus niet vol te houden; overweeg dan tweemaandelijks (zes edities per jaar) |
| 4 | Origineel werk of reproductie van bestaand werk? | Bestaand werk in licentie voor de eerste edities (sneller, goedkoper), origineel werk in opdracht vanaf editie 4 |
| 5 | Grote print A4 of A3? | A4. Het porto beslist dit, niet de esthetiek |
| 6 | Verzending inbegrepen? | Ja voor BE en NL, toeslag daarbuiten. Verborgen kosten in de checkout kosten je meer dan de porto |
| 7 | Prijspunt? | Scenario 2 (€ 22 – 26), pas aan zodra je echte drukprijzen hebt |
| 8 | Talen bij lancering? | Nederlands en Engels. Frans en Duits pas bij EU-verzending |
| 9 | Shopify of custom? | Shopify met eigen theme, tenzij je dit bewust ook als leerproject wil — dan Next.js + Sanity + Stripe |
| 10 | Naam van de collectie? | Niet "The Balkans Collection" maar iets dat de reis benoemt in plaats van de regio, bijvoorbeeld *Collectie I — Van de kust naar de bergen*, met de Balkan als ondertitel. Dat vermijdt het label "Balkan" als eenheid en werkt beter voor collectie 2 |
| 11 | Ben je bereid je naam en gezicht op de site te zetten? | Ja. Bij dit merk is anonimiteit een conversieprobleem |
| 12 | Wat gebeurt er met onverkochte exemplaren? | Bewaren voor losse verkoop tot de collectie afloopt, daarna in de collector's box of vernietigen — en zeg vooraf welke van de twee, want dat bepaalt of "gelimiteerd" geloofwaardig is |

## Juridisch en operationeel — wat professioneel nagekeken moet worden

Ik geef hier geen juridisch advies; dit is een lijst om mee naar een boekhouder of jurist te stappen.

- **Ondernemingsvorm en btw-registratie in België**, en de vraag of je onder de kleineondernemingsregeling kunt starten.
- **Btw-tarief op kunstprints.** Dit is niet triviaal: originele grafiek in beperkte oplage, genummerd en gesigneerd door de kunstenaar, kan in bepaalde omstandigheden onder een verlaagd tarief vallen, terwijl gewoon drukwerk dat niet doet. Het verschil is groot genoeg om je prijs te beïnvloeden. Laat dit nakijken vóór je prijst.
- **OSS-regeling** zodra je grensoverschrijdend aan particulieren in de EU verkoopt, en de drempel waarboven dat verplicht wordt.
- **Abonnementenwetgeving en automatische verlenging.** Duidelijke informatie vóór het sluiten, bevestiging na de bestelling, en opzeggen dat even eenvoudig is als bestellen.
- **Herroepingsrecht van 14 dagen**, met de vraag hoe dat zich verhoudt tot een reeds verzonden editie en tot gepersonaliseerde of genummerde exemplaren. Dit moet correct in je voorwaarden staan.
- **Kunstenaarscontract per editie:** vergoeding, oplage, exclusiviteit, gebruik op de site en in reclame, of het werk herdrukt mag worden, wie eigenaar blijft van het origineel, en wat er gebeurt bij de collector's box. Dit is de belangrijkste juridische tekst in het hele project.
- **Afbeeldingen van gebouwen en monumenten.** Panoramavrijheid verschilt per land, en sommige recente bouwwerken zijn auteursrechtelijk beschermd. Bij historische architectuur is dit meestal geen probleem, maar controleer het per editie.
- **GDPR:** verwerkingsregister, privacybeleid, bewaartermijnen, verwerkersovereenkomsten met Shopify, je e-mailtool en je verzenddienst.
- **Cookies:** kies een cookieloze analysetool, dan heb je geen banner nodig en scheelt dat je conversie én ergernis.
- **E-mailtoestemming:** dubbele opt-in voor de nieuwsbrief, transactionele mails apart houden.
- **Verzekering en schade** bij internationale zendingen, en douaneformaliteiten buiten de EU.

---

## Tot slot

De site die in dit document beschreven staat, is bewust eenvoudiger dan wat je in je briefing vroeg — geen wereldbol, geen paspoortmodule bij de lancering, twaalf pagina's in plaats van tweeëntwintig. Dat is geen bezuiniging. Het is omdat de kracht van PassPrint in een envelop zit, niet op een scherm, en omdat de site vooral één ding moet doen: geloofwaardig maken dat wat er in die envelop zit, echt zo goed is als je zegt.

Alles wat je later wil toevoegen — het archief, de kaart, het paspoort, de collector's box — is voorzien in het datamodel en de architectuur. Je kunt het bouwen op het moment dat het iets betekent, en dat moment komt pas als er twaalf edities bestaan om te tonen.

De eerstvolgende beslissing is niet visueel maar rekenkundig: wat kost één envelop, en bij hoeveel abonnees klopt dat. Alles hierboven hangt daaraan.
