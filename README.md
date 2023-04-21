# PokemonApi
Basic API for consumption from https://pokeapi.co/docs/v2.

There are four initial paths to testing this api:
- /pokemon : Returns a welcome message.
- /pokemon/all: Returns the list of pokemons stored in the database.
- /pokemon/:name_pokemon: Returns the detail of a pokemon saved in the database. A regex is used to look up the name.
- pokemon/new/:id : Searches the pokeApi api for an evolution chain ID, from the evolution chain it finds, saves a pokemon object containing: name, height, weight, id, stats and evolutions.
## Development server

-Run: docker-compose up
-Run: npm run start:dev

