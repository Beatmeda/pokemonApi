import { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { PokemonController } from "./controllers/pokemon.controller";
import { PokemonService } from "./services/pokemon.service";
import mongoose from "mongoose";
import { MONGO } from "./constants/pokemonApi.constants";

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.setConfig();
        this.setMongoConfig();
        this.setControllers();
    }

    private setConfig() {
        this.app.use(bodyParser.json({ limit: "50mb" }));
        this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
        this.app.use(cors());
    }

    private setControllers() {
        const pokemonController = new PokemonController(new PokemonService());
        this.app.use("/pokemon", pokemonController.router);
    }

    private setMongoConfig() {
        mongoose.Promise = global.Promise;
        mongoose.connect(MONGO.url, MONGO.configuration);
        mongoose.set("toJSON", {
            virtuals: true,
            transform: (_: any, converted: any) => {
                delete converted._id;
            },
        });
    }
}

export default new App().app;