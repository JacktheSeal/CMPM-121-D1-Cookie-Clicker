// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import "./style.css";

import casterMinionURL from "./assets/casterMinion.webp?no-inline";
import longSwordURL from "./assets/LongSword.png?no-inline";
import bfSwordURL from "./assets/BFSword.png?no-inline";
import infinityEdgeURL from "./assets/InfinityEdge.png?no-inline";
import yasuoURL from "./assets/yasuo.png?no-inline";
import yoneURL from "./assets/yone.png?no-inline";

const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "Minion Dematerializer";

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

// function that loads all items
function loadItems() {
  itemContainer.replaceChildren();

  const IEs = Math.floor(AD / 16);
  const BFs = Math.floor((AD % 16) / 4);
  const LSs = AD % 4;

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
let yasuos: number = 0;
let yasuoCost: number = 100;
const yasuoContainer = document.createElement("div");

// buy yasuo button, cost embedded in button text
const buyYasuoButton = document.createElement("button");
buyYasuoButton.textContent = `Buy Yasuo - (${yasuoCost} minions)`;

// shows number of yasuos
const yasuoCountText = document.createElement("p");
yasuoCountText.textContent = "Yasuos: 0";

// yasuo purchase button logic, price increments + update button text with new price
buyYasuoButton.addEventListener("click", () => {
  if (minionsFarmed < yasuoCost) return;
  minionsFarmed -= yasuoCost;
  yasuos++;
  addYasuo();
  yasuoCost = Math.ceil(yasuoCost * 1.15);
  minionsFarmedButton.textContent = minionsFarmed.toString();
  yasuoCountText.textContent = `Yasuos: ${yasuos}`;
  buyYasuoButton.textContent = `Buy Yasuo - (${yasuoCost} minions)`;
});

function addYasuo() {
  const yasuo = document.createElement("img");
  yasuo.src = yasuoURL;
  yasuo.alt = "Yasuo";
  yasuo.width = 96;
  yasuo.height = 96;
  yasuoContainer.append(yasuo);
}

/* YONE SECTION: Yone = FarmDeluxe*/

// # of yones + cost of yones
let yones: number = 0;
let yoneCost: number = 1000;
const yoneContainer = document.createElement("div");

// buy yone button, cost embedded in button text
const buyYoneButton = document.createElement("button");
buyYoneButton.textContent = `Buy Yone - (${yoneCost} minions)`;

// shows number of yones
const yoneCountText = document.createElement("p");
yoneCountText.textContent = "Yones: 0";

// yone purchase button logic, price increments + update button text with new price
buyYoneButton.addEventListener("click", () => {
  if (minionsFarmed < yoneCost) return;
  minionsFarmed -= yoneCost;
  yones++;
  addYone();
  yoneCost = Math.ceil(yoneCost * 1.15);
  minionsFarmedButton.textContent = minionsFarmed.toString();
  yoneCountText.textContent = `Yones: ${yones}`;
  buyYoneButton.textContent = `Buy Yone - (${yoneCost} minions)`;
});

function addYone() {
  const yone = document.createElement("img");
  yone.src = yoneURL;
  yone.alt = "Yone";
  yone.width = 96;
  yone.height = 96;
  yoneContainer.append(yone);
}

// add minions per second based on number of champions (yasuo and yone)
setInterval(() => {
  minionsFarmed += yasuos + yones * 10;
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
  yasuoCountText,
  buyYasuoButton,
  yasuoContainer,
  yoneCountText,
  buyYoneButton,
  yoneContainer,
);
