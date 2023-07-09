
import mongoose from 'mongoose';
import express from 'express';
import { server, app } from './utils/socket.js';
import handlerbars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import passport from 'passport';
import { productRouter } from './routes/products.router.js';
import { cartRouter } from './routes/carts.router.js';
import wiewsRouter from './routes/views.router.js';
import { menssagerModel } from "../src/controllers/models/menssage.model.js";
import { userRouter } from './routes/user.router.js';
import inicializePassport from './config/passport.config.js';



import { io } from './utils/socket.js';

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.engine('handlebars', handlerbars.engine());
app.set('views', 'views/');
app.set('view engine', 'handlebars');

app.use(express.static('public'))


app.use(cookieParser())


app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        'mongodb+srv://zanty1875:<password>@cluster0.s2k9zpj.mongodb.net/?retryWrites=true&w=majority',
      mongoOptions: {
        useNewUrlParser: true,
      },
      ttl: 6000,
    }),
    secret: 'B2zdY3B$pHmxW%',
    resave: true,
    saveUninitialized: true,
  })
);
inicializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.post('/', async (req, res) => {

  try {

    const { user, menssage } = req.body;
    const newMessage = new menssagerModel({ user, menssage });
    await newMessage.save();

    const messages = await menssagerModel.find({}).lean();

    io.emit('List-Message', {
      messages: messages

    })

    res.redirect('/chat');
  } catch (err) {
    res.render('error', { error: err.message });
  }
});

mongoose.connect(
  "mongodb+srv://zanty1875:<password>@cluster0.s2k9zpj.mongodb.net/?retryWrites=true&w=majority"
);

app.use('/', wiewsRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/users', userRouter);



const httpServer = 8080;
server.listen(httpServer, () => console.log(`estoy escuchando ${httpServer}...`));

