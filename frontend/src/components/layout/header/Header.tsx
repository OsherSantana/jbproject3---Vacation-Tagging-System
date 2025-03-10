import { NavLink } from 'react-router-dom'
import './Header.css'

export default function Header() {
    return (
        <div className='Header'>
            <div>
                Logo
            </div>
            <div>
                <nav>
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/create">Create Book</NavLink>
                </nav>
            </div>
        </div>
    )
}