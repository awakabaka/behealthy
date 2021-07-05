const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const doctorRoutes = require('./routes/doctor')
const patientRoutes = require('./routes/patient')
const visitRoutes = require('./routes/visit')
const childStateMonitorRoutes = require('./routes/childStateMonitor')
const patientRequestRoutes = require('./routes/patientRequest')
const parentRoutes = require('./routes/parent')
const vaccinationRoutes = require('./routes/vaccination')
const questionnaireRoutes = require('./routes/questionnaire')
const scheduleRoutes = require('./routes/schedule')
const adminRoutes = require('./routes/admin')
const chatRoutes = require('./routes/chat')
const doctorRequestRoutes = require('./routes/doctorRequest')


mongoose.connect('mongodb+srv://Yana:pswrd@cluster0-fxw32.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true})
mongoose.Promise = global.Promise

app.use(morgan('dev'))
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

app.use('/doctor', doctorRoutes)
app.use('/patient', patientRoutes)
app.use('/visit', visitRoutes)
app.use('/state/monitor', childStateMonitorRoutes)
app.use('/patientrequest', patientRequestRoutes)
app.use('/account', parentRoutes)
app.use('/vaccination', vaccinationRoutes)
app.use('/questionnaire', questionnaireRoutes)
app.use('/schedule', scheduleRoutes)
app.use('/admin', adminRoutes)
app.use('/doctorrequest', doctorRequestRoutes)



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods', 'DELETE, PATCH, PUT, GET, POST')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});

module.exports = function(app) {
    app.set("port", 5000)
    app.set("json spaces", 2)
    app.use(bodyParser.json())
    app.use(function (error, req, res, next) {
        app.logger.info("received from "+req.get("X-Forwarded-For")+" : "+req.method+" "+req.originalUrl+" (Authorization: "+req.get("Authorization")+")")
        app.logger.info("content :"+JSON.stringify(req.body))
        if (error) {
            res.status(400)
            app.logger.error(error)
            res.json({ error:{msg: error.message}})
        } else {
            next()
        }
    })
    app.use(app.auth.initialize())
}

app.use((reg, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app