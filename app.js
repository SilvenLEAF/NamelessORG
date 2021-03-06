if(process.env.NODE_ENV !== 'production'){
require('dotenv').config();

}

const path = require('path');

const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');



// firing express app
const app = express();
app.use(express.json())
app.use(express.static(path.join(__dirname, 'client/build')));



// COOKIE AND PASSPORT 
app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys: ['orewasaikyounizettainaru']
}))

app.use(passport.initialize())
app.use(passport.session())





/* ---------------------------------
.             config
--------------------------------- */
require('./config/mongoDBconfig');
require('./config/passportConfig')





/* ---------------------------------
.             ROUTES
--------------------------------- */
app.use(require('./routes/oauthRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/entertainmentCodes', require('./routes/EntertainmentCodeRoutes'));
app.use('/showcaseCodes', require('./routes/ShowcaseCodeRoutes'))
app.use('/bugCodes', require('./routes/BugCodeRoutes'));


/* The catch-all handler. */
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});



// ----------errors handling
app.use((err, req, res, next)=>{
  console.log(err);
  return res.status(500).json({ error: err.message, msg: `Server Error!` });
})





// -----------------------------LISTEN
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`);
});
