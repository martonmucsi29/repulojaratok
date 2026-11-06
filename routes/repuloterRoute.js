import pool from '../utils/db.js';
import { Router } from 'express';

const reprouter = Router();

reprouter.get('/', async (req, res) => {
    let sql = `SELECT * FROM repuloterek`;

    let eredmeny = await pool.query(sql);
    res.json(eredmeny);
});

reprouter.get('/:rep', async (req, res) => {
    const {rep} = req.params;

    let sql = `SELECT * FROM repuloterek WHERE repuloterek.kod = ?`;
    
    let eredmeny = await pool.query(sql, rep);
    res.json(eredmeny);
});

reprouter.get('/:rep/indulasok', async (req, res) => {
    const {rep} = req.params;
    let sql = `SELECT jaratok.jaratszam, jaratok.indulas, vegallomas.varos FROM jaratok JOIN repuloterek indul ON jaratok.honnan_id = indul.id JOIN repuloterek vegallomas ON jaratok.hova_id = vegallomas.id WHERE indul.kod = ?`;
    
    let eredmeny = await pool.query(sql, rep);
    res.json(eredmeny);
})


export default reprouter;