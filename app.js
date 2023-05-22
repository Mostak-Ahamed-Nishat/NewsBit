// External Import Files
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const middleware=require('./middlewares/middlewares')
const path = require('path')
//Internal Import Files
const allRoutes = require('./routes/routes')

//Middleware*****
middleware(app)
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

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
    let error=new Error('Page not found happened')
    error.status=404
    next(error)
})

//Set up default mongoose connection
const CONNECTION_URI = 'mongodb://127.0.0.1/NewsBit';

//All error handlers
app.use((error,req,res,next)=>{
    if(error.status===404){
        res.render('pages/404',{
            title:'Page not found',
        })//set not found page******
    }else{
        console.log(error.message);
        res.render('pages/500',{
            title:'Server error',
        }) //set server side error page******
    }
})




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