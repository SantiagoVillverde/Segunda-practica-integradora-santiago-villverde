import jwt from 'jsonwebtoken';
import passport from 'passport';

const privatekey = 'privatekey';

const generateToken = (user) => {
	return jwt.sign(user.toJSON(), privatekey, { expiresIn: '1h' });
};

const authToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	console.log(authHeader)
	if (!authHeader) {
		res.status(401).send({ message: 'Token not found' });
	}

	jwt.verify(authHeader, privatekey, (err, credentials) => {
		console.log(authHeader, privatekey)
		if (err) {
			res.status(401).send({ message: 'Token not valid' });
		}
		req.user = credentials.user;
		next();
	});
};


const middlewarePassportJwt = async (req, res, next) => {
	passport.authenticate('jwt', { session: false }, (err, usr, info) => {
		if (err) {
			next(err);
		}

		if (!usr) {
			console.log("token jwt expired")
			res.redirect('/errorcaduco')
		} else {
			req.user = usr
			next(console.log("paso verificaciones", req.user = usr))
		}

	})(req, res, next);
}





export { generateToken, authToken, middlewarePassportJwt };