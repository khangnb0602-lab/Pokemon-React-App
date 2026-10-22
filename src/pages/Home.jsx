import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import { getPokemonList } from "../services/pokemonApi";

const PAGE_SIZE = 20;

export default function Home() {
    const [pokemon, setPokemon] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                const data = await getPokemonList(PAGE_SIZE, offset);
                setPokemon((prev) => [...prev, ...data.results]);
                setHasMore(Boolean(data.next));
            } catch (err) {
                setError("Could not load Pokémon. Please try again.");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [offset]);

    if (error) return <p>{error}</p>;

    return (
        <>
            <h1>Browse Pokémon</h1>
            <div className="grid">
                {pokemon.map((p) => (
                    <PokemonCard key={p.name} name={p.name} url={p.url} />
                ))}
            </div>

            {loading && <p className="status">Loading...</p>}
            {!loading && hasMore && (
                <button
                    className="btn"
                    onClick={() => setOffset((o) => o + PAGE_SIZE)}
                >
                    Load more
                </button>
            )}
        </>
    );
}