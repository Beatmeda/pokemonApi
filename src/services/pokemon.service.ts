import { WELCOME_MESSAGE } from "../constants/pokemonApi.constants";
import { Pokemon } from "../models/pokemon.model";
import {IPokemon} from "../interfaces/pokemon.interface";
import {environment} from "../environments/environment";
import axios from 'axios';
export class PokemonService {
  baseUrlPokeApi: string = environment.baseUrlPokeApi;
  public getWelcomeMessage() {
    return WELCOME_MESSAGE;
  }

  public findAll(): Promise<IPokemon[]> {
    return Pokemon.find({}).exec();
  }

    public async find(name: string): Promise<IPokemon | null> {
        const regex = new RegExp(name, "i");
        const result = await Pokemon.findOne({ name: regex }).exec();
        return result;
    }

  public async addFromEvolutionChain(id: number): Promise<IPokemon> {
      try {
          const evolutionChainResponse = await axios.get(`${this.baseUrlPokeApi}/evolution-chain/${id}`);
          const evolutionChain = evolutionChainResponse.data;

          // Get the first Pokemon in the evolution chain
          const pokemonSpeciesUrl = evolutionChain.chain.species.url;
          const pokemonSpeciesResponse = await axios.get(pokemonSpeciesUrl);
          const pokemonSpeciesData = pokemonSpeciesResponse.data;

          // Get Pokemon
          const pokemonUrl = pokemonSpeciesData.varieties[0].pokemon.url;
          const pokemonResponse = await axios.get(pokemonUrl);
          const pokemonData = pokemonResponse.data;

          // Get the stats for the Pokemon
          const stats: {[key: string]: number} = {};
          for (const stat of pokemonData.stats) {
              stats[stat.stat.name] = stat.base_stat;
          }

          // Get the evolution data for the Pokemon
          const evolutions = [];
          let currentChain = evolutionChain.chain;
          while (currentChain.evolves_to.length > 0) {
              // @ts-ignore
              const evolutionData = currentChain.evolves_to.map((evolution) => {
                  const evolvedPokemonUrl = evolution.species.url;
                  const evolvedPokemonUrlParts = evolvedPokemonUrl.split("/");;
                  const evolvedPokemonName = evolution.species.name;
                  const isPreEvolution = currentChain.is_baby || currentChain.evolves_to.length > 1;

                  return { name: evolvedPokemonName, evolutionType: isPreEvolution ? 'Preevolution' : 'Evolution' , id: evolvedPokemonUrlParts[evolvedPokemonUrlParts.length - 2]};
              });
              evolutions.push(...evolutionData);
              currentChain = currentChain.evolves_to[0];
          }

          // @ts-ignore
          const pokemon: IPokemon = {
              name: pokemonSpeciesData.name,
              height: pokemonData.height,
              weight: pokemonData.weight,
              id: pokemonData.id,
              stats: stats,
              evolutions: evolutions
          };
          const newPokemon = new Pokemon(pokemon);
          return newPokemon.save();
      } catch (error) {
          console.log(error);
          throw new Error('Failed to add Pokemon');
      }
  }
}