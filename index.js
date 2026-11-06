import 'dotenv/config';
import express from 'express';
import jaratroute from './routes/jaratokRoute.js';
import repuloterroute from './routes/repuloterRoute.js';
import legiroute from './routes/legitarsasagRoute.js';
import utvonalroute from './routes/utvaonalRoute.js';

let vegpontok = [
    { vegpont: `http://localhost:${process.env.PORT ?? 3000}/jaratok`, leiras: 'Járatok' },
    { vegpont: `http://localhost:${process.env.PORT ?? 3000}/repuloterek`, leiras: 'Repülőterek' },
    { vegpont: `http://localhost:${process.env.PORT ?? 3000}/legitarsasagok`, leirás: 'Légitársaságok'},
    { vegpont: `http://localhost:${process.env.PORT ?? 3000}/utvonalak`, leirás: 'Útvonalak'}
]

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT ?? 3000);

app.use('/jaratok', jaratroute);
app.use('/repuloterek', repuloterroute);
app.use('/legitarsasagok', legiroute);
app.use('/utvonalak', utvonalroute);

app.use('/', (req, res) => {
    res.status(404).json(vegpontok);
});

app.use((err, res, req) => {
    console.error(err);
    res.status(500).json({ hiba: 'Belső szerverhiba' });
});

app.listen(PORT, () => console.log(`Szerver fut: http://localhost:${PORT}`));