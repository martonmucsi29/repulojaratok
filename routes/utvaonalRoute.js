import pool from '../utils/db.js';
import { Router } from 'express';

const utrouter = Router();

utrouter.get('/', async (req, res) => {
    let params = [];
    let szurok = [];

    let {honnan, hova} = req.query;

    if (!honnan || honnan.length > 3 || !hova || hova > 3) {
        res.status(400).json({ hiba: 'Az induló és végállomások 3 karakter hosszú kódját adja meg' });
        return;
    }

    if(honnan){
        params.push(honnan);
        szurok.push(`indul.kod = ?`);
    }
    if(hova){
        params.push(hova);
        szurok.push(`vegallomas.kod = ?`);
    }

    let sql = `SELECT j1.jaratszam AS elso, j2.jaratszam AS masodik, ADDTIME(j1.indulas, SEC_TO_TIME(j1.idotartam * 60)) AS erkezes, j2.indulas AS tovabb_indulas, atszallas.kod AS atszallas, TIMESTAMPDIFF( MINUTE, ADDTIME(j1.indulas, SEC_TO_TIME(j1.idotartam * 60)), j2.indulas ) AS atszallasi_ido_perc, j1.ar + j2.ar AS osszAr FROM jaratok j1 JOIN repuloterek indul ON j1.honnan_id = indul.id JOIN jaratok j2 ON j2.honnan_id = j1.hova_id JOIN repuloterek vegallomas ON j2.hova_id = vegallomas.id JOIN repuloterek atszallas ON atszallas.id = j1.hova_id WHERE TIMESTAMPDIFF( MINUTE, ADDTIME(j1.indulas, SEC_TO_TIME(j1.idotartam * 60)), j2.indulas ) BETWEEN 60 AND 300 AND`;

    if(szurok.length > 0) {
        sql += ` ${szurok.join(' AND ')}`;
    }

    try{
        const [results] = await pool.query(sql, params);
        res.json({atszallasok: results});
    }
    catch (error){
        console.error(error);
        res.status(500).json({hiba: 'Hiba történt az adatbázis lekérdezése közben.'})
    }
});


export default utrouter;