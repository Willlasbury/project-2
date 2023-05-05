const router = require("express").Router()

router.get('/', async (req, res) => {
        try{
            res.render('homepage')
        } catch (err){
            console.log(err);
            return res.status(500).json({msg:'some error', err:err})
        }
  });

  module.exports = router