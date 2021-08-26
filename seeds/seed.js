import sequelize from "../config/connection.js";
// import Comment from "../models/Comment.js";
import User from "../models/User.js";
import userData from "./userData.json";

// const comment = require("./comment.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log("Seeding database");

  // eslint-disable-next-line no-unused-vars
  const seedUsers = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // eslint-disable-next-line no-unused-vars
  // const seedCharacters = await Comment.bulkCreate(comment, {
  //   individualHooks: false,
  //   returning: true,
  // });

  process.exit(0);
};

seedDatabase();
