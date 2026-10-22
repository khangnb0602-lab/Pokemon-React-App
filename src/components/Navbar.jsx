import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <header className="navbar">
            <Link to="/" className="navbar__brand">Pokedex</Link>
        </header>
    )
}