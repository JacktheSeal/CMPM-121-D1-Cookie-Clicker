// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import tileUrl from "./assets/tile.svg?no-inline";

const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "Minion Clicker";

const image = document.createElement("img");
image.src = tileUrl;
image.alt = "A teal tile with a cream circle";
image.width = 96;
image.height = 96;
image.style.display = "block";

let minionsFarmed: number = 0;
let AD: number = 1;

const farmMinionButton = document.createElement("button") as HTMLButtonElement;
farmMinionButton.textContent = "Farm Minion";

const minionsFarmedButton = document.createElement("p")!;
minionsFarmedButton.id = "minionsFarmed";
minionsFarmedButton.textContent = "0";

farmMinionButton.addEventListener("click", () => {
  minionsFarmed += AD;
  minionsFarmedButton.textContent = minionsFarmed.toString();
});

/* AD Section: more AD = more minions per manual mouse click*/

const ADCost: number = 15;

const buyADButton = document.createElement("button");
buyADButton.textContent = `Buy AD - (${ADCost} minions)`;

const ADElement = document.createElement("p");
ADElement.textContent = "AD: 0";

buyADButton.addEventListener("click", () => {
  if (minionsFarmed < ADCost) return;
  minionsFarmed -= ADCost;
  AD++;
  minionsFarmedButton.textContent = minionsFarmed.toString();
  ADElement.textContent = `AD: ${AD}`;
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
  buyADButton,
  ADElement,
  buyChampionButton,
  championsElement,
);
