import { useEffect, useState } from 'react';
import { getPokemonList } from '../services/pokemonApi';
import PokemonCard from '../components/PokemonCard';

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
        <div className="pokemon-grid">
            {pokemon.map((p) => (
                <PokemonCard key={p.name} name={p.name} url={p.url} />
            ))}
        </div>
    )
}