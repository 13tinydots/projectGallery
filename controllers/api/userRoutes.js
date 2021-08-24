/* eslint-disable camelcase */
const router = require("express").Router();
const { User } = require("../../models");
import bcrypt from "bcryptjs";
// import withAuth from "../../utils/auth";

// updated with signup route - redirects to home page
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
      res.redirect("/");
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// updated with login route checks bcrypted password
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.user } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      req.user.password
    );

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
      res.redirect("/");
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// add a route that if the user is logged in, it will allow the user to save comments from the form.
router.post("/saveComment", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { id: req.session.user_id } });
    if (userData) {
      const newComment = await userData.createComment(req.body);
      res.json(newComment);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
      res.redirect("/");
    });
  } else {
    res.status(404).end();
    res.redirect("/");
  }
});

module.exports = router;
