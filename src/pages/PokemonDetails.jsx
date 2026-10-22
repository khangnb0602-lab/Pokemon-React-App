import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPokemonByName } from "../services/pokemonApi";

export default function PokemonDetails() {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function load() {
            setLoading(true);
            setError(null);
            try {
                setPokemon(await getPokemonByName(name));
            } catch (err) {
                setError(`Pokémon "${name}" was not found.`);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [name]); // refetch when the URL param changes

    if (loading) return <p>Loading...</p>;
    if (error) {
        return (
            <div>
                <p>{error}</p>
                <Link to="/">← Back</Link>
            </div>
        );
    }

    const image = pokemon.sprites.other["official-artwork"].front_default;

    return (
        <article className="details">
            <Link to="/" className="back-link">← Back</Link>

            <div className="details__header">
                <img src={image} alt={pokemon.name} />
                <div>
                    <h1>{pokemon.name}</h1>
                    <p>
                        Height: {pokemon.height / 10} m · Weight: {pokemon.weight / 10} kg
                    </p>
                    <div className="badges">
                        {pokemon.types.map((t) => (
                            <span key={t.type.name} className={`badge badge--${t.type.name}`}>
                                {t.type.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <section>
                <h2>Abilities</h2>
                <ul className="abilities">
                    {pokemon.abilities.map((a) => (
                        <li key={a.ability.name}>
                            {a.ability.name.replace("-", " ")}
                            {a.is_hidden && <em> (hidden)</em>}
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Base stats</h2>
                {pokemon.stats.map((s) => (
                    <div key={s.stat.name} className="stat">
                        <span className="stat__label">{s.stat.name}</span>
                        <div className="stat__bar">
                            <div
                                className="stat__fill"
                                style={{ width: `${Math.min(s.base_stat, 150) / 1.5}%` }}
                            />
                        </div>
                        <span>{s.base_stat}</span>
                    </div>
                ))}
            </section>
        </article>
    );
}