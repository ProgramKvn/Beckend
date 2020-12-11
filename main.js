const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { PORT, url } = require('./Database')

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(bodyParser.json());

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('BD conectada')).catch(err => console.log(err))


const topicRoutes = require("./routes/api/topic");
const topicCss = require("./routes/api/cursoCss");

app.use("/api/topics", topicRoutes);
app.use('/api/cursoCSS',topicCss);

const usuarioRoutes = require('./routes/api/usuario');
app.use('/api/usuario', usuarioRoutes);

const correoRoutes = require('./routes/api/correo');
app.use('/api/correo', correoRoutes);

app.listen(PORT, () => console.log('El Servidor está activo en el puerto: ', PORT))