import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import { Typography, Grid, Container, TextField, IconButton, Card, 
    CardContent, CardActions, Paper, Dialog, DialogContent, Button } from "@mui/material";
import { Edit as EditIcon, Done as DoneIcon, Cancel as CancelIcon } from '@mui/icons-material';

export const ProfilePage = (props) => {
    const {user, setUser} = props;
    const [searchingUser, setSearchingUser]= useState({
        id: parseInt(useParams().id)
    });
    const [errors, setErrors] = useState({
        userRequest: ''
    });
    const [openDialog, setOpenDialog] = useState(false);

    // NAME
    const [isNameEditing, setIsNameEditing] = useState(false);
    const [tempName, setTempName] = useState(user?.name || '');

    const handleEditNameClick = () => {
        setIsNameEditing(true);
    };
    const handleCancelNameClick = () => {
        setIsNameEditing(false);
        setTempName(user?.name || '');
    };
    const handleSaveNameClick = () => {
        setIsNameEditing(false);
        setUser((prevUser) => ({
            ...prevUser,
            name: tempName,
        }));
    };

    // PASSWORD
    const [isPasswordEditing, setIsPasswordEditing] = useState(false);
    const [tempPassword, setTempPassword] = useState(user?.password || '');

    const handleEditPasswordClick = () => {
        setIsPasswordEditing(true);
    };
    const handleCancelPasswordClick = () => {
        setIsPasswordEditing(false);
        setTempPassword(user?.password || '');
    };
    const handleSavePasswordClick = () => {
        setIsPasswordEditing(false);
        setUser((prevUser) => ({
            ...prevUser,
            password: tempPassword,
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (searchingUser) {
                    let u = await axios.get("https://localhost:44315/api/User/" + searchingUser.id).then((respnse) => respnse.data);
                    setSearchingUser(u);
                }
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    userRequest: '',
                }));
            } catch (error) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    userRequest: 'Під час збереження інформації, щось пішло не так!',
                }));
            }
        };
    
        fetchData();
    }, [searchingUser]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user && user.id) {
                    localStorage.setItem('user', JSON.stringify(user));
                    await axios.put('https://localhost:44315/api/User/' + user.id, user);
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        userRequest: '',
                    }));
                }
            } catch (error) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    userRequest: 'Під час збереження інформації, щось пішло не так!',
                }));
            }
        };
    
        fetchData();
    }, [user]);

    const getRandomGif = () => {
        let data = [
            'https://media.giphy.com/media/3o6gE405qTZbYJHL0c/giphy.gif',
            'https://media.giphy.com/media/xT0GqszD0iDNq4YVpK/giphy.gif',
            'https://media.giphy.com/media/FXUJfwaLa5Q5F2H0zs/giphy.gif',
            'https://media.giphy.com/media/l41YokBAkjQZJ3Ds4/giphy.gif',
            'https://media.giphy.com/media/3oEjHEW5Ane7JX9Wr6/giphy.gif',
            'https://media.giphy.com/media/3o6gE5upyO0iQLxG1O/giphy.gif',
            'https://media.giphy.com/media/xT0GqFtTJBcNOdE9q0/giphy.gif',
            'https://media.giphy.com/media/3o6gE5cIANLpEBJokw/giphy.gif',
            'https://media.giphy.com/media/l41YpSn2y34Tz3vAk/giphy.gif',
            'https://media.giphy.com/media/3o7TKu0Pi947RZKo4E/giphy.gif',
            'https://media.giphy.com/media/l3vR4GeAVzSNPrcU8/giphy.gif',
            'https://media.giphy.com/media/l3vR7viIC98UJ79QI/giphy.gif',
            'https://media.giphy.com/media/3o6ZtpXCuo7totKZRm/giphy.gif',
            'https://media.giphy.com/media/3o6ZtflGh4meTzAJvq/giphy.gif',
            'https://media.giphy.com/media/l378rn2HLmGP5AnT2/giphy.gif',
            'https://media.giphy.com/media/9P1uT16ftIklT5ccsD/giphy.gif',
            'https://media.giphy.com/media/5Phplvwyk6rLXQUytd/giphy.gif',
            'https://media.giphy.com/media/BCeJKjpLTTYdkiQa8U/giphy.gif',
            'https://media.giphy.com/media/97F3NAIxcMSOH1ZlFH/giphy.gif',
            'https://media.giphy.com/media/gFt8NdWebiGRhcsTRS/giphy.gif',
            'https://media.giphy.com/media/OdvGHtngRi0Sy1eRba/giphy.gif',
            'https://media.giphy.com/media/zVRYxjLcmNK9a4vfUf/giphy.gif'
        ];

        const index = Math.floor(Math.random() * data.length);
        return data[index];
    };
    const [randomGif] = useState(getRandomGif());

    return (
        <Container maxWidth="lg">
            <Paper sx={{p: "30px 10px 20px 10px", marginTop: "50px"}}>
                {searchingUser ?
                    <>
                        <Typography variant="h4" mb={3}>Профіль користувача</Typography>
                        <Grid container spacing={2}>
                            <Grid key={2} item xs={12} sm={4} sx={{ textAlign: 'left' }}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">Ім'я</Typography>
                                        <Typography variant="body1" color="textSecondary">
                                            {isNameEditing ? (
                                                <TextField
                                                    helperText="Введіть нове значення"
                                                    variant="standard"
                                                    color="success"
                                                    value={tempName}
                                                    onChange={(event) => setTempName(event.target.value)}
                                                    fullWidth
                                                    sx={{ marginTop: "15px" }}
                                                />
                                            ) : (
                                                user?.name
                                            )}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        {user ? (
                                            <>
                                                {isNameEditing ? (
                                                    <>
                                                        <IconButton onClick={handleSaveNameClick} color="success">
                                                            <DoneIcon />
                                                        </IconButton>
                                                        <div style={{ marginLeft: "auto" }}>
                                                            <IconButton onClick={handleCancelNameClick} color="warning">
                                                                <CancelIcon />
                                                            </IconButton>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <IconButton onClick={handleEditNameClick} color="success">
                                                        <EditIcon />
                                                    </IconButton>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                            </>
                                        )}
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid key={3} item xs={12} sm={4} sx={{ textAlign: 'left' }}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">Пароль</Typography>
                                        <Typography variant="body1" color="textSecondary">
                                            {isPasswordEditing ? (
                                                <TextField
                                                    helperText="Введіть нове значення"
                                                    variant="standard"
                                                    color="success"
                                                    value={tempPassword}
                                                    onChange={(event) => setTempPassword(event.target.value)}
                                                    fullWidth
                                                    sx={{ marginTop: "15px" }}
                                                />
                                            ) : (
                                                user?.password
                                            )}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        {user ? (
                                            <>
                                                {isPasswordEditing ? (
                                                    <>
                                                        <IconButton onClick={handleSavePasswordClick} color="success">
                                                            <DoneIcon />
                                                        </IconButton>
                                                        <div style={{ marginLeft: "auto" }}>
                                                            <IconButton onClick={handleCancelPasswordClick} color="warning">
                                                                <CancelIcon />
                                                            </IconButton>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <IconButton onClick={handleEditPasswordClick} color="success">
                                                        <EditIcon />
                                                    </IconButton>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                            </>
                                        )}
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    </>
                :
                    <Typography variant="h4" mt={2}>Спочатку треба авторизуватися!</Typography>
                }
            </Paper>
            {(errors?.userRequest) && (
                <Dialog open={true} onClose={() => setOpenDialog(false)}>
                    <DialogContent>
                        <img src={randomGif} alt="Random GIF" />
                        <Typography variant="h6" mt={2}>Упс... Щось пішло не так!</Typography>
                        <Typography variant="body1" mt={2} sx={{textAlign: "right", color: "crimson"}}>{errors?.receiptsRequest}</Typography>
                        <Button variant="contained" color="warning" onClick={() => window.location = "/"}>Перейти на головну</Button>
                    </DialogContent>
                </Dialog>
            )}
        </Container>
    );
};