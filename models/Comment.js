// import bcrypt from "bcrypt";
// import { default as DataTypes, default as Model } from "sequelize";
// import sequelize from "../config/connection.js";

// class Comment extends Model {
//   checkPassword(loginPw) {
//     return bcrypt.compareSync(loginPw, this.password);
//   }
// }

// Comment.init({
//   id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   comment: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   sequelize,
//   timestamps: false,
//   freezeTableName: true,
//   underscored: true,
//   modelName: "comment",
// });

// export default Comment;
