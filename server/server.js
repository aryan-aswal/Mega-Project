const express = require('express');
const userRoutes = require('./routes/User');
const profileRoutes = require('./routes/Profile');
const paymentRoutes = require('./routes/Payments');
const courseRoute = require('./routes/Course');
const contactRouter = require('./routes/Contact');
const { dbConnect } = require('./config/database');
const { cloudinaryConnect } = require('./config/cloudinary');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

require('dotenv').config();


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use(fileUpload({
    tempFileDir: "/tmp/",
    useTempFiles: true,
    
}))

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/course', courseRoute);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/contact', contactRouter)
app.get('/', (req, res)=> {
    return res.status(200).json({
        success: true,
        message: "Your server is up and running",
    });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, (err)=> {
    if(err) {
        console.log(err.message);  
    } else {
        console.log(`App is running at port ${PORT}`);
    }
})

dbConnect();
cloudinaryConnect();
