import express, { json } from 'express'
import { PORT } from './config.js'
import { pool } from './db.js' 

const app = express()

app.set('port',PORT)
app.get('/',async (req,res)=>{
    const [row] =await pool.query('SELECT * FROM users')
    res.json(row)
})
app.get('/create',async (req,res)=>{
    const result = await pool.query('INSERT INTO users(name) VALUES ("Jon")')
    res.json(result)
})