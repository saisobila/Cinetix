const express = require("express");
const cors = require('cors');
const dotenv  = require('dotenv');
const session  = require('express-session');
const passport  = require('passport');
require("./utils/passport.js");
const connectDB = require('./config/db.js');
const userRouter  = require('./route/userRoutes.js');
const createDefaultAdmin = require("./utils/createDefaultAdmin.js");
const theaterRoute  = require("./route/theaterRoutes.js");
const showtimeRoutes = require("./route/showtimeRoutes.js");
const movieRoute = require("./route/movieRoutes.js");
const bookingRoute = require("./route/bookingRoutes.js");

const port = process.env.DB_PORT || 3000;  

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);



app.use(express.json({ limit: '6mb' }));

app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 413) {
    res.status(413).send({ error: 'Payload too large!' });
  } else {
    next(err);
  }
});




app.use('/users', userRouter);

app.use("/booking", bookingRoute);

app.use("/movie", movieRoute);

app.use("/showtime", showtimeRoutes);

app.use("/theater", theaterRoute);


app.get("/", (req, res) => {
  res.status(200).send(`Server running upon the port : ${port}`);
})



app.listen(port, async () => {
  console.log(`Server Started on port ${port}`);
  await connectDB();
 
  await createDefaultAdmin();
  const currentDate = new Date();
  currentDate.setMinutes(currentDate.getMinutes() + 5);
  console.log(currentDate);
});
