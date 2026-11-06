import pool from '../utils/db.js';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    let params = [];
    let szurok = [];

    const {legitarsasag} = req.query;
    let {honnan, hova} = req.query;

    if (!honnan || honnan.length > 3 || !hova || hova > 3) {
        res.status(400).json({ hiba: 'Az induló és végállomások 3 karakter hosszú kódját adja meg' });
        return;
    }

    if(legitarsasag) {
        params.push(legitarsasag);
        szurok.push(`legitarsasagok.kod = ?`);
    }
    if(honnan){
        params.push(honnan);
        szurok.push(`indul.kod = ?`);
    }
    if(hova){
        params.push(hova);
        szurok.push(`vegallomas.kod = ?`);
    }

    let sql = `SELECT jaratok.jaratszam, jaratok.indulas FROM jaratok JOIN repuloterek indul ON jaratok.honnan_id = indul.id JOIN repuloterek vegallomas ON jaratok.hova_id = vegallomas.id`;

    if (szurok.length > 0) {
        sql += ` WHERE ${szurok.join(' AND ')}`;
    }

    try {   
        const [results] = await pool.query(sql, params);
        res.json({ jaratok: results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ hiba: 'Hiba történt az adatbázis lekérdezése során' });
    }
});

export default router;