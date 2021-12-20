var ObjectId = require("mongodb").ObjectID;
module.exports = [
  {
    name: "Osama Al Muslim",
    email:"osama@gmail.com",
    age: 44,
    nationality: "Saudi Arabia",
    authorImage: "https://adab-news.com/wp-content/uploads/2020/01/Capture.jpg",
    gender: "male",
    password:"osama123",
    books: [
      {
        title: "This is what happened to me",
        pages: 447,
        price: 87,
        bookImage:
          "https://www.jarir.com/cdn-cgi/image/fit=contain,width=400,height=400/https://www.jarir.com/media//catalog/product/5/6/568335.jpg?1",
      },
      {
        title: "sakhab alkhasif",
        pages: 447,
        price: 69,
        bookImage:
          "https://www.jarir.com/cdn-cgi/image/fit=contain,width=400,height=400/https://www.jarir.com/media//catalog/product/4/7/478793.jpg?1",
      },
      {
        title: "fear",
        pages: 302,
        price: 53,
        bookImage:
          "https://www.jarir.com/cdn-cgi/image/fit=contain,width=400,height=400/https://www.jarir.com/media//catalog/product/4/3/439941.jpg?1",
      },
    ],
  },
  {
    name: "Ali Jaber Al-Fifi",
    nationality: "Saudi Arabia",
    email:"ali@gmail.com",
    authorImage:
      "https://www.alriyadh.com/media/article/2010/12/28/img/808263677439.jpg",
    gender: "male",
    password:"ali123",

    books: [
      {
        title: "li'anak Allh",
        pages: 192,
        price: 17,
        bookImage:
          "https://www.jarir.com/cdn-cgi/image/fit=contain,width=400,height=400/https://www.jarir.com/media//catalog/product/4/6/465531.jpg?1",
      },
    ],
  },
  {
    name: "Buthaina Al-Issa",
    age: 39,
    email:"buthaina@gmail.com",
    nationality: "Kuwait",
    password:"Buthaina123",
    authorImage:
      "https://www.almrsal.com/wp-content/uploads/2017/01/%D8%A8%D8%AB%D9%8A%D9%86%D8%A9-%D8%A7%D9%84%D8%B9%D9%8A%D8%B3%D9%89.jpeg",
    gender: "female",
    books: [
      {
        title: "wandering maps",
        pages: 405,
        price: 52,
        bookImage:
          "https://www.jarir.com/cdn-cgi/image/fit=contain,width=400,height=400/https://www.jarir.com/media//catalog/product/4/4/448496.jpg?1",
      },
    ],
  },
  {
    name: "Abdulwahab Al-Rifai",
    email:"abdulwahab@gmail.com",
    age: 48,
    nationality: "Kuwait",
    authorImage: "https://i.ytimg.com/vi/8SzCOrmEC1A/sddefault.jpg",
    gender: "male",
    password:"Abdulwahab123",
    books: [
      {
        title: "halat nadira",
        pages: 323,
        price: 47,
        bookImage: "https://d34gac3gqli6v2.cloudfront.net/images/162x222/5092.jpg",
      },
    ],
  },
  {
    name: "aya keto",
    age: 25,
    email:"aya@gmail.com",
    nationality: "Japan",
    authorImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Aya_Kit%C5%8D.jpg/180px-Aya_Kit%C5%8D.jpg",
    gender: "female",
    password:"aya123",
    books: [
      {
        title: "liter of tears",
        pages: 199,
        price: 46,
        bookImage: "https://img.wattpad.com/cover/178974102-352-k864815.jpg",
      },
    ],
  }
];
