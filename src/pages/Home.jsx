import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import { getAllPokemon } from "../services/pokemonApi";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";

const PAGE_SIZE = 20;

export default function Home() {
    const [allPokemon, setAllPokemon] = useState([]);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function load() {
            try {
                setAllPokemon(await getAllPokemon());
            } catch {
                setError("Could not load Pokémon. Please try again.");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <>
            <h1>Browse Pokémon</h1>
            <div className="grid">
                {allPokemon.slice(0, visibleCount).map((p) => (
                    <PokemonCard key={p.name} name={p.name} url={p.url} />
                ))}
            </div>

            {visibleCount < allPokemon.length && (
                <button
                    className="btn"
                    onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                >
                    Load more
                </button>
            )}
        </>
    );
}