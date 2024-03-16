import express from 'express'
import passport from 'passport'

export const userRouter = express.Router();
// const passport = require("passport");

userRouter.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

userRouter.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

userRouter.get("/google", passport.authenticate("google", ["profile", "email"]));

userRouter.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

userRouter.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});