import Kuchh from 'passport-google-oauth20'
import passport from 'passport'
import { User } from '../models/userModel';

const GoogleStrategy = Kuchh.Strategy

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			// callbackURL: "http://localhost:3000/auth/google/callback",
			scope: ["profile", "email"],
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				let user = await User.findOne({googleId:profile.id})

				if(!user){
					user = new User({
						googleId: profile.id,
						displayName: profile.displayName,
						email: profile.emails[0].value,
						image: profile.photos[0].value
					})

					await user.save();
				}

				return done(null, user)
				
			} catch (error) {
				return done(error, null)
			}
			callback(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
