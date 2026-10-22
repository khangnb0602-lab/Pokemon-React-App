import { Link } from 'react-router-dom'

// pokeapi.co/api/v2/pokemon/{id}/

function getIdFromUrl(url) {
    return url.split('/').filter(Boolean).pop();
}

export default function PokemonCard({ name, url }) {
    const id = getIdFromUrl(url);
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    return (
        <Link to={`/pokemon/${name}`} className="card">
            <img src={image} alt={name} loading="lazy" />
            <span className="card__id">#{id.padStart(3, '0')}</span>
            <h2 className="card__name">{name}</h2>
        </Link>
    );
}