const db = require('../db')
const express = require('express')
const dp = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({
    storage: storage
})

dp.post('/', upload.single('profilePic'), async (req, res) => {

    const loggedIn = req.session.loggedIn;

    if (loggedIn) {
        const data_id = req.session.user;
        
        if (!req.file || !req.file.filename) {
            console.log('Select your pic first');
            // res.status(400).send('Select your pic first');
            res.json('select a file')
            return;
        }
        else {         
            const user_dp = req.file.filename;
            db.query(`update registered_users set dp = ? where id = ?`, [user_dp, data_id], async (err, result) => {
                if (err) {
                    console.log('Error in uploading profile pic');
                    throw err;
                }
                else {
                    await res.json('Uploaded')
                }
            })
        }

    }
    else {
        await res.redirect('/login')
    }

})

module.exports = dp;