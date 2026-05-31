export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  readTime: number;
  excerpt: string;
  sections: {
    heading?: string;
    body: string;
    list?: string[];
  }[];
  keywords: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "wat-is-consignatie",
    title: "Wat is consignatie? Zo werkt auto verkopen via JG Mobility",
    date: "2025-04-10",
    category: "Consignatie",
    readTime: 5,
    excerpt:
      "Consignatie is de slimste manier om je auto te verkopen zonder gedoe. JG Mobility regelt alles — jij rijdt gewoon door totdat je auto verkocht is.",
    sections: [
      {
        heading: "Wat betekent consignatie?",
        body: "Consignatie is een verkoopmethode waarbij jij als eigenaar je auto in opdracht geeft aan JG Mobility. Wij verkopen de auto voor je, regelen de bezichtigingen, onderhandelingen en alle administratie. Jij hoeft niets te doen — en je blijft gewoon in je auto rijden totdat hij verkocht is.",
      },
      {
        heading: "Hoe werkt het in de praktijk?",
        body: "Het begint met een gratis taxatie. We kijken samen naar de staat van je auto en bepalen een eerlijke, marktconforme vraagprijs. Daarna verzorgen wij professionele foto's, plaatsen we de auto op de grootste autoplatformen en begeleiden we alle potentiële kopers. Zodra er een koper is, handelen wij de overdracht netjes af.",
        list: [
          "Stap 1: Gratis taxatie en waardebepaling",
          "Stap 2: Professionele fotografie en advertenties",
          "Stap 3: Begeleiding van bezichtigingen",
          "Stap 4: Onderhandelingen en administratie",
          "Stap 5: Overdracht en uitbetaling",
        ],
      },
      {
        heading: "Consignatie vs. zelf verkopen",
        body: "Veel mensen proberen hun auto eerst zelf te verkopen via Marktplaats of Facebook. Dat klinkt aantrekkelijk, maar brengt veel gedoe met zich mee: tientallen berichten beantwoorden, onbekenden over de vloer, onderhandelen en al het papierwerk. Via JG Mobility heb je dat gedoe niet. Wij hebben het netwerk, de kennis en de ervaring om jouw auto snel en voor de beste prijs te verkopen.",
      },
      {
        heading: "Wat kost consignatie?",
        body: "We werken met een transparante commissiestructuur. Je betaalt alleen als je auto daadwerkelijk verkocht is — geen voorschot, geen advertentiekosten. De exacte voorwaarden bespreken we altijd persoonlijk, zodat je precies weet waar je aan toe bent.",
      },
      {
        heading: "Klaar om te starten?",
        body: "Wil je weten wat jouw auto waard is? Neem vrijblijvend contact op voor een gratis taxatie. Wij zijn bereikbaar van maandag tot en met zondag, van 10:00 tot 21:00.",
      },
    ],
    keywords: [
      "auto consignatie Barendrecht",
      "wat is consignatie auto",
      "auto verkopen via consignatie",
      "consignatie JG Mobility",
      "auto verkopen zonder gedoe",
    ],
  },
  {
    slug: "auto-verkopen-barendrecht",
    title: "Auto verkopen in Barendrecht: zo doe je dat slim in 2025",
    date: "2025-04-22",
    category: "Auto verkopen",
    readTime: 4,
    excerpt:
      "Wil je je auto verkopen in Barendrecht of de regio Rotterdam? Ontdek de slimste manieren en hoe JG Mobility je daarbij helpt.",
    sections: [
      {
        heading: "Auto's verkopen in de regio Rotterdam",
        body: "De regio Rotterdam — met steden als Barendrecht, Ridderkerk, Dordrecht en Spijkenisse — is een drukke automarkt. Er zijn veel aanbieders, maar ook veel kopers. Hoe zorg je ervoor dat jouw auto opvalt en snel verkocht wordt voor een goede prijs?",
      },
      {
        heading: "Je opties op een rij",
        body: "Er zijn grofweg drie manieren om je auto te verkopen:",
        list: [
          "Zelf via Marktplaats of Facebook Marketplace — maximale opbrengst mogelijk, maar veel tijd en gedoe",
          "Inruilen bij een dealer — snel en makkelijk, maar vaak ver onder de marktwaarde",
          "Consignatie via JG Mobility — de beste prijs, zonder het gedoe van zelf verkopen",
        ],
      },
      {
        heading: "Waarom JG Mobility de slimste keuze is",
        body: "Bij JG Mobility krijg je het beste van beide werelden. We halen een marktconforme verkoopprijs voor je auto — vergelijkbaar met wat je zelf zou kunnen bereiken — maar zonder dat jij alle moeite hoeft te doen. Geen vreemden over de vloer, geen eindeloos bellen en appen, geen gedoe met koopcontracten.",
      },
      {
        heading: "Snel geld? Direct inkoop is ook mogelijk",
        body: "Heb je geen tijd om te wachten? Dan kopen we je auto ook direct in. We maken dezelfde dag nog een eerlijk bod op basis van de actuele marktwaarde. Snel, transparant en betrouwbaar.",
      },
      {
        heading: "Gratis taxatie in Barendrecht en omgeving",
        body: "Benieuwd wat jouw auto waard is? JG Mobility biedt een gratis en vrijblijvende taxatie aan. We komen ook bij je langs in Rotterdam, Ridderkerk, Dordrecht of omgeving. Neem vandaag nog contact op.",
      },
    ],
    keywords: [
      "auto verkopen Barendrecht",
      "auto verkopen Rotterdam",
      "auto verkopen Ridderkerk",
      "auto verkopen Dordrecht",
      "auto inkoop Barendrecht",
      "auto inkoop Rotterdam",
    ],
  },
  {
    slug: "occasion-kopen-tips",
    title: "Occasion kopen: waar moet je op letten in 2025?",
    date: "2025-05-01",
    category: "Auto kopen",
    readTime: 6,
    excerpt:
      "Een occasion kopen is spannend. Hoe weet je of je een eerlijke prijs betaalt en of de auto in goede staat is? Praktische tips van JG Mobility.",
    sections: [
      {
        heading: "De occasionmarkt in 2025",
        body: "De markt voor gebruikte auto's is de afgelopen jaren flink veranderd. Door hogere prijzen voor nieuwe auto's en lange levertijden is de vraag naar kwalitatieve occasions sterk gestegen. Dat maakt het extra belangrijk om goed te weten waar je op moet letten bij de aankoop.",
      },
      {
        heading: "Checklist: dit wil je weten voor je koopt",
        body: "Voordat je een handtekening zet, zijn er een aantal zaken die je absoluut moet checken:",
        list: [
          "Onderhoud: heeft de auto een volledige servicehistorie?",
          "NAP: is de kilometerstand aantoonbaar correct via Nationale Auto Pas?",
          "APK: hoe lang is de APK nog geldig?",
          "Technische staat: laat de auto nakijken door een onafhankelijk monteur",
          "RDW-check: controleer of de auto geen schadehistorie heeft",
          "Verkoper: koop bij een betrouwbare partij, niet anoniem via Marktplaats",
        ],
      },
      {
        heading: "Eerlijke prijs of risico?",
        body: "Een auto die veel goedkoper is dan vergelijkbare modellen is vaak geen koopje maar een risico. Let op auto's met onduidelijke historia, een te lage kilometerstand of verkopers die haastig zijn. Bij JG Mobility zijn al onze occasies zorgvuldig geselecteerd en gecontroleerd — je weet precies wat je koopt.",
      },
      {
        heading: "Proefrit altijd verplicht",
        body: "Koop nooit een auto zonder proefrit. Let tijdens de proefrit op ongewone geluiden, trillingen, hoe de koppeling aanvoelt en hoe de auto reageert bij optrekken en remmen. Vraag ook of alle elektronica en comfortfuncties werken.",
      },
      {
        heading: "Bekijk ons aanbod",
        body: "Op zoek naar een kwalitatieve occasion in Zuid-Holland? Bekijk het actuele aanbod van JG Mobility. Alle auto's zijn zorgvuldig geselecteerd en verkeren in uitstekende staat.",
      },
    ],
    keywords: [
      "occasion kopen Barendrecht",
      "occasion kopen Rotterdam",
      "gebruikte auto kopen tips",
      "tweedehands auto kopen",
      "betrouwbare occasion kopen",
      "occasion kopen checklist",
    ],
  },
  {
    slug: "auto-taxatie-waarde",
    title: "Auto taxatie: zo wordt de waarde van jouw auto bepaald",
    date: "2025-05-08",
    category: "Taxatie",
    readTime: 4,
    excerpt:
      "Wat is jouw auto echt waard? Ontdek welke factoren de taxatiewaarde bepalen en hoe JG Mobility tot een eerlijk bod komt.",
    sections: [
      {
        heading: "Wat is een auto taxatie?",
        body: "Een taxatie is een professionele waardebepaling van jouw auto. Op basis van meerdere factoren wordt bepaald wat jouw auto op dit moment op de markt waard is. Dit is de basis voor een eerlijk verkoopbod of voor het bepalen van een realistische vraagprijs bij consignatie.",
      },
      {
        heading: "Factoren die de waarde bepalen",
        body: "De waarde van een auto is afhankelijk van veel verschillende factoren:",
        list: [
          "Merk en model — populaire merken houden beter hun waarde",
          "Kilometerstand — hoe lager, hoe hoger de waarde",
          "Bouwjaar en leeftijd van de auto",
          "Onderhoud en servicehistorie",
          "Staat van de carrosserie (deuken, krassen, lakschade)",
          "Technische staat van motor, remmen en versnellingsbak",
          "Opties en extra's zoals navigatie, leder en panoramadak",
          "Brandstoftype — elektrisch en hybride scoren tegenwoordig goed",
          "Actuele marktvraag en seizoensinvloeden",
        ],
      },
      {
        heading: "Handelsprijs vs. consumentenprijs",
        body: "Er is een verschil tussen wat een handelaar betaalt (handelsprijs) en wat een consument normaal betaalt (verkoopprijs). Een dealer koopt in onder de marktprijs om ruimte te hebben voor kosten en marge. Bij JG Mobility streven we naar de beste balans: een eerlijk bod voor jou als verkoper én een eerlijke prijs voor de volgende eigenaar.",
      },
      {
        heading: "Gratis taxatie bij JG Mobility",
        body: "Je kunt bij JG Mobility altijd terecht voor een gratis en vrijblijvende taxatie. We kijken samen naar je auto, leggen uit hoe we tot ons bod komen en je beslist daarna zelf of je wilt verkopen of via consignatie wilt gaan. Geen druk, geen verrassingen.",
      },
    ],
    keywords: [
      "auto taxatie Barendrecht",
      "auto taxatie Rotterdam",
      "auto waarde bepalen",
      "gratis auto taxatie",
      "auto taxeren laten",
      "wat is mijn auto waard",
    ],
  },
  {
    slug: "autofinanciering-opties",
    title: "Autofinanciering: wat zijn jouw opties bij JG Mobility?",
    date: "2025-05-13",
    category: "Financiering",
    readTime: 5,
    excerpt:
      "Droomauto gevonden maar wil je niet alles in één keer betalen? Ontdek de financieringsmogelijkheden bij JG Mobility in Barendrecht.",
    sections: [
      {
        heading: "Financiering voor je droomauto",
        body: "Een auto kopen is voor de meeste mensen een grote uitgave. Gelukkig hoef je niet altijd de volledige aankoopprijs in één keer te betalen. Bij JG Mobility denken we graag mee over een passende financieringsoplossing, zodat je toch in je droomauto kunt rijden.",
      },
      {
        heading: "Jouw financieringsopties",
        body: "Er zijn verschillende manieren om een auto te financieren:",
        list: [
          "Persoonlijke lening — je leent een vast bedrag en betaalt dit in vaste maandtermijnen terug. Eenvoudig en overzichtelijk.",
          "Doorlopend krediet — flexibeler dan een persoonlijke lening; je kunt extra aflossen of bijlenen.",
          "Financial lease — je betaalt maandelijks voor gebruik van de auto en wordt aan het einde eigenaar.",
          "Operational lease — alles-in-één maandelijkse betaling inclusief verzekering en onderhoud. Populair bij zakelijke rijders.",
        ],
      },
      {
        heading: "Particulier of zakelijk?",
        body: "Ben je een particuliere koper? Dan is een persoonlijke lening vaak de meest transparante keuze. Ben je zzp'er of rijd je de auto zakelijk? Dan kan financial of operational lease fiscaal aantrekkelijk zijn, omdat je de btw kunt terugvorderen en de leasekosten kunt aftrekken.",
      },
      {
        heading: "Tips voor slim financieren",
        body: "Een paar praktische tips als je overweegt te financieren:",
        list: [
          "Vergelijk altijd meerdere aanbieders op rente en voorwaarden",
          "Let op de totale kosten over de gehele looptijd, niet alleen de maandlast",
          "Houd rekening met bijkomende kosten: verzekering, onderhoud, wegenbelasting",
          "Kies een looptijd die past bij hoe lang je de auto wilt houden",
          "Leg niet meer dan 15–20% van je netto inkomen in een autolening",
        ],
      },
      {
        heading: "Laten we de mogelijkheden bespreken",
        body: "Wil je weten wat in jouw situatie de beste financieringsvorm is? Neem contact op met JG Mobility. We denken graag met je mee en koppelen je indien nodig aan onze financieringspartners.",
      },
    ],
    keywords: [
      "autofinanciering Barendrecht",
      "auto financieren Rotterdam",
      "auto lening particulier",
      "financial lease auto",
      "auto kopen op afbetaling",
      "zakelijke autofinanciering",
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function formatDate(dateStr: string): string {
  const months = [
    "januari", "februari", "maart", "april", "mei", "juni",
    "juli", "augustus", "september", "oktober", "november", "december",
  ];
  const [year, month, day] = dateStr.split("-").map(Number);
  return `${day} ${months[month - 1]} ${year}`;
}
