export const PORT = 9001;
export const WELCOME_MESSAGE = "Welcome to PokemonAPI REST";

export const MONGO = {
    url: 'mongodb://localhost:27017/Pokemon',
    configuration: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }
}