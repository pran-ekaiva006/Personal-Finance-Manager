module.exports = function (req, res, next) {
	// Allow origin configured via env or allow all
	const allowed = process.env.CORS_ALLOW_ORIGIN || '*';
	res.setHeader('Access-Control-Allow-Origin', allowed);
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	// If credentials (cookies) are required, set this and configure client axios with withCredentials:true
	// res.setHeader('Access-Control-Allow-Credentials', 'true');

	// Handle preflight
	if (req.method === 'OPTIONS') return res.sendStatus(204);
	next();
};
	next();
};
