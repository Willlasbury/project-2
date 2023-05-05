const router = require("express").Router();
const { User } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const data = await User.findAll();
    if(data.length===0){
        return res.status(404).json({msg:"no Users in database!"})
    }
    return res.json(data)
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "some error", err: err });
  }
});

router.post("/", async (req, res) => {
  try {
    // if(!req.session.userId){
    //     return res.status(403).json({msg:"login first you knucklehead!"})
    // } 
    const newUser = {
        name: req.body.name,
        password: req.body.password
    }
    const post = await User.create(newUser)
    res.json(post)

  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "some error", err: err });
  }
});

module.exports = router
