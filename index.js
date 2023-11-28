const db = require('./db')
const express = require('express')
const cookieparser = require('cookie-parser')
const session = require('express-session');
const sessionStore = require('./session')
const app = express()
const bodyparser = require('body-parser')

app.use(session({
    name: 'hk_user',
    secret: 'hongKongBooking',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        // secure : true,
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 90000000e4,
    }

}));

app.use(cookieparser())
app.use(bodyparser.urlencoded({
    extended: false
}))
app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const loggedIn = req.session.loggedIn;

    if (loggedIn) {
        const data_id = req.session.user;
        console.log("LoggedIn id " + data_id);

        const select_user = `SELECT id, username, email, dp FROM registered_users WHERE id = '${data_id}'`;

        db.query(select_user, async (err, user_data) => {
            if (err) {
                console.log('Error in querying user data');
                return;
            } else {
                const user_name = user_data[0];
                res.render('index', {
                    user_loggedIn: data_id
                });

            }
        });
    } else {
        res.render('index', {
            user_loggedIn: ''
        });
    }
});

app.get('/register', async (req, res) => {
    const loggedIn = req.session.loggedIn;

    if (loggedIn) {
        await res.redirect('/');
    }
    else {
        await res.render('register');
    }
})

app.get('/login', async (req, res) => {
    const loggedIn = req.session.loggedIn;

    if (loggedIn) {
        await res.redirect('/');
    }
    else {
        if (req.headers.referer === 'http://localhost:5000/register') {
            await res.render('login_reg', {
                msg: "Account Registered! Login Now"
            })
        }
        else {
            await res.render('login_reg', {
                msg: ''
            });
        }
    }

})

app.get('/user', async (req, res) => {
    const loggedIn = req.session.loggedIn;

    if (loggedIn) {
        const data_id = req.session.user;
        const select_user = `SELECT id, username FROM registered_users WHERE id = '${data_id}'`;

        db.query(select_user, async (err, user_data) => {
            if (err) {
                console.log('Error in querying username');
                return;
            } else {
                const user_name = user_data[0];
                res.json({
                    name: user_name
                });

            }
        });

    }


})

app.get('/login_auth', async (req, res) => {
    const loggedIn = req.session.loggedIn;

    if (loggedIn) {
        await res.redirect('/');
    }
    else {
        await res.render('login', {
            msg: ''
        });

    }

})

app.get('/logout', async (req, res) => {
    const loggedIn = req.session.loggedIn;

    if (loggedIn) {
        await res.clearCookie('hk_user')
        await res.redirect('/')
    }
    else {
        await res.redirect('/login')
    }
})

// Authorization of account and HomePage
app.use('/auth', require('./routes/auth_register'))
app.use('/auth', require('./routes/auth_login'))

// User Profile page with User information
app.use('/profile', require('./routes/profile'))

// // Render Tour Webpage or Excursion Webpage etc
app.use('/tour', require('./routes/tour'))

// Explore Tours_page or Excursions Webpage etc
app.use('/explore', require('./routes/explore'))

// // Profile DP settings
app.use('/upload_dp', require('./routes/upload_dp'))
app.use('/mydp', require('./routes/mydp'))

// Edit Profile settings such as firstName, lastName, DOB, etc.
app.use('/edit', require('./routes/edit_profile'))

// Add to my trip to store trip data
app.use('/add_trip', require('./routes/store_tourData'))

// Add Hotel data to my trip to store trip data
app.use('/add_hotel_trip', require('./routes/store_hotel_data'))
app.use('/add_transport_data', require('./routes/store_transport_data'))


app.get('/about', (req, res) => {
    const loggedIn = req.session.loggedIn;

    if (loggedIn) {
        const data_id = req.session.user;
        res.render('about', {
            user_loggedIn: data_id
        });
    }
    else {
        res.render('about', {
            user_loggedIn: ''
        })
    }
})



// const fs = require('fs');
// const imageBuffer = fs.readFileSync('C:\\Users\\ProgrammerBoy\\Downloads\\hongkong.jpg');

// const insertQuery = 'update tour SET img = ? WHERE id = 1';

// db.query(insertQuery, [imageBuffer], (error, results) => {
//   if (error) {
//     console.error('Error inserting image:', error);
//   } else {
//     console.log('Image inserted successfully.');
//   }
// });

// db.end();

const port = 5000;
app.listen(port, console.log(`Server is running at port ${port}`))
