const jwt = require('jsonwebtoken');
const Author = require("../models/bookAndAuthor").Author;

const requireAuth = (req,res,next) => {
    const token=req.cookies.jwt;

    // check json web token exists & is verified
    
    if(token) {
        jwt.verify(token,'hnoohSecret', (err,decodedToken)=>{
            if(err){
                console.log(err.message);
                // res.redirect('/signin')
            }
            else{
                console.log(decodedToken);
                next()
            }
        })
    }
    else{
        // res.redirect('/signin')
    }
} 

//check current author
const checkAuthor=(req,res,next)=>{
    const token=req.cookies.jwt;
    if(token) {
        jwt.verify(token,'hnoohSecret',async (err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.author=null
                next();
            }
            else{
                console.log(decodedToken);
                let author = await Author.findById(decodedToken.id)
                res.locals.author = author
                next();
            }
        })
    }
    else{
        res.locals.author=null
        next()
    }


}

module.exports ={requireAuth,checkAuthor}