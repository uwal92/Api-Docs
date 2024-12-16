const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const spotsRoutes = require('./routes/spots');
app.use('/api/spots', spotsRoutes);


app.use(bodyParser.json());
app.use(cookieParser());

const userRoutes = require('./routes/users');
const spotRoutes = require('./routes/spots');
const reviewRoutes = require('./routes/reviews');
const bookingRoutes = require('./routes/bookings');
const imageRoutes = require('./routes/images');


app.use('/api/users', userRoutes);
app.use('/api/spots', spotRoutes);
//app.use('/api/reviews', reviewRoutes);
//app.use('/api/bookings', bookingRoutes);
//app.use('/api/images', imageRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
