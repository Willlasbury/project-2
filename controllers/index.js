const router = require("express").Router();

// easy way to check session
router.get("/cookie", async (req, res) => {
    try {
      res.json(req.session)
    } catch (err) {
      console.log("err:", err);
    }
  });

const apiRoutes = require("./api");
router.use("/api", apiRoutes);

const pageRoutes = require("./pages");
router.use("/", pageRoutes);

const taskRoutes = require("./api/task");
router.use("/api/task", taskRoutes);

module.exports = router;
