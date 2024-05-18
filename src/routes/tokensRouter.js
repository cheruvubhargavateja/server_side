const express = require('express');
const router = express.Router();
const Token = require('../models/tokenModel')

router.get('/all-tokens', async (req, res) => {
    try {
        const tokens = await Token.find();
        return res.status(200).json({message: 'Successfully fetched the tokens', tokens});
      } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
});

router.get('/', async (req, res) => {
    try {
        const presentDate = getCurrentDate();
        const tokens = await Token.find({currentDate: presentDate});
        return res.status(200).json({message: 'Successfully fetched the tokens of current date', tokens});
      } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
});

router.post('/create-token', async(request, response) => {
    try{

        console.log({url: request.url, body: request.body})
        const { name, mobile, age, tokenNumber, isBooked} = request.body;
        if(!name || !mobile || !age || !tokenNumber) {
            return response.status(400).json({
                message: 'name, number, age and tokenNumber cannot be empty.'
            })
        } 

        const tokenData = new Token({
            name, mobile, age, tokenNumber, isBooked
        })

        await tokenData.save()
        return response.status(201).json({message: 'Succesfully token is created', tokenData})

    }catch(error){
        return response.status(400).json({message: 'Failed to create token', error: error.message});
    }
});

router.post('/admin-login', (req, res) => {
    try {
        const adminCredentials = {
            email: 'vamshi@gmail.com',
            password: 'vamshi@'
        }
        const {email, password} = req.body;

        if(!email || !password || email === '' || password === '') {
            return res.status(400).json({message: 'Email and Password cannot be empty.'})
        }

        if(email !== adminCredentials.email || password !== adminCredentials.password) {
            return res.status(400).json({message: 'Your Email or Password is wrong.'})
        }

        if(email === adminCredentials.email && password === adminCredentials.password) {
            return res.status(200).json({
                isAdmin: true,
                email: email,
                message: 'You are successfully logged in'
            })
        }
    } catch (error) {
        return res.status(400).json({message: 'Failed to login.'})
    }
})

function getCurrentDate(){
    const currentDate = new Date();

    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();

    // Format the date as "DD-MM-YYYY"
    return `${day}-${month}-${year}`;
}

module.exports = router;
