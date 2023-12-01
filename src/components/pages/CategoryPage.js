import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Typography, Grid, Container, TextField, IconButton, Card, CardContent, CardActions, Paper, Dialog, DialogContent, Button } from "@mui/material";
import { Search as SearchIcon, Favorite as FavoriteIcon } from "@mui/icons-material";

export const CategoryPage = (props) => {
    const {user, setUser} = props;
    const [category, setCategory] = useState({
        id: parseInt(useParams().id)
    });
    const [estates, setEstates] = useState([]);
    const [errors, setErrors] = useState({
        estateRequest: '',
        likeRequest: '',
        commentRequest: '',
        categoryRequest: ''
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const [estateResponse, commentResponse, likeResponse, categoryResponse] = await Promise.all([
                    axios.get("https://localhost:44315/api/Estates").then((response) => response.data).catch(() => {
                        setErrors(prevErrors => ({ ...prevErrors, estateRequest: "Під час завантаження нерухомості сталася помилка!" }));
                        return [];
                    }),
                    axios.get("https://localhost:44315/api/EstateComments").then((response) => response.data).catch(() => {
                        setErrors(prevErrors => ({ ...prevErrors, commentRequest: "Під час завантаження коментарів сталася помилка!" }));
                        return [];
                    }),
                    axios.get("https://localhost:44315/api/EstateLikes").then((response) => response.data).catch(() => {
                        setErrors(prevErrors => ({ ...prevErrors, likeRequest: "Під час завантаження вподобань сталася помилка!" }));
                        return [];
                    }),
                    axios.get(`https://localhost:44315/api/Categories/${category.id}`).then((response) => response.data).catch(() => {
                        setErrors(prevErrors => ({ ...prevErrors, categoryRequest: "Під час завантаження категорії сталася помилка!" }));
                        return [];
                    }),
                ]);

                setCategory({...category, name: categoryResponse.name})

                const enhancedEstates = estateResponse.map(estate => {
                    const likesCount = likeResponse.filter(like => like.estateId === estate.id).length;
                    const isLikedByUser = user ? likeResponse.some(like => like.estateId === estate.id && like.userId === user.id) : false;
                    const commentsCount = commentResponse.filter(comment => comment.estateId === estate.id).length;
                    const categoryName = category.name;
                
                    return {
                        ...estate,
                        likesCount,
                        isLiked: isLikedByUser,
                        commentsCount,
                        categoryName,
                    };
                });

                const filteredEstates = enhancedEstates.filter(estate => estate.categoryId === category.id);
    
                setEstates(filteredEstates);

            } catch (error) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    receiptsRequest: "Під час завантаження категорії сталася помилка!",
                }));
            }
        };
    
        fetchData();
    });

    const handleSearch = (event) => {
        const { value } = event.target;
        setSearchText(value);
      
        const filteredEstates = estates.filter((estate) => {
            const searchTerm = value.toLowerCase();
            return (
                estate.title.toLowerCase().includes(searchTerm) ||
                estate.description.toLowerCase().includes(searchTerm)
            );
        });
      
        setSearchResults(filteredEstates);
    };


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
        <Container>
            <Paper style={{marginTop: "50px", padding: "20px"}} sx={{p: "30px 10px 20px 10px"}}>
                <Typography variant="h4"><span style={{fontWeight: "bold"}}>{category.name}</span></Typography>
                <TextField
                    label="Пошук"
                    variant="outlined"
                    fullWidth
                    color="warning"
                    InputProps={{
                        endAdornment: (
                        <IconButton>
                            <SearchIcon color="warning" />
                        </IconButton>
                        ),
                    }}
                    sx={{ marginTop: "50px", marginBottom: "20px" }}
                    onChange={handleSearch}
                    value={searchText}
                />
                {searchText.length > 0 ?
                    <>
                        <Typography variant="h5" mb={3}>Результати пошуку</Typography>
                        {searchResults.length > 0 ?
                            <>
                                <Grid container spacing={2}>
                                {searchResults
                                    .map((res) => (
                                        <Grid key={res.id} item xs={12} sm={6}>
                                            <Link to={`estates/${res.id}`} style={{ textDecoration: 'none' }}>
                                                <Card>
                                                    <CardContent>
                                                        <Typography variant="h6">{res.title}</Typography>
                                                    </CardContent>
                                                    <CardActions disableSpacing>
                                                        <IconButton style={{ pointerEvents: 'none' }}>
                                                            {res?.isLiked ? <FavoriteIcon color="warning" /> : <FavoriteIcon />}
                                                        </IconButton>
                                                        <div style={{ marginLeft: "auto" }}>
                                                            <Typography><span style={{fontWeight: "bold"}}>{res.likesCount}</span> лайків</Typography>
                                                        </div>
                                                        <div style={{ marginLeft: "auto" }}>
                                                            <Typography><span style={{fontWeight: "bold"}}>{res.commentsCount}</span> коментів</Typography>
                                                        </div>
                                                    </CardActions>
                                                </Card>
                                            </Link>
                                        </Grid>
                                    ))}
                                </Grid>
                            </>
                            :
                            <>
                                <Typography variant="body1" mb={3}>Схоже, що нічого подібного не знайдено...</Typography>
                            </>
                        }
                    </>
                :
                    <>
                        <Typography variant="h5" mb={3}>Добірка популярних пропозицій</Typography>
                        <Grid container spacing={2}>
                            {estates
                                .sort((a, b) => b?.likes - a?.likes)
                                .slice(0, 6)
                                .map((res) => (
                                    <Grid key={res.id} item xs={12} sm={6}>
                                        <Link to={`/estates/${res.id}`} style={{ textDecoration: 'none' }}>
                                            <Card>
                                                <CardContent>
                                                    <Typography variant="h6">{res.title}</Typography>
                                                </CardContent>
                                                <CardActions disableSpacing>
                                                    <IconButton style={{ pointerEvents: 'none' }}>
                                                        {res?.isLiked ? <FavoriteIcon color="warning" /> : <FavoriteIcon />}
                                                    </IconButton>
                                                    <div style={{ marginLeft: "auto" }}>
                                                        <Typography><span style={{fontWeight: "bold"}}>{res.likesCount}</span> лайків</Typography>
                                                    </div>
                                                    <div style={{ marginLeft: "auto" }}>
                                                        <Typography><span style={{fontWeight: "bold"}}>{res.commentsCount}</span> коментів</Typography>
                                                    </div>
                                                </CardActions>
                                            </Card>
                                        </Link>
                                    </Grid>
                            ))}
                        </Grid>
                    </>
                }
                {(errors.estateRequest || errors.likeRequest || errors.categoryRequest || errors.commentRequest) && (
                    <Dialog open={true} onClose={() => setOpenDialog(false)}>
                        <DialogContent>
                            <img src={randomGif} alt="Random GIF" />
                            <Typography variant="h6" mt={2}>Упс... Щось пішло не так!</Typography>
                            <Typography variant="body1" mt={2} sx={{textAlign: "right", color: "crimson"}}>{errors.estateRequest}</Typography>
                            <Typography variant="body1" mt={2} sx={{textAlign: "right", color: "crimson"}}>{errors.likeRequest}</Typography>
                            <Typography variant="body1" mt={2} sx={{textAlign: "right", color: "crimson"}}>{errors.commentRequest}</Typography>
                            <Typography variant="body1" mt={2} sx={{textAlign: "right", color: "crimson"}}>{errors.categoryRequest}</Typography>
                            <Button variant="contained" color="warning" onClick={() => window.location = "/"}>Перейти на головну</Button>
                        </DialogContent>
                    </Dialog>
                )}
            </Paper>
        </Container>
    );
};