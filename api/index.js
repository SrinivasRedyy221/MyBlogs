const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');
const Post = require('./models/post');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage });

const salt= bcrypt.genSaltSync(10);
const secret='sjfijafjifodjsfsdj';


app.use(cors({ credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb+srv://SrinivasReddy:reddy123@cluster0.oikncwc.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Add a unique index to the username field
User.collection.createIndex({ username: 1 }, { unique: true });

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({ username, password: bcrypt.hashSync(password, salt) });
    res.json(userDoc);
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    return res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc=await User.findOne({username});
        if(userDoc){
            if(bcrypt.compareSync(password,userDoc.password)){
                jwt.sign({username,id:userDoc._id},secret,{},(err,token)=>{
                    if(err){
                        return res.status(500).json({error:'An error occurred'});
                    }
                    res.cookie('token',token).json('Login successful');
                });
            }
            else{
                return res.status(400).json({error:'Invalid password'});
            }
        }
        else{
            return res.status(400).json({error:'Invalid username'});
        }
    } catch (error) {
        return res.status(500).json({error:'An error occurred'});
    }
});

app.get('/profile',async (req,res)=>{
    const {token}=req.cookies;
    if(token){
        jwt.verify(token,secret,{},async (err,decoded)=>{
            if(err){
                return res.status(401).json({error:'Unauthorized'});
            }
            const {id}=decoded;
            const userDoc=await User.findById(id);
            if(userDoc){
                return res.json(userDoc);
            }
            else{
                return res.status(401).json({error:'Unauthorized'});
            }
        });
    }
    else{
        return res.status(401).json({error:'Unauthorized'});
    }
});

app.get('/logout',(req,res)=>{
    res.cookie('token','').json('Logout successful');
}
);



app.post('/posts',uploadMiddleware.single('file'), async (req, res) => {    
    const {token}=req.cookies;
    if(token){
        jwt.verify(token,secret,{},async (err,decoded)=>{
            if(err){
                return res.status(401).json({error:'Unauthorized'});
            }
            let path=req.file ? req.file.file : null;
            const {title,summary,content}=req.body;
            try {
                const postDoc = await Post.create({
                  title,
                  summary,
                  content,
                  cover: path,
                  author: decoded.id
                });
                res.json(postDoc);
                // Success handling
              } catch (error) {
                console.error('Error creating post:', error.message);
                res.status(500).json({ error: 'An error occurred while creating the post' });
              }
        });
    }
});

app.put('/posts/:id',uploadMiddleware.single('file'),async (req,res)=>{
    const {token}=req.cookies;
    if(token){
        jwt.verify(token,secret,{},async (err,decoded)=>{
            if(err){
                return res.status(401).json({error:'Unauthorized'});
            }
            const {id}=req.params;
            const {title,summary,content}=req.body;
            const postDoc=await Post.findByIdAndUpdate(id,{
                title,
                summary,
                content,
                cover:req.file ? req.file.path : null,

            });
            if(postDoc){
                return res.json(postDoc);
            }
            else{
                return res.status(404).json({error:'Post not found'});
            }
        });
    }
    else{
        return res.status(401).json({error:'Unauthorized'});
    }
});




app.delete('/posts/:id',async (req,res)=>{
    const {token}=req.cookies;
    if(token){
        jwt.verify(token,secret,{},async (err,decoded)=>{
            if(err){
                return res.status(401).json({error:'Unauthorized'});
            }
            const {id}=req.params;
            const postDoc=await Post.findByIdAndDelete(id);
            if(postDoc){
                return res.json(postDoc);
            }
            else{
                return res.status(404).json({error:'Post not found'});
            }
        });
    }
    else{
        return res.status(401).json({error:'Unauthorized'});
    }
});  

            
app.get('/posts',async (req,res)=>{
    const postDocs=await Post.find().populate('author',['username']).sort({createdAt:-1}).limit(20);
    res.json(postDocs);
});

app.get('/posts/:id',async (req,res)=>{
    const {id}=req.params;
    const postDoc=await Post.findById(id).populate('author',['username']);
    res.json(postDoc);  
}
);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
