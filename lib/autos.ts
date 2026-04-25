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
