// External Import Files
const express = require('express')
const app = express()
var mongoose = require('mongoose');

//Internal Import Files
const allRoutes = require('./routes/routes')


//Settings Middleware*****
const middleware=[
    express.urlencoded({extended: true}),
    express.json(),
]
//User Middleware*****
app.use(middleware)


//Setting View Engine
app.set('view engine', 'ejs')
app.set('views', 'views')


//Setting static file
app.use(express.static('public'))
app.use('/public/', express.static('./public'))


//App All Route*****
allRoutes(app)



//Not Find Handler
app.use((req,res,next)=>{
    let error=new Error('Page not found')
    error.status=404
    next(error)
})


//All error handlers

app.use((error,req,res,next)=>{
    if(error.status===400){
        res.render('Page not found')
    }else{
        res.render(error.message)
    }
})


//Set up default mongoose connection
const CONNECTION_URI = 'mongodb://127.0.0.1/NewsBit';
//Set up default mongoose connection
mongoose.set('strictQuery', true);

mongoose.connect(CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Mongoose Connected");
}).catch((err) => {
    console.log(err.message)
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
})