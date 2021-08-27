import connectSessionSequelize from "connect-session-sequelize";
import express from "express";
import session from "express-session";
import sequelize from "./config/connection.js";
import routes from "./controllers/routes.js";
// import helpers from "./utils/helpers.js";
// sequelize.session.Store = SequelizeStore(session.Store);
const SequelizeStore = connectSessionSequelize(session.Store);
console.log(SequelizeStore);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions with cookies
const sess = {
  secret: "Super secret secret",
  cookie: {
    // Stored in milliseconds (86400 === 1 day)
    maxAge: 86400,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// const hbs = exphbs.create({ helpers });

// app.engine("handlebars", hbs.engine);
// app.set("view engine", "handlebars");

app.use(express.json());

// app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
    )
  );
});
