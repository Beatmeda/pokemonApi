import app from "./app";
import { PORT } from "../src/constants/pokemonApi.constants";

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));