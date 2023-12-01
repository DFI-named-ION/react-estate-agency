import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

export const AuthMode = (props) => {
    const {user, setUser} = props;

    if (user === null) {
        return (
            <div className='mx-3 me-0 d-flex'>
                <Link to='/authorization' className='btn btn-outline-warning'>Авторизація</Link>
                &nbsp;&nbsp;
                <Link to='/registration' className='btn btn-outline-warning'>Реєстрація</Link>
            </div>
        );
    } else {
        return (
            <div className='me-5 d-flex'>
                <li className="nav-item dropdown d-flex btn btn-outline-warning">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {user.name}
                    </a>
                    <ul className="dropdown-menu">
                        <li>
                            <Link to={`/profile/${user.id}`} className="dropdown-item">Профіль</Link>
                        </li>
                        <li>
                            <Link to={`/cart`} className="dropdown-item">Кошик</Link>
                        </li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li><Link to='/logout' className="dropdown-item">Вийти</Link></li>
                    </ul>
                </li>
            </div>
        );
    }
}