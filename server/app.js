let express = require('express');
const Users = require('./db/users')

let app = express();


app.use(express.json({limit:'150mb'}));

const port = 1020;

const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/nfcProject', (err, connect) => {
    console.log(err || connect);
})


app.post('/auth/userinfo', async (req, res) => {

    try {

        
        let fileName = Math.floor(Math.random() * 10000) + ".jpg";
        // req.body.image = fileName;

        binaryData = new Buffer(req.body.image, 'base64').toString('binary');

        require("fs").writeFile("./server/appUsers/" + fileName, binaryData, "binary", async function (err) {
       
            let newUser = new Users(req.body)
            newUser.image = fileName;
            await newUser.save();
            res.end(newUser._id.toString())
       
        });     

       
    } catch (e) {
        res.json({
            success: false,
        })
    }
});


app.post('/auth/getinfo', async (req, res) => {
    try {

        let userID = await Users.findById(req.body.id);
        res.json(userID || {});
    } catch (e) {
        res.json({
            success:false,
        })
    }
})

app.use(express.static('./server/appUsers'));

app.listen(port, () => {
    console.log(`server is running on ${port}`);
})