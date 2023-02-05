const app = require('./App');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fileupload = require('express-fileupload');

dotenv.config();
//connect to DB
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Successful Connected to DB')
})
app.use(fileupload({
    useTempFiles:true
}))

app.listen(3004, () => console.log('Server is up at 3004 port'));
