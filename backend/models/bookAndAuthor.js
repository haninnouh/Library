const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const BookSchema = new Schema({
  title: { type: String, required: [true, "title can't be blank"] },
  pages: { type: Number, required: [true, "pages can't be blank"] },
  price: { type: Number, default: 0 },
  bookImage: { type: String, required: [true, "book image can't be blank"] },
});

const AuthorSchema = new Schema({
  name: { type: String ,required: [true, "Author name should be provided"],},
  age: { type: Number },
  nationality: { type: String ,required: [true, "Author nationality should be provided"],},
  authorImage: { type: String,required: [true, "Author image should be provided"], },
  gender: { type: String },
  books: [BookSchema],
  email: {
    type: String,
    required: [true, "email should be provided"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "is invalid"],
  },
  password: {
    type: String,
    minlength: [6, "pass more than 6"],
    required: [true, "pass should be provided"],
  },
  //   books: [{
  //     type: Schema.Types.ObjectId,
  //     ref: 'book'
  //   }]
});

// fire a function after document saved to DB
AuthorSchema.post("save", function (doc, next) {
  console.log("new author created & saved", doc);
  next();
});

//fire a function before document saved to DB
// this refer to Author that in const author = await Author.create({ email, password });
AuthorSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  console.log("author about to created and saved ", this);
  next();
});

//static method to login author
AuthorSchema.statics.login = async function (email, password) {
  //this refer to Author model
  const author = await this.findOne({ email });
  if (author) {
    const auth = await bcrypt.compare(password, author.password);
    //auth from authenticate, true or false
    if (auth) {
      return author;
    }
    //this what will be print if handleErrors in authController fires
    throw Error("incorrect password");
  }
  //this what will be print if handleErrors in authController fires
  throw Error("incorrect email");
};

const Author = mongoose.model("author", AuthorSchema);
const Book = mongoose.model("book", BookSchema);
//Export Models
module.exports = { Author, Book };
