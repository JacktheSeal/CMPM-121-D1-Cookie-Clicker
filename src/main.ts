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

const clickButton = document.createElement("button") as HTMLButtonElement;
clickButton.textContent = "Farm Minion";

const minionsFarmedElement = document.createElement("p")!;
minionsFarmedElement.id = "minionsFarmed";
minionsFarmedElement.textContent = "0";

clickButton.addEventListener("click", () => {
  minionsFarmed++;
  minionsFarmedElement.textContent = minionsFarmed.toString();
});

app.append(heading, image, clickButton, minionsFarmedElement);
