import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Paper, Typography, Divider, Button, Dialog, DialogContent, Container, Grid, TextField, IconButton } from "@mui/material";
import {Favorite as FavoriteIcon, FavoriteBorder as UnFavoriteIcon, Room as RoomIcon, Layers as LayersIcon, AttachMoney as AttachMoneyIcon, Delete as DeleteIcon } from "@mui/icons-material";

export const EstatePage = (props) => {
    const {user, setUser} = props;
    const [estate, setEstate] = useState({
        id: parseInt(useParams().id)
    });
    const [comments, setComments] = useState([]);
    const [errors, setErrors] = useState({
        estateRequest: '',
        likeRequest: '',
        commentRequest: '',
        categoryRequest: '',
        userRequest: ''
    });
    const [openDialog, setOpenDialog] = useState(false);

    const [newComment, setNewComment] = useState('');
    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [estateResponse, commentResponse, likeResponse, categoryResponse, userResponse] = await Promise.all([
                    axios.get(`https://localhost:44315/api/Estates/${estate.id}`).then((response) => response.data).catch(() => {
                        setErrors(prevErrors => ({ ...prevErrors, estateRequest: "Під час завантаження нерухомості сталася помилка!" }));
                        return null;
                    }),
                    axios.get("https://localhost:44315/api/EstateComments").then((response) => response.data).catch(() => {
                        setErrors(prevErrors => ({ ...prevErrors, commentRequest: "Під час завантаження коментарів сталася помилка!" }));
                        return [];
                    }),
                    axios.get("https://localhost:44315/api/EstateLikes").then((response) => response.data).catch(() => {
                        setErrors(prevErrors => ({ ...prevErrors, likeRequest: "Під час завантаження вподобань сталася помилка!" }));
                        return [];
                    }),
                    axios.get("https://localhost:44315/api/Categories").then((response) => response.data).catch(() => {
                        setErrors(prevErrors => ({ ...prevErrors, categoryRequest: "Під час завантаження категорії сталася помилка!" }));
                        return [];
                    }),
                    axios.get("https://localhost:44315/api/Users").then((response) => response.data).catch(() => {
                        setErrors(prevErrors => ({ ...prevErrors, userRequest: "Під час завантаження користувачів сталася помилка!" }));
                        return [];
                    })
                ]);
    
                const estateComments = commentResponse
                    .filter(comment => estateResponse && comment.estateId === estateResponse.id)
                    .map(comment => {
                        const user = userResponse.find(u => u.id === comment.userId);
                        return { ...comment, userName: user ? user.name : 'Unknown' };
                });
    
                if (estateResponse) {
                    const likeCount = likeResponse.filter(like => like.estateId === estateResponse.id).length;
                    const userLike = user ? likeResponse.find(like => like.estateId === estateResponse.id && like.userId === user.id) : null;
                    const isLikedByUser = !!userLike;
                    const likeId = userLike ? userLike.id : -1;
                    const commentsCount = estateComments.length;
                    const categoryName = categoryResponse.find(category => category.id === estateResponse.categoryId)?.name || "Unknown Category";
                
                    const enhancedEstate = {
                        ...estateResponse,
                        likeCount,
                        isLiked: isLikedByUser,
                        likeId,
                        commentsCount,
                        categoryName,
                    };
                
                    setEstate(enhancedEstate);
                    setComments(estateComments);
                }
    
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    estatesRequest: '',
                }));
            } catch (error) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    estatesRequest: "Під час завантаження нерухомості сталася помилка!",
                }));
            }
        };
    
        fetchData();
    });

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

    const handleAddToCartClick = () => {
        const userEmail = user.email;
        const estateId = estate.id;
    
        let cartData = JSON.parse(localStorage.getItem(userEmail)) || {};
    
        if (cartData[estateId]) {
            cartData[estateId] += 1;
        } else {
            cartData[estateId] = 1;
        }

        console.log("Added!");

        localStorage.setItem(userEmail, JSON.stringify(cartData));
    };

    const handleLikeClick = async (type) => {
        if (user && estate) {
            try {
                if (type === "add") {
                    let newLike = {
                        userId: user.id,
                        estateId: estate.id
                    }
                    await axios.post(`https://localhost:44315/api/EstateLikes`, newLike);
                } else {
                    await axios.delete(`https://localhost:44315/api/EstateLikes/${estate.likeId}`);
                }
            } catch (error) {
                const errorMessage = type === "add" ? 
                    "Під час збереження вподобайки сталася помилка!" :
                    "Під час видалення вподобайки сталася помилка!";
                setErrors(prevErrors => ({ ...prevErrors, commentRequest: errorMessage }));
            }
        }
    };

    const handleRemoveCommentClick = async (commentId) => {

        if (user) {
            try {
                axios.delete(`https://localhost:44315/api/EstateComments/${commentId}`).catch(() => {
                    setErrors(prevErrors => ({ ...prevErrors, commentRequest: "Під час видалення коментаря сталася помилка!" }));
                });
            } catch (error) {}
        }
    };

    const handleSubmitComment = async () => {
        if (newComment.trim().length > 0) {
            
            try {
                let comment = {
                    text: newComment,
                    estateId: estate.id,
                    userId: user.id
                };

                axios.post("https://localhost:44315/api/EstateComments", comment).then((response) => response.data).catch(() => {
                    setErrors(prevErrors => ({ ...prevErrors, commentRequest: "Під час додавання коментаря сталася помилка!" }));
                });
            } catch (error) {}

            setNewComment('');
        }
    };

    return (
        <Container>
            <Paper style={{marginTop: "50px", padding: "20px"}} sx={{p: "30px 10px 20px 10px"}}>
                <Typography variant="h5">{estate.title}</Typography>
                <Typography variant="h6">{estate.description}</Typography>
                <Grid container spacing={2} style={{ marginTop: "20px", textAlign: "center" }}>
                    <Grid item xs={12} md={6}>
                        <img src={estate.image} alt="Estate" style={{ width: '75%', height: 'auto', display: "block", marginLeft: "auto", marginRight: "auto" }} />
                    </Grid>
                    
                    <Grid item xs={12} md={6} style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Typography variant="body1" style={{ marginBottom: "10px" }}>
                            <RoomIcon /> <span style={{ fontWeight: "bold" }}>Кількість кімнат: {estate.roomCount}</span>
                        </Typography>
                        <Typography variant="body1" style={{ marginBottom: "10px" }}>
                            <LayersIcon /> <span style={{ fontWeight: "bold" }}>Кількість поверхів: {estate.floorCount}</span>
                        </Typography>
                        <Typography variant="body1" style={{ marginBottom: "10px" }}>
                            <AttachMoneyIcon /> <span style={{ fontWeight: "bold", fontStyle: "italic" }}>Вартість: {estate.price} грн</span>
                        </Typography>
                        <Button variant="contained" color="info" onClick={handleAddToCartClick}>
                            До кошику!
                        </Button>
                        {user !== null ? (
                            estate.isLiked ? (
                                <Button variant="contained" color="warning" style={{ marginTop: "15px" }} onClick={() => handleLikeClick("rem")}>
                                    Прибрати вподобайку!
                                </Button>
                            ) : (
                                <Button variant="contained" color="success" style={{ marginTop: "15px" }} onClick={() => handleLikeClick("add")}>
                                    Поставити вподобайку!
                                </Button>
                            )
                        ) : (
                            <Typography>Спочатку зайдіть в аккаунт!</Typography>
                        )}
                    </Grid>
                </Grid>

                {(errors.estateRequest || errors.likeRequest || errors.categoryRequest || errors.commentRequest || errors.userRequest) && (
                    <Dialog open={true} onClose={() => setOpenDialog(false)}>
                        <DialogContent>
                            <img src={randomGif} alt="Random GIF" />
                            <Typography variant="h6" mt={2}>Упс... Щось пішло не так!</Typography>
                            <Typography variant="body1" mt={2} sx={{textAlign: "right", color: "crimson"}}>{errors.estateRequest}</Typography>
                            <Typography variant="body1" mt={2} sx={{textAlign: "right", color: "crimson"}}>{errors.likeRequest}</Typography>
                            <Typography variant="body1" mt={2} sx={{textAlign: "right", color: "crimson"}}>{errors.commentRequest}</Typography>
                            <Typography variant="body1" mt={2} sx={{textAlign: "right", color: "crimson"}}>{errors.categoryRequest}</Typography>
                            <Typography variant="body1" mt={2} sx={{textAlign: "right", color: "crimson"}}>{errors.userRequest}</Typography>
                            <Button variant="contained" color="warning" onClick={() => window.location = "/"}>Перейти на головну</Button>
                        </DialogContent>
                    </Dialog>
                )}
            </Paper>

            <Paper style={{ marginTop: "20px", padding: "20px" }}>
                <TextField
                    label="Write a comment"
                    multiline
                    rows={4}
                    value={newComment}
                    onChange={handleCommentChange}
                    variant="outlined"
                    fullWidth
                    inputProps={{ maxLength: 255 }}
                    style={{ marginBottom: "20px" }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitComment}
                    disabled={newComment.trim().length === 0 || user === null}
                >
                    Надістлати
                </Button>
            </Paper>

            <Paper style={{ marginTop: "20px", padding: "20px" }}>
                {comments.length === 0 ? (
                    <Typography variant="subtitle1" style={{ textAlign: "center" }}>
                        Коментарів немає
                    </Typography>
                ) : (
                    comments.map((comment, index) => (
                        <Paper key={index} sx={{ p: "10px", m: "10px" }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ textAlign: "left" }}>
                                    <Typography variant="subtitle1">{comment.userName}</Typography>
                                    <Typography variant="body2">{comment.text}</Typography>
                                </div>
                                {user && (user.role === "Admin" || user.id === comment.userId) && (
                                    <IconButton
                                        aria-label="delete"
                                        size="small"
                                        style={{ color: 'red' }}
                                        onClick={() => handleRemoveCommentClick(comment.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                            </div>
                        </Paper>
                    ))
                )}
            </Paper>
        </Container>
    );
};