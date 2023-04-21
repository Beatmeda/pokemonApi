import { model } from "mongoose";
import { IPokemon } from "../interfaces/pokemon.interface";
import PokemonSchema from "../schemas/pokemon.schema";

export const Pokemon = model<IPokemon>("Pokemon", PokemonSchema);
