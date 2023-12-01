import React from 'react';
import { Container, Typography, Grid, Paper, CardMedia, Divider } from '@mui/material';

export const AboutPage = () => {
    return (
        <Container>
            <Paper sx={{ p: 2, textAlign: 'center', mb: 2, mt: 5 }}>
                <Typography variant="h3" sx={{ mb: 2 }}>
                    Про нас
                </Typography>
                <CardMedia
                    component="img"
                    height="600"
                    image="/img/carousel-1.jpg"
                    alt="Фото"
                    sx={{ mx: 'auto', mb: 2 }}
                />
                <Typography variant="body1">
                    Суть нашого сайту - спільнота, яка об'єднує власників нерухомості та цінителів комфортного життя.
                    Обмінюйтеся порадами щодо купівлі, продажу та оформлення домівок, діліться враженнями від проживання в різних районах та знаходьте ідеальне місце для життя.
                    Приєднуйтесь до нас, і разом ми створимо ідеальне середовище для любителів затишку та комфорту!
                </Typography>
            </Paper>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <CardMedia
                            component="img"
                            height="550"
                            image="/img/service-3.jpg"
                            alt="Фото"
                            sx={{ mx: 'auto', mb: 2 }}
                        />
                        <Typography variant="body1">
                            Адміністратор сайту на зустрічі з ріелторами!
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="body1" sx={{textAlign: "justify"}}>
                            &nbsp;&nbsp;&nbsp;&nbsp;Наш сайт - місце зустрічі для всіх, хто шукає або продає нерухомість!
                            З радістю представляємо вам форум, створений спеціально для вас.
                            Тут ви знайдете інформацію про різноманітні типи нерухомості, райони проживання, ціни та інші важливі аспекти.
                            Ми об'єднуємо досвід та поради від провідних експертів у сфері нерухомості, допомагаючи вам знайти ідеальний дім.
                            <br/>
                            <br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;Але це не все! На нашому сайті ви також знайдете поради щодо оформлення та облаштування вашого житла.
                            Ми регулярно публікуємо ідеї для дизайну інтер'єру, допомагаючи вам створити затишок та красу у вашому домі.
                        </Typography>
                        <Typography variant="body1" sx={{textAlign: "right"}}>
                            Сгенеровано нейромережею
                        </Typography>
                    </Paper>
                    <Paper sx={{ p: 2, textAlign: 'center', mt: 1 }}>
                        <Typography variant="body1" sx={{textAlign: "justify"}}>
                            &nbsp;&nbsp;&nbsp;&nbsp;Комфорт та затишок - ключові складові щасливого життя.
                            Ми віримо, що кожен заслуговує на ідеальний дім, де можна відчувати себе затишно та безпечно. Наш сайт покликаний допомогти вам знайти саме таке місце.
                            <br/>
                            <br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;Дім - це не просто стіни та дах. Це місце, де зберігаються наші спогади, мрії та емоції.
                            Тому важливо підібрати житло, яке буде відповідати всім вашим потребам та бажанням. Наш сайт допоможе вам у цьому, надаючи вичерпну інформацію та корисні поради.
                        </Typography>
                        <Typography variant="body1" sx={{textAlign: "right"}}>
                            Сгенеровано нейромережею
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Paper sx={{p: 4}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <img src="/img/team-1.jpg" alt="Галерея" style={{ width: '100%', height: 'auto' }} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <img src="/img/service-2.jpg" alt="Галерея" style={{ width: '100%', height: 'auto' }} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <img src="/img/service-3.jpg" alt="Галерея" style={{ width: '100%', height: 'auto' }} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <img src="/img/service-4.jpg" alt="Галерея" style={{ width: '100%', height: 'auto' }} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <img src="/img/team-4.jpg" alt="Галерея" style={{ width: '100%', height: 'auto' }} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <img src="/img/service-6.jpg" alt="Галерея" style={{ width: '100%', height: 'auto' }} />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};
