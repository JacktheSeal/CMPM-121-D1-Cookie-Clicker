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
import sylasURL from "./assets/sylas.png?no-inline";
import viktorURL from "./assets/viktor.png?no-inline";
import azirURL from "./assets/azir.png?no-inline";

const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "Minion Dematerializer";

const minionImage = document.createElement("img");
minionImage.src = casterMinionURL;
minionImage.alt = "MINION";
minionImage.width = 144;
minionImage.height = 144;
minionImage.style.display = "block";

let minionsFarmed: number = 0;

const farmMinionButton = document.createElement("button") as HTMLButtonElement;
farmMinionButton.textContent = "Farm Minion";

const minionsFarmedButton = document.createElement("h1")!;
minionsFarmedButton.id = "minionsFarmed";
minionsFarmedButton.textContent = "0";

farmMinionButton.addEventListener("click", () => {
  minionsFarmed += AD;
  updateMinionDisplay();
});
minionImage.addEventListener("click", () => {
  minionsFarmed += AD;
  updateMinionDisplay();
});

function updateMinionDisplay() {
  minionsFarmedButton.textContent = Math.floor(minionsFarmed).toString();
}

/* AD Section: more AD = more minions per manual mouse click*/

// total AD + cost of AD
let AD: number = 1;
let ADCost: number = 15;
const itemContainer = document.createElement("div");
itemContainer.id = "items";

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

const ADDescription = document.createElement("p");
ADDescription.textContent = `Increase Minions per Manual Click by 1`;

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
  updateMinionDisplay();
  ADElement.textContent = `AD: ${AD}`;
  buyADButton.textContent = `Buy AD - (${ADCost} minions)`;
});

type Champion = {
  name: string;
  imageURL: string;
  cost: number;
  minionsPerSecond: number;
  count: number;
};

const champions: Champion[] = [
  {
    name: "Yasuo",
    imageURL: yasuoURL,
    cost: 15,
    minionsPerSecond: 0.1,
    count: 0,
  },
  {
    name: "Yone",
    imageURL: yoneURL,
    cost: 100,
    minionsPerSecond: 1,
    count: 0,
  },
  {
    name: "Sylas",
    imageURL: sylasURL,
    cost: 1100,
    minionsPerSecond: 8,
    count: 0,
  },
  {
    name: "Viktor",
    imageURL: viktorURL,
    cost: 12000,
    minionsPerSecond: 47,
    count: 0,
  },
  {
    name: "Azir",
    imageURL: azirURL,
    cost: 130000,
    minionsPerSecond: 260,
    count: 0,
  },
];

const championElements: HTMLElement[] = [];

function createChampionSection(champion: Champion) {
  const countText = document.createElement("p");
  countText.textContent = `${champion.name} Count: 0`;

  const buyButton = document.createElement("button");
  buyButton.textContent = `Buy ${champion.name} - (${champion.cost} minions)`;

  const descriptionText = document.createElement("p");
  descriptionText.textContent =
    `Farms ${champion.minionsPerSecond} minion(s) per second`;

  const container = document.createElement("div");

  const divider = document.createElement("hr");

  buyButton.addEventListener("click", () => {
    if (minionsFarmed < champion.cost) return;
    minionsFarmed -= champion.cost;
    champion.count++;
    addChampionImage(container, champion);
    champion.cost = Math.ceil(champion.cost * 1.15 ** champion.count);
    updateMinionDisplay();
    countText.textContent = `${champion.name} Count: ${champion.count}`;
    buyButton.textContent = `Buy ${champion.name} - (${champion.cost} minions)`;
  });

  championElements.push(
    divider,
    countText,
    buyButton,
    descriptionText,
    container,
  );
}

function addChampionImage(container: HTMLElement, champion: Champion) {
  const img = document.createElement("img");
  img.src = champion.imageURL;
  img.alt = champion.name;
  img.width = 96;
  img.height = 96;
  container.append(img);
}

champions.forEach(createChampionSection);

setInterval(() => {
  for (const champion of champions) {
    minionsFarmed += champion.count * champion.minionsPerSecond;
  }
  updateMinionDisplay();
}, 1000);

app.append(
  heading,
  minionImage,
  farmMinionButton,
  minionsFarmedButton,
  ADElement,
  buyADButton,
  ADDescription,
  itemContainer,
  ...championElements,
);
