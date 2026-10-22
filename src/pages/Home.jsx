import { useEffect, useState } from 'react';
import { getPokemonList } from '../services/pokemonApi';

export default function Home() {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function load() {
            try {
                const data = await getPokemonList();
                setPokemon(data.results);
            } catch (error) {
                setError("Cannot load Pokmeon list. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <ul>
            {pokemon.map((p) => (
                <li key={p.name}>{p.name}</li>
            ))}
        </ul>
    )
}