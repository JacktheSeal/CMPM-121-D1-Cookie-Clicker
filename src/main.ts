// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import "./style.css";

import casterMinionURL from "./assets/casterMinion.webp?no-inline";
import longSwordURL from "./assets/LongSword.png?no-inline";
import bfSwordURL from "./assets/BFSword.png?no-inline";
import infinityEdgeURL from "./assets/InfinityEdge.png?no-inline";

const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "Minion Clicker";

const image = document.createElement("img");
image.src = casterMinionURL;
image.alt = "MINION";
image.width = 144;
image.height = 144;
image.style.display = "block";

let minionsFarmed: number = 0;

const farmMinionButton = document.createElement("button") as HTMLButtonElement;
farmMinionButton.textContent = "Farm Minion";

const minionsFarmedButton = document.createElement("h1")!;
minionsFarmedButton.id = "minionsFarmed";
minionsFarmedButton.textContent = "0";

farmMinionButton.addEventListener("click", () => {
  minionsFarmed += AD;
  minionsFarmedButton.textContent = minionsFarmed.toString();
});

/* AD Section: more AD = more minions per manual mouse click*/

// total AD + cost of AD
let AD: number = 1;
let ADCost: number = 15;
const itemContainer = document.createElement("div");

// function that adds long sword PNG to show how much AD the user has
function addItem(url: string, alt: string) {
  const item = document.createElement("img");
  item.src = url;
  item.alt = alt;
  item.width = 24;
  item.height = 24;
  itemContainer.append(item);
}

function loadItems() {
  itemContainer.replaceChildren();

  const IEs = Math.floor(AD / 25);
  const BFs = Math.floor((AD % 25) / 5);
  const LSs = AD % 5;

  for (let i = 0; i < IEs; i++) addItem(infinityEdgeURL, "Infinity Edge");
  for (let i = 0; i < BFs; i++) addItem(bfSwordURL, "B.F. Sword");
  for (let i = 0; i < LSs; i++) addItem(longSwordURL, "Long Sword");
}

// user starts with 1 AD
loadItems();

// buy AD button, cost embedded in button text
const buyADButton = document.createElement("button");
buyADButton.textContent = `Buy AD - (${ADCost} minions)`;

// shows amt of AD
const ADElement = document.createElement("p");
ADElement.textContent = "AD: 1";

// AD purchase button logic, price increments + update button text with new price
buyADButton.addEventListener("click", () => {
  if (minionsFarmed < ADCost) return;
  minionsFarmed -= ADCost;
  AD++;
  loadItems();
  ADCost = Math.ceil(ADCost * 1.15);
  minionsFarmedButton.textContent = minionsFarmed.toString();
  ADElement.textContent = `AD: ${AD}`;
  buyADButton.textContent = `Buy AD - (${ADCost} minions)`;
});

/* YASUO SECTION: Yasuo = Farm*/

// # of yasuos + cost of yasuos
let champions: number = 0;
let championCost: number = 20;

// buy yasuo button, cost embedded in button text
const buyChampionButton = document.createElement("button");
buyChampionButton.textContent = `Buy Yasuo - (${championCost} minions)`;

// shows number of yasuos
const championsElement = document.createElement("p");
championsElement.textContent = "Yasuos: 0";

// yasuo purchase button logic, price increments + update button text with new price
buyChampionButton.addEventListener("click", () => {
  if (minionsFarmed < championCost) return;
  minionsFarmed -= championCost;
  champions++;
  championCost = Math.ceil(championCost * 1.15);
  minionsFarmedButton.textContent = minionsFarmed.toString();
  championsElement.textContent = `Yasuos: ${champions}`;
  buyChampionButton.textContent = `Buy Yasuo - (${championCost} minions)`;
});

// add minions per second based on number of champions (yasuo)
setInterval(() => {
  minionsFarmed += champions;
  minionsFarmedButton.textContent = minionsFarmed.toString();
}, 1000);

app.append(
  heading,
  image,
  farmMinionButton,
  minionsFarmedButton,
  ADElement,
  buyADButton,
  itemContainer,
  championsElement,
  buyChampionButton,
);
