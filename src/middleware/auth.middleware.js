export function isAuth(req, res, next) {
	if (req.user) {
		next();
	} else {
		res.redirect('/login');
	}
}

export function isGuest(req, res, next) {
	if (!req.user) {
		next();
	} else {
		res.redirect('/');
	}
}