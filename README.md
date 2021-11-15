# Dev5 course project!

Voor het vak **Development 5** aan de [Erasmushogeschool Brussel](https://www.erasmushogeschool.be/nl) heb ik een project moeten maken dat een (relationele) databank en een REST-full API met elkaar verbindt aan de hand van Docker. 
<hr>

## Setup
1. Pull branch temp/tussentijds
2. .env.template copiëren naar een persoonlijke .env-file (top-level)
3. Voer het commando '''docker-compose up --build''' uit.
4. Navigeer naar de /api en voer het commando '''npm i''' uit om de benodigde packages te installeren.
5. Voer het commando '''npm test''' uit in de /api map.

Indien de API connectie faalt in Docker, gelieve het commando '''docker-compose up --build''' opnieuw uit te voeren zonder de container te verwijderen.

## Bronnen
* [Classed - # Docker Tutorial (+ Node & Postgres setup)](https://www.youtube.com/watch?v=Dm0CmZz-QyI&t=1812s&ab_channel=Classsed)
* [Ahmed - classsed docker tutorial](https://github.com/hidjou/classsed-docker-tutorial)
* [Adam Pritchard - Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
 * [rnevius - How to validate an email address in JavaScript](https://stackoverflow.com/a/46181)

## License

[MIT](https://opensource.org/licenses/MIT)