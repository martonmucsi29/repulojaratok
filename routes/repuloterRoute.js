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

reprouter.get('/indulasok', async (req, res) => {
    
})


export default reprouter;