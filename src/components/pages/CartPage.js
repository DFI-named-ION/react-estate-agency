import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Paper, Typography, TextField, Button, List, ListItem, Divider, Dialog, DialogContent } from '@mui/material';

export const CartPage = (props) => {
    const { user } = props;
    const [cartItems, setCartItems] = useState([]);
    const [address, setAddress] = useState('');
    const [totalSum, setTotalSum] = useState(0);

    const [errors, setErrors] = useState({
        estateRequest: '',
        orderRequest: '',
        orderItemRequest: ''
    });
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        if (user === null) {
            window.location = "/";
            return;
        }

        const fetchCartItems = async () => {
            try {
                const cartData = JSON.parse(localStorage.getItem(user.email)) || {};
                const estateIds = Object.keys(cartData);
                const estatesResponse = await axios.get("https://localhost:44315/api/Estates");
                const estates = estatesResponse.data;

                let items = [];
                let total = 0;
                estateIds.forEach(id => {
                    const estate = estates.find(e => e.id === parseInt(id));
                    if (estate) {
                        const count = cartData[id];
                        const sum = estate.price * count;
                        total += sum;
                        items.push({ ...estate, count, sum });
                    }
                });

                setCartItems(items);
                setTotalSum(total);
            } catch (error) {
                setErrors(prevErrors => ({ ...prevErrors, estateRequest: "Під час завантаження нерухомості сталася помилка!" }));
            }
        };

        fetchCartItems();
    }, [user]);

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleOrder = async () => {
        const order = {
            userId: user.id,
            address: address
        };

        try {
            const orderResponse = await axios.post("https://localhost:44315/api/Orders", order);
            const orderId = orderResponse.data.id;

            for (const item of cartItems) {
                const orderItem = {
                    orderId: orderId,
                    estateId: item.id,
                    count: item.count
                };
                await axios.post("https://localhost:44315/api/OrderItems", orderItem);
            }

            localStorage.removeItem(user.email);
            setAddress('');
            alert("Поздоровляю з покупкою!");
        } catch (error) {
            setErrors(prevErrors => ({ ...prevErrors, orderRequest: "Під час створення замовлення сталася помилка!" }));
        }
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
            <Paper sx={{ p: "20px", mt: "50px" }}>
                <List>
                    {cartItems.map((item, index) => (
                        <ListItem key={index}>
                            <Typography>
                                {item.title} x {item.count} = {item.sum} грн
                            </Typography>
                        </ListItem>
                    ))}
                    <Divider />
                    <ListItem>
                        <Typography variant="h6">
                            Загальна вартість: {totalSum} грн
                        </Typography>
                    </ListItem>
                </List>
                <TextField
                    label="Адреса"
                    fullWidth
                    margin="normal"
                    value={address}
                    onChange={handleAddressChange}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOrder}
                    disabled={totalSum === 0 || address.trim() === ''}
                >
                    Замовити!
                </Button>
            </Paper>
            {(errors.estateRequest || errors.orderRequest || errors.orderItemRequest) && (
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
        </Container>
    );
};