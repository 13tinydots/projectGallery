const sequelize = require("../config/connection");
const { User, Comment } = require("../models");

const userData = require("./userData.json");
const comment = require("./comment.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log("Seeding database");

  userData.forEach(async (user) => {
    await User.create(user);
  });

  comment.forEach(async (comment) => {
    await Comment.create(comment);
  });

  process.exit(0);
};

seedDatabase();
