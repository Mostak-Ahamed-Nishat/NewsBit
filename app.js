// External Import Files
const express=require('express')
const app = express()
const path = require('path')
//Internal Import Files
const allRoutes=require('./routes/routes')


//Setting View Engine
app.set('view engine', 'ejs')
app.set('views', 'views')

//Setting static file
app.use(express.static('public'))

app.use('/public/', express.static('./public'))

allRoutes(app)
const PORT=process.env.PORT||3000
app.listen(PORT,()=>{
    console.log('Server listening on port '+PORT);
})