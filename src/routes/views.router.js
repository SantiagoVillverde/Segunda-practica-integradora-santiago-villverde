import { Router } from "express";
import { productList } from '../utils/instances.js';
import { isAuth, isGuest } from '../middleware/auth.middleware.js';
import { middlewarePassportJwt } from "../middleware/jwt.middleware.js";





const wiewsRouter = Router()


wiewsRouter.get('/profile', middlewarePassportJwt, isAuth, (req, res) => {

  if (!req.user) {
    res.redirect('/errorcaduco')
  }

  res.render('profile', {
    title: 'Perfil de Usuario',
    message: 'Private route',
    user: req.user
  });
});

wiewsRouter.get('/', isGuest, (req, res) => {
  res.render('register', {
    title: 'Registrar Nuevo Usuario',
  });
});

wiewsRouter.get('/login', isGuest, (req, res) => {
  res.render('login', {
    title: 'Inicio de Sesión',
  });
});

wiewsRouter.get('/registererror', isGuest, (req, res) => {
  res.render('registererror', {
    title: 'Error en registro',
  });
});

wiewsRouter.get('/errorservidor', isGuest, (req, res) => {
  res.render('errorservidor', {
    title: 'Error del servidor',
  });
});

wiewsRouter.get('/errorcaduco', isGuest, (req, res) => {
  res.render('errorcaduco', {
    title: 'token jwt expired',
  });
});


wiewsRouter.get('/index', middlewarePassportJwt, isAuth, async (req, res) => {
  const { limit = 4, page = 1, sort, descripcion, availability } = req.query;


  try {

    const result = await productList.getProducts(limit, page, sort, descripcion, availability);
    const pag = result.page;
    const prevPage = result.prevPage;
    const nextPage = result.nextPage;
    const totalPages = result.totalPages;

    const prevLink =
      prevPage &&
      `${req.baseUrl}/index/?page=${prevPage}&limit=${limit}&sort=${sort || ""
      }&descripcion=${encodeURIComponent(descripcion || "")}${availability ? `&availability=${availability}` : ""
      }`;


    const nextLink =
      nextPage &&
      `${req.baseUrl}/index/?page=${nextPage}&limit=${limit}&sort=${sort || ""
      }&descripcion=${encodeURIComponent(descripcion || "")}${availability ? `&availability=${availability}` : ""
      }`;

    //mapeo para evitar el Object.object
    const products = result.docs.map((product) => product.toObject());
    res.render("index", { title: "Products", products, prevLink, pag, totalPages, nextLink, user: req.user, });
  } catch (error) {
    res.status(500).send(`No se pudieron obtener los productos`);
  }
});

wiewsRouter.get('/chat', middlewarePassportJwt, (req, res) => {
  const user = req.user;
  console.log(user)
  res.render('chat', { user: req.user });

});


wiewsRouter.get('/carts/', middlewarePassportJwt, isAuth, async (req, res) => {

  res.render('cart', { user: req.user }); // Pasar el cartId a la vista

});





export default wiewsRouter
