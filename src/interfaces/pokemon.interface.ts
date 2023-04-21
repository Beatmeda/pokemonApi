import { Document } from "mongoose";

export interface IPokemon extends Document {
  name: string;
  height: number;
  weight: number;
  id: number;
  stats: {
    [key: string]: number;
  };
  evolutions: {
    name: string;
    evolutionType: string;
    id: number;
  }[];
}
