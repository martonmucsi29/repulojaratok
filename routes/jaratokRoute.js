import pool from '../utils/db.js';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    let params = [];
    let szurok = [];

    const {legitarsasag} = req.query;
    let {honnan, hova} = req.query;

    if(legitarsasag) {
        params.push(legitarsasag);
        szurok.push(`legitarsasagok.kod = ?`);
    }
    if(honnan){
        params.push(honnan);
        szurok.push(``);
    }
    if(hova){
        params.push(hova);
        szurok.push(``);
    }

    let sql = `SELECT * FROM jaratok JOIN legitarsasagok ON jaratok.legitarsasag_id = legitarsasagok.id JOIN repuloterek r1 ON r1.id = jaratok.honnan_id JOIN repuloterek r2 ON r2.id = jaratok.hova_id`;

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