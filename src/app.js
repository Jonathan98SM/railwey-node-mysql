import express from 'express';
import path from 'path';
import { PORT } from './config.js';
import { pool } from './db.js' ;
import morgan from 'morgan';
import multer from 'multer';


const app = express();
app.listen(PORT);

//app.set('views','../src/views');
app.set('view engine','ejs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));
app.use(multer({
    dest: '../src/public/img/uploads'
}).single('image'));

// Routes
app.get('/upload',async (req,res)=>{
    res.render('../src/views/upload.ejs')
})
app.post('/upload',async (req,res)=>{
    res.json(req.file)
})
app.get('/',async (req,res)=>{
    const [row] =await pool.query('SELECT * FROM users')
    res.json(row)
})
app.get('/create',async (req,res)=>{
    const result = await pool.query('INSERT INTO users(name) VALUES ("Jon")')
    res.json(result)
})