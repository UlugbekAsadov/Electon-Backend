import session from "express-session";

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET_KEY || "asdfghjklqwertyuiop",
  cookie: { maxAge: 1000 * 60 * 60 },
  saveUninitialized: false,
  resave: false,
});
