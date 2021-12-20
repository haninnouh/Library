const express = require("express");
const router = express.Router(); 
router.use(express.json());

router.get('/', function(req, res){
    res.send('Hello, world!');
})

module.exports = router;
