import { Link } from 'react-router-dom';
import { AuthMode } from './AuthMode';

export const NavBar = (props) => {
    const {user, setUser} = props;

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-success navbar-light px-5" style={{minWidth: "0px"}}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Estate Agency</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#hidden" aria-controls="hidden" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="hidden">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className='nav-item'>
                                <Link to='/about' className='nav-link active'>Про сайт</Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/categories' className='nav-link active'>Категорії</Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/estates' className='nav-link active'>Нерухомість</Link>
                            </li>
                        </ul>
                        {/* <form className="d-flex me-3" role="search">
                            <input className="form-control me-2" type="search" placeholder="Пошук" aria-label="Search"/>
                            <button className="btn btn-outline-dark" type="submit">Пошук</button>
                        </form> */}
                        <AuthMode {...{user, setUser}}/>
                    </div>
                </div>
            </nav>
        </>
    )
}