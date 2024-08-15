const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// MongoDB connection URI
const dbURI = 'mongodb+srv://Mohsin:3uXT7IvZUt6Kf5xM@cluster5.yto50.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=Cluster5';

// Connect to MongoDB
mongoose.connect(dbURI, { connectTimeoutMS: 30000 })
  .then(result => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));


// Express app
const app = express();

// Set view engine to EJS
app.set('view engine', 'ejs');

// Start the server
app.listen(3000, () => {
    console.log('Listening on port 3000');
});

// Middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

// Blog Routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { title: 'All Blogs', blogs: result });
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a New Blog' });
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result => {
            res.redirect('/blogs');
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result, title: 'Blog Details' });
        })
        .catch(err => {
            console.log(err);
        });
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
        })
        .catch(err => {
            console.log(err);
        });
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
     .then(result=>{
        res.json({redirect:'/blogs'});
     })
     .catch(err=>{
        console.log(err);
     });
});

// Route for the 'About' page
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// Route for the 'New Blog' page
app.get('/create', (req, res) => {
    res.render('create', { title: 'Create Blog' });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
