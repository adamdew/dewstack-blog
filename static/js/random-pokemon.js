document.addEventListener("DOMContentLoaded", function () {
    const mons = [
    "Bulbasaur","Ivysaur","Venusaur",
    "Charmander","Charmeleon","Charizard",
    "Squirtle",
    "Caterpie",
    "Weedle",
    "Pidgey",
    "Rattata","Raticate",
    "Spearow","Fearow",
    "Ekans","Arbok",
    "Pikachu","Raichu",
    "Sandshrew","Sandslash",
    "Vulpix",
    "Zubat",
    "Oddish",
    "Diglett","Dugtrio",
    "Meowth","Persian",
    "Psyduck",
    "Machop",
    "Bellsprout",
    "Tentacool","Tentacruel",
    "Geodude",
    "Ponyta",
    "Slowpoke",
    "Magnemite",
    "Seel",
    "Krabby",
    "Exeggcute",
    "Cubone",
    "Hitmonlee",
    "Lickitung",
    "Koffing",
    "Rhyhorn",
    "Chansey",
    "Tangela",
    "Kangaskhan",
    "Horsea",
    "Goldeen",
    "Staryu",
    "Mr. Mime",
    "Scyther",
    "Jynx",
    "Electabuzz",
    "Magmar",
    "Magikarp","Gyarados",
    "Ditto",
    "Eevee","Vaporeon","Jolteon","Flareon",
    "Snorlax",
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

