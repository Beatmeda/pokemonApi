import { Schema } from "mongoose";

export const PokemonSchema = new Schema({
    name: { type: String, required: true },
    stats: { type: Object, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    id: { type: Number, required: true },
    evolutions: [{ name: String, evolutionType: String, id: Number }],
});

export default PokemonSchema;
