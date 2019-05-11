module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.email === "admin@vue.com" && req.body.password === "secret") {
      res.status(200).json({});
    } else {
      res.status(400).json({
        message: "wrong password",
        data: req.body
      });
    }
  } else {
    next();
  }
};
