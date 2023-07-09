import { Router } from "express";
import passport from "passport";
import { generateToken, authToken } from "../middleware/jwt.middleware.js";



const userRouter = Router()

userRouter.post('/', passport.authenticate('register', { failureRedirect: '/registererror' }),
	async (req, res) => {
		try { res.redirect('/login'); }
		 catch (errorservidor) {
			res.redirect('/errorservidor')
		}
	}
);

userRouter.post('/auth', passport.authenticate('login', { failureRedirect: '/registererror' }),
	(req, res) => {
		try {
			const user = req.user;
			delete user.password;
			const token = generateToken(user) // genero el token pero no me viene con el beaker/

			res.cookie('token', token, {
				httpOnly: true,
				maxAge: 60000000,
			}).redirect('/profile')
		} catch (errorservidor) {
			res.redirect('/errorservidor')
		}
	}
);

userRouter.get('/private', authToken, (req, res) => {
	try {
		res.status(200).send({ message: 'Private route', user: req.user });
	} catch (errorservidor) {
		res.redirect('/errorservidor')
	}
});


userRouter.post('/logout', (req, res) => {
	try {
		req.session.destroy()
		res.redirect('/login');
	} catch (errorservidor) {
		res.redirect('/errorservidor')
	}
});



// Registro Callback Github //


userRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }),
	async (req, res) => { } // me redirecciona al github a loguearme //
)



userRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }),
	(req, res) => {
		try {
			const user = req.user;
			const token = generateToken(user)
			res.cookie('token', token, {
				httpOnly: true,
				maxAge: 60000000,
			}).redirect('/profile')
		} catch (errorservidor) {
			res.redirect('/errorservidor')
		}
	}
)


export { userRouter };