import { Request, Response, Router } from "express";
import { PokemonService } from "../services/pokemon.service";

export class PokemonController {
  public router= Router();

  constructor(private pokemonService: PokemonService) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.route("/").get(this.welcome);
    this.router.route("/all").get(this.findAll);
    this.router.route("/new/:id").get(this.add);
    this.router.route("/:id").get(this.find);
  }

  private welcome = (_: Request, res: Response) => {
    const welcomeMessage = this.pokemonService.getWelcomeMessage();
    res.send(welcomeMessage);
  };

  private findAll = async (_: Request, res: Response) => {
    try {
      const pokemon = await this.pokemonService.findAll();
      res.send(pokemon);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  };

  private add = async (req: Request, res: Response) => {
    try {
      const key = req.params.id;
      const addPokemonResult = await this.pokemonService.addFromEvolutionChain(Number(key));
      res.send(addPokemonResult);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  };

  private find = async (req: Request, res: Response) => {
    try {
      const key = req.params.id;
      const findPokemonResult = await this.pokemonService.find(key);
      res.send(findPokemonResult);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  };
}