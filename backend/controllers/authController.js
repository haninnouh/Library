const Author = require("../models/bookAndAuthor").Author;
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

    //incorrect email
    if(err.message==="incorrect email"){
        errors.email = "that email not registered"
    }

    //incorrect password
    if(err.message==="incorrect password"){
        errors.password = "that password is incorrect"
    }

  // duplicate error code 
  if(err.code === 11000){
    errors.email="the email is already registered";
    return errors;
  }
  //validate errors
  if (err.message.includes("author validation failed")) {
    Object.values(err.errors).forEach(({properties}) => {
      console.log(properties);
      errors[properties.path]= properties.message
    });
  }
  return errors;
};

//
const maxAge= 3*24*60*60
const createToken = (id)=>{
    return jwt.sign({id},'hnoohSecret',{
        expiresIn: maxAge
    })
} 

module.exports.signup_post = async (req, res) => {
  const {  email, password,name,nationality,authorImage,bookImage,title,pages} = req.body;
  try {
    const author = await Author.create({  email, password,name,nationality,authorImage});
    const token = createToken(author._id)
    res.cookie('jwt', token, {httpOnly: true,maxAge:maxAge*1000});
    res.status(201).json({author:author._id,token: token});
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({errors});
  } 
};

module.exports.signin_post = async (req, res) => {
  const { email, password } = req.body;
  try{
    const author= await Author.login(email, password);
    const token = createToken(author._id)
    res.cookie('jwt', token, {httpOnly: true,maxAge:maxAge*1000});
    res.status(200).json({author: author._id,token: token});
    
}
  catch(err){
    const errors = handleErrors(err);
    res.status(400).json({errors});
  }
};


module.exports.signout_get = (req, res) => {
    res.cookie('jwt','', {maxAge:1});
}