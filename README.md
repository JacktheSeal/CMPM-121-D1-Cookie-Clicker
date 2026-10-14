# Minion Dematerializer

Link to Working Page: <https://jacktheseal.github.io/CMPM-121-D1-Cookie-Clicker/>

Interaction Explanation:
To play, the user must click on the "Farm Minion" button. This generates gold, which the user can use to purchase upgrades like AD (flat click upgrade) and champions (per second automatic upgrade). AD is a flat base system on its own, whereas champions are stored within champion objects, meaning it is easy for developers to add or remove additional champions and tune their parameters.

Run/Build Instructions:
This is a minimal TypeScript/Vite browser game with Deno checks and GitHub Pages deployment. To run this project locally, you MUST have deno and vite. Then, you can run "deno task dev" in your terminal targeted at the project location. This should open a web page which will display the game locally. To build the game for the web, you must make a commit to your GitHub repo, then navigate to Actions-> Deploy to GitHub Pages-> Run workflow-> then select "Use workflow from: main" (or another branch if you're working on it), then click Run workflow again. This should take a few seconds/minutes, and should display a green checkmark when successfully complete. Afterwards, a link to your playable web game should become available if you click on the job.

Developer Handoff:
If you want to continue to work on this project, the biggest shared behavior to pay attention to is the createChampionSection() function on line XXX. Previously we had each champion as a seperate set of functions and definitions. With this new createChampionSection function, all new and future champions can be created and managed by inputting them into a Champion object array. This is then passed to the createChampionSection() function, which will make a section on the webpage for each unique champion.

If you would like to see a list of the refactorings done thoughout the development process, here are some of the particular commits with descriptions of their connected refactor.

Refactor 1 - Adjust variable names to match theming of project and further usage
<https://github.com/JacktheSeal/CMPM-121-D1-Cookie-Clicker/commit/dd0b951b4b27681fa31ad0775b2a7896fe98ac25>

Refactor 2 - Seperate actual math logic calculations from their visual update counterparts by creating a function which displays additional upgrade images when called
<https://github.com/JacktheSeal/CMPM-121-D1-Cookie-Clicker/commit/dfc1c87c3eea6362e00b1bc69f247aaca866aba4>

Refactor 3 - Hands champion creation logic to a general function, using the SOLID principles of single-responsibility, open-closed, and dependency inversion to justify and inform changes made. This refactor ensures that future developers can depend on the abstract class of a champion and the surrounding general functions that support the use of that class, rather than having to individually create each champion by copy pasting similar code.
<https://github.com/JacktheSeal/CMPM-121-D1-Cookie-Clicker/commit/2aa84ad1c4d53c36612d5f29533ce2d2a4a02f33>

## Credits

Created by Keyan Premji and Jack Seales

Minion Dematerializer was created under Riot Games' "Legal Jibber Jabber" policy using assets owned by Riot Games. Riot Games does not endorse or sponsor this project.

Tooling adapted from the [CMPM 121 Fall 2026 S01 starter](https://github.com/ucsc-cmpm-121-f26/s01-starter/tree/8974888efb6537be82e8eb069db139ea885039da), which has no explicit repository license. No new license is assigned to that material. The D1 scaffold and original SVG were authored with OpenAI GPT-6 Astra assistance. Dependencies retain their respective licenses.
