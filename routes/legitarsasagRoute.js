import pool from '../utils/db.js';
import { Router } from 'express';

const legirouter = Router();

legirouter.get('/', async (req, res) => {
    let sql = `SELECT legitarsasagok.kod, legitarsasagok.nev, COUNT(legitarsasagok.nev) AS jaratDB, COUNT(jaratok.hova_id) AS celallomasDB FROM legitarsasagok JOIN jaratok ON jaratok.legitarsasag_id = legitarsasagok.id GROUP BY legitarsasagok.nev ORDER BY jaratok.jaratszam DESC, legitarsasagok.nev DESC`;
    let eredmeny = await pool.query(sql);
    res.json(eredmeny);
});


export default legirouter;