document.addEventListener("DOMContentLoaded", function () {
    const mons = [
    "Bulbasaur","Ivysaur","Venusaur",
    "Charmander","Charmeleon","Charizard",
    "Squirtle","Wartortle","Blastoise",
    "Caterpie","Metapod","Butterfree",
    "Weedle","Kakuna","Beedrill",
    "Pidgey","Pidgeotto","Pidgeot",
    "Rattata","Raticate",
    "Spearow","Fearow",
    "Ekans","Arbok",
    "Pikachu","Raichu",
    "Sandshrew","Sandslash",
    "Nidoran♀","Nidorina","Nidoqueen",
    "Nidoran♂","Nidorino","Nidoking",
    "Clefairy","Clefable",
    "Vulpix","Ninetales",
    "Jigglypuff","Wigglytuff",
    "Zubat","Golbat",
    "Oddish","Gloom","Vileplume",
    "Paras","Parasect",
    "Venonat","Venomoth",
    "Diglett","Dugtrio",
    "Meowth","Persian",
    "Psyduck","Golduck",
    "Mankey","Primeape",
    "Growlithe","Arcanine",
    "Poliwag","Poliwhirl","Poliwrath",
    "Abra","Kadabra","Alakazam",
    "Machop","Machoke","Machamp",
    "Bellsprout","Weepinbell","Victreebel",
    "Tentacool","Tentacruel",
    "Geodude","Graveler","Golem",
    "Ponyta","Rapidash",
    "Slowpoke","Slowbro",
    "Magnemite","Magneton",
    "Farfetch'd",
    "Doduo","Dodrio",
    "Seel","Dewgong",
    "Grimer","Muk",
    "Shellder","Cloyster",
    "Gastly","Haunter","Gengar",
    "Onix",
    "Drowzee","Hypno",
    "Krabby","Kingler",
    "Voltorb","Electrode",
    "Exeggcute","Exeggutor",
    "Cubone","Marowak",
    "Hitmonlee","Hitmonchan",
    "Lickitung",
    "Koffing","Weezing",
    "Rhyhorn","Rhydon",
    "Chansey",
    "Tangela",
    "Kangaskhan",
    "Horsea","Seadra",
    "Goldeen","Seaking",
    "Staryu","Starmie",
    "Mr. Mime",
    "Scyther",
    "Jynx",
    "Electabuzz",
    "Magmar",
    "Pinsir",
    "Tauros",
    "Magikarp","Gyarados",
    "Lapras",
    "Ditto",
    "Eevee","Vaporeon","Jolteon","Flareon",
    "Porygon",
    "Omanyte","Omastar",
    "Kabuto","Kabutops",
    "Aerodactyl",
    "Snorlax",
    "Articuno","Zapdos","Moltres",
    "Dratini","Dragonair","Dragonite",
    "Mewtwo","Mew"
    ];

  const pick = mons[Math.floor(Math.random() * mons.length)];
  const slug = pick.toLowerCase()
    .replace(/♀/g, "-f")
    .replace(/♂/g, "-m")
    .replace(/\./g, "")
    .replace(/['’]/g, "")
    .replace(/\s+/g, "-");

  const imgUrl = "images/mons/" + slug + ".png";

  const el = document.querySelector("#banner-home-img");
  if (el) {
    el.src = imgUrl;
    el.alt = "Random Pokémon: " + pick;
  }
});

