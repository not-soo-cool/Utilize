import express from 'express'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import cors from 'cors'
import dotenv from "dotenv"
// import cookieSession from 'cookie-session'
import { userRouter } from './routes/userRoute.js';
import { orderRouter } from './routes/orderRoute.js'
import session from 'express-session'
import Kuchh from 'passport-google-oauth2'
import { User } from './models/userModel.js';
// import passportStrategy from './middlewares/passport.js'

export const app = express();

dotenv.config({ path: "./config/config.env" })

const OAuth2Strategy = Kuchh.Strategy

// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["cyberwolve"],
//     maxAge: 24*60*60*100
//   })
// )

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({
    extended: true,
    limit: '50mb'
}));

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET
}))

app.set('view engine', 'ejs')

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser())

app.use(
    cors({
      origin: "http://localhost:3000",
    //   origin: process.env.WEB_URL,
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
);

passport.use(
	new OAuth2Strategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			// callbackURL: "http://localhost:3000/auth/google/callback",
			scope: ["profile", "email"],
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				let user = await User.findOne({ googleId: profile.id })

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
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:3000/",
    failureRedirect:"http://localhost:3000/auth/login"
}))

app.get("/login/success",async(req,res)=>{

    if(req.user){
        res.status(200).json({message:"user Login",user:req.user})
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
})

app.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect("http://localhost:3000/auth/login");
    })
})

app.use("api/v1/auth", userRouter)
app.use("/api/v1/orders", orderRouter)

/*
1. Holder
2. Mishra
3. Shakti
4. Nikku
5. Pal
6. Cutter
7. Chitu
8. Himanshu
9. Anuj
10. 
11. 
12. Ausat
*/