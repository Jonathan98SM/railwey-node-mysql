import express from 'express';
import path from 'path';
import { PORT } from './config.js';
import { pool } from './db.js' ;
import morgan from 'morgan';
import multer from 'multer';

const app = express();

app.listen(PORT);
app.set('view engine','ejs');
//app.set('views',path.join(__dirname,'views'));

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));
app.use(multer({
    dest: path.join('./','public/img/uploads')
}).single('image'));

// Routes


app.get('/',async (req,res)=>{
    const [row] =await pool.query('SELECT * FROM users')
    res.json(row)
})
app.get('/create',async (req,res)=>{
    const result = await pool.query('INSERT INTO users(name) VALUES ("Jon")')
    res.json(result)
})