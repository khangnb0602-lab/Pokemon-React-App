import axios from 'axios';

const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
});

export async function getPokemonList(limit = 20, offset = 0) {
    const { data } = await api.get("/pokemon", { params: { limit, offset } });
    return data;
}

export async function getPokemonByName(name) {
    const { data } = await api.get(`/pokemon/${name.toLowerCase()}`);
    return data;
}

export async function getAllPokemon() {
    const data = await getPokemonList(1025, 0);
    return data.results;
}