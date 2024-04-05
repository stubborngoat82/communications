const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);


const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());


app.post('/send-sms', (req, res) => {
    const { body, to }= req.body;
    
    if(!body || !to) {
        return res.status(400).send({ error: 'Please provide both a message and recipient phone number.'});
    }

    client.messages
        .create({
            body: body,
            from : '+18447195388',
            to: to
    })
    .then(message => {
        console.log(message.sid);
        res.send({message: 'SMS sent successfully.', sid: message.sid});
    })
    .catch(error => {
        console.error(error);
        res.status(500).send({error: 'Failed to send SMS.'});
    })
});

app.get('/contacts', (req, res) => {
    const filePath = path.join(__dirname, 'contacts.json');

    FileSystem.readFile(filePath, (err, data) => {
        if(err) {
            console.error(err);
            res.status(500).send('Error reading contacts file.');
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));