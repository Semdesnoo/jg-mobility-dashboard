export type Auto = {
  id: number;
  merk: string;
  model: string;
  versie: string;
  bouwjaar: number;
  bodytype: string;
  prijs: number;
  km: number;
  brandstof: string;
  transmissie: string;
  vermogen: string;
  kleur: string;
  // Extra kenmerken
  apk: string;
  btw: string;
  bekleding: string;
  kleurExterieur: string;
  // Foto's (URLs of /public paden)
  fotos?: string[];
  // Omschrijving
  omschrijving: string;
  // Opties per categorie
  opties: {
    categorie: string;
    items: string[];
  }[];
};

export const autos: Auto[] = [
  {
    id: 3,
    merk: "Volkswagen",
    model: "Polo 1.6 TDI",
    versie: "Comfortline Business | Navi | ACC | PDC | Lichtmetalen velgen",
    bouwjaar: 2018,
    bodytype: "Hatchback",
    prijs: 6950,
    km: 271000,
    brandstof: "Diesel",
    transmissie: "Handgeschakeld",
    vermogen: "95 pk",
    kleur: "Zwart",
    apk: "Onbekend",
    btw: "Marge",
    bekleding: "Stof",
    kleurExterieur: "Deep Black Pearl metallic",
    fotos: [
      "/autos/Volkswagen%20(TH-744-B)/WhatsApp%20Image%202026-04-26%20at%2015.13.28.jpeg",
      "/autos/Volkswagen%20(TH-744-B)/WhatsApp%20Image%202026-04-26%20at%2015.13.28%20(1).jpeg",
      "/autos/Volkswagen%20(TH-744-B)/WhatsApp%20Image%202026-04-26%20at%2015.13.28%20(2).jpeg",
      "/autos/Volkswagen%20(TH-744-B)/WhatsApp%20Image%202026-04-26%20at%2015.13.29.jpeg",
      "/autos/Volkswagen%20(TH-744-B)/WhatsApp%20Image%202026-04-26%20at%2015.13.29%20(1).jpeg",
      "/autos/Volkswagen%20(TH-744-B)/WhatsApp%20Image%202026-04-26%20at%2015.13.29%20(2).jpeg",
      "/autos/Volkswagen%20(TH-744-B)/WhatsApp%20Image%202026-04-26%20at%2015.13.30.jpeg",
      "/autos/Volkswagen%20(TH-744-B)/WhatsApp%20Image%202026-04-26%20at%2015.13.30%20(1).jpeg",
      "/autos/Volkswagen%20(TH-744-B)/WhatsApp%20Image%202026-04-26%20at%2015.13.31.jpeg",
      "/autos/Volkswagen%20(TH-744-B)/WhatsApp%20Image%202026-04-26%20at%2015.13.32.jpeg",
      "/autos/Volkswagen%20(TH-744-B)/WhatsApp%20Image%202026-04-26%20at%2015.13.32%20(1).jpeg",
      "/autos/Volkswagen%20(TH-744-B)/WhatsApp%20Image%202026-04-26%20at%2015.13.32%20(3).jpeg",
    ],
    omschrijving:
      "Nette Volkswagen Polo 1.6 TDI uit 2018 in de Comfortline Business uitvoering. Deze zuinige diesel is ideaal voor lange afstanden dankzij het lage verbruik en de rijke uitrusting. De auto is voorzien van het Discover Media navigatiesysteem met groot touchscreen, Apple CarPlay & Android Auto, en de gewilde Adaptive Cruise Control (ACC). De zwarte metallic lak (Deep Black Pearl) geeft de auto een stijlvolle uitstraling.\n\nOriginele nieuwprijs was € 22.500. Marge voertuig — voor particulieren komt er geen BTW meer bij.",
    opties: [
      {
        categorie: "Infotainment & Techniek",
        items: [
          "Discover Media navigatiesysteem (groot touchscreen)",
          "Apple CarPlay & Android Auto",
          "Adaptive Cruise Control (ACC)",
          "Front Assist (noodremassistent)",
          "Bluetooth telefoonvoorbereiding",
        ],
      },
      {
        categorie: "Comfort & Interieur",
        items: [
          "Airconditioning",
          "Multifunctioneel lederen stuurwiel",
          "Middenarmsteun voor",
          "Comfortstoelen met stoffen bekleding",
          "Elektrische ramen voor en achter",
        ],
      },
      {
        categorie: "Exterieur & Parkeren",
        items: [
          "Deep Black Pearl metallic lak",
          "15 inch lichtmetalen velgen",
          "LED-dagrijverlichting",
          "Parkeersensoren voor en achter (PDC)",
        ],
      },
      {
        categorie: "Aandrijving",
        items: [
          "1.6 TDI dieselmotor",
          "95 pk vermogen",
          "Handgeschakelde 5-traps versnellingsbak",
          "Zuinig dieselverbruik — ideaal voor lange afstanden",
        ],
      },
    ],
  },
  {
    id: 2,
    merk: "BMW",
    model: "216i Active Tourer",
    versie: "1.5 | Navigatie | PDC | Leder stuurwiel",
    bouwjaar: 2017,
    bodytype: "MPV",
    prijs: 12450,
    km: 157478,
    brandstof: "Benzine",
    transmissie: "Handgeschakeld",
    vermogen: "102 pk",
    kleur: "Zwart",
    apk: "07-2026",
    btw: "Marge",
    bekleding: "Stof",
    kleurExterieur: "Sapphire Black metallic",
    fotos: [
      "/autos/BMW%20(T-731-VT)/01.jpeg",
      "/autos/BMW%20(T-731-VT)/02.jpeg",
      "/autos/BMW%20(T-731-VT)/03.jpeg",
      "/autos/BMW%20(T-731-VT)/04.jpeg",
      "/autos/BMW%20(T-731-VT)/05.jpeg",
      "/autos/BMW%20(T-731-VT)/06.jpeg",
      "/autos/BMW%20(T-731-VT)/07.jpeg",
      "/autos/BMW%20(T-731-VT)/08.jpeg",
      "/autos/BMW%20(T-731-VT)/09.jpeg",
      "/autos/BMW%20(T-731-VT)/10.jpeg",
      "/autos/BMW%20(T-731-VT)/11.jpeg",
      "/autos/BMW%20(T-731-VT)/12.jpeg",
      "/autos/BMW%20(T-731-VT)/13.jpeg",
      "/autos/BMW%20(T-731-VT)/14.jpeg",
    ],
    omschrijving:
      "Nette en goed onderhouden BMW 216i Active Tourer uit 2017. Deze compacte MPV combineert het rijplezier van BMW met een zeer praktisch en ruim interieur. De zuinige 1.5 liter 3-cilinder motor levert 102 pk en rijdt soepel en economisch. De hogere instap, flexibele achterbank en royale bagageruimte maken deze auto ideaal voor dagelijks gebruik en gezinnen.\n\nAPK geldig tot juli 2026. Marge voertuig — voor particulieren komt er geen BTW meer bij.",
    opties: [
      {
        categorie: "Exterieur",
        items: [
          "Sapphire Black metallic lak",
          "Lichtmetalen velgen 16/17 inch",
          "Automatisch inschakelende koplampen",
          "Regensensor",
        ],
      },
      {
        categorie: "Interieur",
        items: [
          "Multifunctioneel lederen stuurwiel",
          "Airconditioning",
          "Verschuifbare achterbank",
          "Flexibel interieurconcept (Active Tourer)",
        ],
      },
      {
        categorie: "Technologie",
        items: [
          "BMW Navigatiesysteem (Business)",
          "Bluetooth telefoonvoorbereiding",
          "Kleurenscherm dashboard",
          "Parkeersensoren achter (PDC)",
        ],
      },
      {
        categorie: "Aandrijving",
        items: [
          "1.5 liter 3-cilinder benzinemotor",
          "102 pk systeemvermogen",
          "Handgeschakelde versnellingsbak",
          "Zuinig brandstofverbruik",
        ],
      },
    ],
  },
  {
    id: 1,
    merk: "Volkswagen",
    model: "Golf GTE",
    versie: "1.4 TSI | Automaat | Panoramadak | Navi | ACC",
    bouwjaar: 2015,
    bodytype: "Hatchback",
    prijs: 11950,
    km: 183925,
    brandstof: "Hybride (Plug-in)",
    transmissie: "Automatisch",
    vermogen: "204 pk",
    kleur: "Wit",
    apk: "12-2026",
    btw: "Marge",
    bekleding: "Leder / Stof",
    kleurExterieur: "Wit",
    fotos: [
      "/autos/Volkswagen%20GTE%20(HD-508-X)/01.jpeg",
      "/autos/Volkswagen%20GTE%20(HD-508-X)/02.jpeg",
      "/autos/Volkswagen%20GTE%20(HD-508-X)/03.jpeg",
      "/autos/Volkswagen%20GTE%20(HD-508-X)/04.jpeg",
      "/autos/Volkswagen%20GTE%20(HD-508-X)/05.jpeg",
      "/autos/Volkswagen%20GTE%20(HD-508-X)/06.jpeg",
      "/autos/Volkswagen%20GTE%20(HD-508-X)/07.jpeg",
      "/autos/Volkswagen%20GTE%20(HD-508-X)/08.jpeg",
      "/autos/Volkswagen%20GTE%20(HD-508-X)/09.jpeg",
      "/autos/Volkswagen%20GTE%20(HD-508-X)/10.jpeg",
      "/autos/Volkswagen%20GTE%20(HD-508-X)/11.jpeg",
      "/autos/Volkswagen%20GTE%20(HD-508-X)/12.jpeg",
      "/autos/Volkswagen%20GTE%20(HD-508-X)/13.jpeg",
      "/autos/Volkswagen%20GTE%20(HD-508-X)/14.jpeg",
    ],
    omschrijving:
      "Zeer nette en rijk uitgeruste Volkswagen Golf 1.4 TSI GTE uit 2015. Deze auto combineert de sportieve prestaties van een GTI met een zeer gunstig brandstofverbruik dankzij de soepele plug-in hybride aandrijving (204 pk gecombineerd). De auto rijdt fantastisch, schakelt naadloos via de automatische DSG-transmissie en verkeert in keurige staat. Gezien de zeer hoge oorspronkelijke nieuwwaarde is dit een exemplaar dat bijzonder rijk is uitgerust in vergelijking met een standaard GTE.\n\nEen ideale auto voor wie op zoek is naar comfort, sportiviteit en dagelijkse efficiëntie in één betrouwbaar pakket. APK geldig tot december 2026. Marge voertuig — voor particulieren komt er geen BTW meer bij.",
    opties: [
      {
        categorie: "Exterieur",
        items: [
          "LED-koplampen en LED-achterlichten",
          "Panoramisch elektrisch schuif-/kanteldak",
          "Lichtmetalen sportvelgen 18 inch",
          "Parkeersensoren voor en achter",
          "Achteruitrijcamera",
          "Extra getint glas achter",
        ],
      },
      {
        categorie: "Interieur",
        items: [
          "GTE sportstoelen met leder/Vienna bekleding",
          "Stoelverwarming voor",
          "Lederen sportstuurwiel met schakelflippers",
          "Automatische airconditioning 2-zones (Climate Control)",
          "Elektrische ramen voor en achter",
          "Zwarte dakhemel",
        ],
      },
      {
        categorie: "Technologie",
        items: [
          "Discover Pro navigatie- en multimediasysteem",
          "Bluetooth telefoonvoorbereiding en audiostreaming",
          "Adaptive Cruise Control (ACC)",
          "Lane Assist (rijstrookbehoud)",
          "Laadkabels inbegrepen (thuis- en openbaar laden)",
        ],
      },
      {
        categorie: "Aandrijving",
        items: [
          "1.4 TSI plug-in hybride aandrijving",
          "150 pk brandstofmotor / 204 pk systeemvermogen",
          "7-traps automaat",
          "GTE rijmodus (sportief, volledig elektrisch, hybride)",
          "Elektrisch rijbereik ca. 50 km (NEDC)",
        ],
      },
    ],
  },
];
