import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import { Footer } from './components/layout/Footer';
import { NavBar } from './components/navigation/NavBar';

import { MainPage } from './components/pages/MainPage';
import { RegistrationPage } from './components/pages/RegisterationPage';
import { AuthorizationPage } from './components/pages/AuthorizationPage';
import { LogoutPage } from './components/pages/LogoutPage';
import { AboutPage } from './components/pages/AboutPage';
import { EstatesPage } from './components/pages/EstatesPage';
import { EstatePage } from './components/pages/EstatePage';
import { CategoriesPage } from './components/pages/CategoriesPage';
import { CategoryPage } from './components/pages/CategoryPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { CartPage } from './components/pages/CartPage';

function App() {

	const [user, setUser] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("user")) {
    
            axios.get(`https://localhost:44315/api/Users/${JSON.parse(localStorage.getItem("user")).id}`)
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    localStorage.removeItem("user");
                    setUser(null);
                });
        } else {
            localStorage.removeItem("user");
            setUser(null);
        }
    });

	return (
		<>
            <Router>
                <NavBar {...{user, setUser}} />
                <div className="App">
                    <main>
                        <div>
                            <Routes>
                                <Route path='/' element={<MainPage />}/>
                                <Route path='/registration' element={<RegistrationPage {...{user, setUser}}/>}/>
                                <Route path='/authorization' element={<AuthorizationPage {...{user, setUser}}/>}/>
                                <Route path='/logout' element={<LogoutPage {...{user, setUser}}/>}/>
                                <Route path='/about' element={<AboutPage/>}/>
                                <Route path='/estates' element={<EstatesPage {...{user, setUser}}/>}/>
                                <Route path="/estates/:id" element={<EstatePage {...{user, setUser}} />} />
                                <Route path='/categories' element={<CategoriesPage {...{user, setUser}}/>}/>
                                <Route path="/categories/:id" element={<CategoryPage {...{user, setUser}} />} />
                                <Route path="/profile/:id" element={<ProfilePage {...{user, setUser}} />} />
                                <Route path='/cart' element={<CartPage {...{user, setUser}}/>}/>
                                <Route path='/*' element={(<h1>Або немає, або буде</h1>)}/>
                            </Routes>
                        </div>
                    </main>
					<Footer />
                </div>
            </Router>
        </>
	);
}

export default App;
