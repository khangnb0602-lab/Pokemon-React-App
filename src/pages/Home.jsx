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

    const [query, setQuery] = useState("");

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

    const term = query.trim().toLowerCase();
    const filtered = allPokemon.filter((p) => p.name.includes(term));
    const visible = filtered.slice(0, visibleCount);

    return (
        <>
            <h1>Browse Pokémon</h1>
            <input
                type="search"
                className="search"
                placeholder="Search Pokémon by name..."
                aria-label="Search Pokémon by name"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setVisibleCount(PAGE_SIZE);
                }}
            />
            <p className="results-count">
                Showing {visible.length} of {filtered.length} Pokémon
            </p>

            {filtered.length === 0 ? (
                <p className="status">No Pokémon match your search.</p>
            ) : (
                <div className="grid">
                    {visible.map((p) => (
                        <PokemonCard key={p.name} name={p.name} url={p.url} />
                    ))}
                </div>
            )}

            {visibleCount < filtered.length && (
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