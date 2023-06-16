import session from "express-session";

export const sessionMiddleware = session({
  secret: "asdfghjklqwertyuiop",
  cookie: { maxAge: 1000 * 60 * 60 },
  saveUninitialized: false,
  resave: false,
});
