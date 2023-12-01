import React, { useState, useEffect } from "react";
import axios from "axios";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const RegistrationPage = (props) => {
    const {user, setUser} = props;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        password2: '',
        request: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (user !== null) {
            window.location = "/";
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch(name){
            case "password":
                setPassword(value);
                break;
            case "password2":
                setPassword2(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "name":
                setName(value);
                break;
        };
    };

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleReset = (e) => {
        e.preventDefault();
        setName('');
        setPassword('');
        setPassword2('');
        setEmail('');
    };

    const checkInputs = async () => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        const passwordRegex = /^(?=[A-Za-z_])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d_!@#$%^&*]{8,50}$/;
        let hasErrors = false;

        if (!emailRegex.test(email)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: "Ваша пошта не відповідає стандартам!",
            }));
            hasErrors = true;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: '',
            }));
        }
        
        if (!passwordRegex.test(password)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: "Ваш пароль має бути довшим за 8 символів та меншим за 50 символів, та обов'язково мати хоча б 1 літеру, 1 цифру та 1 спец символ!",
            }));
            hasErrors = true;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: '',
            }));
        }
          
        if (password !== password2) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password2: "Паролі відрізняються!",
            }));
            hasErrors = true;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password2: '',
            }));
        }

        return hasErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!await checkInputs()) {
            try {
                let newUser = {
                    name: name,
                    email: email,
                    password: password,
                    roleId: 1
                };
                
                let response = await axios.get("https://localhost:44315/api/Users");
                if (response.data.filter((u) => u.email === email).length > 0) {
                    console.log("Throw");
                    throw "";
                }

                axios.post("https://localhost:44315/api/Users", newUser).then(response => {
                    setUser(response.data);
                    localStorage.setItem("user", JSON.stringify(response.data));
                    window.location = "/";
                });

            } catch (error) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    request: "Під час реєстрації сталася помилка!",
                }));
            }
        }
    };

    return (
        <Container maxWidth="lg">
            <div className="mt-5" style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ flex: "2", background: `url('/img/service-2.jpg')`, backgroundSize: "cover", backgroundRepeat: "no-repeat"}}/>
                <div style={{ flex: "1", padding: "20px", minWidth: "500px" }}>
                    <Typography variant="h4" align="center">
                        Форма реєстрації
                    </Typography>
                    <form onSubmit={handleSubmit} onReset={handleReset}>
                        <TextField
                            fullWidth
                            label="Ім'я"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            required
                            InputProps={{
                                maxLength: 50,
                                startAdornment: (
                                    <AccountCircleIcon color="success" fontSize="small" style={{ marginRight: "8px" }} />
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Пошта"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            required
                            InputProps={{
                                maxLength: 50,
                                startAdornment: (
                                    <AccountCircleIcon color="success" fontSize="small" style={{ marginRight: "8px" }} />
                                ),
                            }}
                            helperText={errors.email && (
                                <div style={{ color: "red" }}>{errors.email}</div>
                            )}
                        />
                        <TextField
                            fullWidth
                            label="Пароль"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            required
                            InputProps={{
                                maxLength: 50,
                                startAdornment: (
                                    <AccountCircleIcon color="success" fontSize="small" style={{ marginRight: "8px" }} />
                                ),
                                endAdornment: (
                                    <Button onClick={handlePasswordVisibility} size="small">
                                    {showPassword ? <VisibilityOffIcon color="success" /> : <VisibilityIcon color="success" />}
                                    </Button>
                                ),
                            }}
                            helperText={errors.password && (
                                <div style={{ color: "red" }}>{errors.password}</div>
                            )}
                        />
                        <TextField
                            fullWidth
                            label="Підтвердження паролю"
                            name="password2"
                            type={showPassword ? "text" : "password"}
                            value={password2}
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            required
                            inputProps={{
                                maxLength: 50,
                            }}
                            helperText={errors.password2 && (
                                <div style={{ color: "red" }}>{errors.password2}</div>
                            )}
                        />
                        {errors.request && (
                            <div style={{ color: "red" }}>{errors.request}</div>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            fullWidth
                            size="large"
                            className="mt-3">
                            Зареєструватися!
                        </Button>
                        <Button
                            type="reset"
                            variant="contained"
                            color="warning"
                            fullWidth
                            size="large"
                            className="mt-3">
                            Скинути
                        </Button>
                    </form>
                </div>
            </div>
        </Container>
    );
}