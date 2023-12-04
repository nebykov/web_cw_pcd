import './navbar.scss'
import logo from '../../assets/prince-logo.png'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/useRedux'
import UserBlock from './UserBlock/UserBlock'


const NavBar = () => {
    const { isAuth } = useAppSelector(state => state.user)
    return (
        <header className="navbar">
            <div className="nav_wrapper">
                <div className='navbar__logo'>
                    <img src={logo} alt="Logo" />
                </div>
                <nav>
                    {
                        !isAuth ?
                            <>
                                <Link to='/auth'>
                                    <span>Log In</span>
                                </Link>
                                <Link to='/registration'>
                                    <span>Registration</span>
                                </Link>
                            </>
                            :
                            <UserBlock />
                    }
                </nav>
            </div>
        </header>
    )
}

export default NavBar