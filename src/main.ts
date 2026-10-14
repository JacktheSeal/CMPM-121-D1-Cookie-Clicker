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

const farmMinionButton = document.createElement("button") as HTMLButtonElement;
farmMinionButton.textContent = "Farm Minion";

const minionsFarmedButton = document.createElement("p")!;
minionsFarmedButton.id = "minionsFarmed";
minionsFarmedButton.textContent = "0";

farmMinionButton.addEventListener("click", () => {
  minionsFarmed++;
  minionsFarmedButton.textContent = minionsFarmed.toString();
});

// Yasuo Section

let champions: number = 0;
let championCost: number = 20;

const buyChampionButton = document.createElement("button");
buyChampionButton.textContent = `Buy Yasuo - (${championCost} minions)`;

const championsElement = document.createElement("p");
championsElement.textContent = "Yasuos: 0";

buyChampionButton.addEventListener("click", () => {
  if (minionsFarmed < championCost) return;
  minionsFarmed -= championCost;
  champions++;
  championCost = Math.ceil(championCost * 1.15);
  minionsFarmedButton.textContent = minionsFarmed.toString();
  championsElement.textContent = `Yasuos: ${champions}`;
  buyChampionButton.textContent = `Buy Yasuo - (${championCost} minions)`;
});

setInterval(() => {
  minionsFarmed += champions;
  minionsFarmedButton.textContent = minionsFarmed.toString();
}, 1000);

app.append(
  heading,
  image,
  farmMinionButton,
  minionsFarmedButton,
  buyChampionButton,
  championsElement,
);
