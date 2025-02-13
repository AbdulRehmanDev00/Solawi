import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import flash from 'connect-flash';
import session from 'express-session';

// Create app instance
const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'static'))); // Serve static files
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(flash());

// Routes
app.get('/', (req, res) => {
    res.render('index', { messages: req.flash('info') });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/contact', (req, res) => {
    const { name, email, topic, message } = req.body;
    console.log(`Contact Form Submission: Name - ${name}, Email - ${email}, Topic - ${topic}, Message - ${message}`);
    req.flash('info', 'Your message has been sent successfully!');
    res.redirect('/');
});

app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    console.log(`Sign Up: Email - ${email}, Password - ${password}`);
    req.flash('info', 'Sign up successful!');
    res.redirect('/');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(`Login: Email - ${email}, Password - ${password}`);
    req.flash('info', 'Login successful!');
    res.redirect('/');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});