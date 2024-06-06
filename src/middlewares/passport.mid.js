import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import userManager from '../data/mongo/Managers/UserManager.mongo.js';
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { createHash, verifyHash } from '../utils/hash.utils.js';

passport.use("register",
    new LocalStrategy({
        passReqToCallback: true, usernameField: 'email',
    },
        async (req, email, password, done) => {
            try {
                if (!email || !password) {
                    const error = new Error("Please enter name, email and password");
                    error.statusCode = 400
                    return done(error);
                }
                const one = await userManager.readByEmail(email);
                if (one) {
                    const error = new Error("Bad auth from register!");
                    error.statusCode = 401
                    return done(error);
                }
                const hashPassword = createHash(password)
                req.body.password = hashPassword
                const user = await userManager.create(req.body);
                return done(null, user)
            } catch (error) {
                return done(error)
            }
        })
)
passport.use("login",
    new LocalStrategy({
        passReqToCallback: true, usernameField: "email",
    },
        async (req, email, password, done) => {
            try {
                const one = await userManager.readByEmail(email)
                if (!one) {
                    const error = new Error('Bad auth from login!')
                    error.statusCode = 401
                    return done(error)
                }
                const verify = verifyHash(password, one.password)
                if (verify) {
                    req.session.email = email;
                    req.session.role = one.role;
                    req.session.photo = one.photo;
                    req.session.online = true;
                    req.session.user_id = one._id;
                    return done(null, one)
                }
                else {
                    const error = new Error("Invalid credentials");
                    error.statusCode = 401
                    return done(error);
                }
            } catch (error) {
                return done(error)
            }
        })
)

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

passport.use(
    "google",
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8080/api/sessions/google/callback",
            passReqToCallback: true,
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                const {id, name, picture} = profile
            let user = await userManager.readByEmail(id)
            if(!user){
                user = {
                    email: id,
                    password: createHash(id),
                    name: name.givenName,
                    photo: picture
                }
                user = await userManager.create(user);
            }
                    req.session.email = user.email;
                    req.session.role = user.role;
                    req.session.photo = user.photo;
                    req.session.online = true;
                    req.session.user_id = user._id;
                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    )
);


export default passport;