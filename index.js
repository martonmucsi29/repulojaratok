import 'dotenv/config';
import express from 'express';
import pool from './utils/db.js';
import jaratroute from './routes/jaratokRoute.js';
import repuloterroute from './routes/repuloterRoute.js';

let vegpontok = [
    { vegpont: `http://localhost:${process.env.PORT ?? 3000}/jaratok`, leiras: 'Járatok' },
    { vegpont: `http://localhost:${process.env.PORT ?? 3000}/repuloterek`, leiras: 'repuloterek' }
]

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT ?? 3000);

app.use('/jaratok', jaratroute);
app.use('/repuloterek', repuloterroute);

app.use('/', (req, res) => {
    res.status(404).json(vegpontok);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ hiba: 'Belső szerverhiba' });
});

app.listen(PORT, () => console.log(`Szerver fut: http://localhost:${PORT}`));