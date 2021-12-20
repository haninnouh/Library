## W08D03 HW
### Library with mongoose
* Install express
* Install mongoose 
* Create app.js file and make the connection with mongoose
* Create models folder that contain schema for author and book
    * author schema:
        1. name ==> type: string, required with message: "Author name should be provided"
        2. age ==> type: Number
        3. nationality ==> type: String, required with message: "Author nationality should be provided"
        4. image ==> type: string, required with message: "Author image should be provided"
        5. gender  ==> type: string
        6. books 

    * book schema:
        1. title ==> type: string, required with message: "Book title should be provided"
        2. pages ==> type: Number, required with message: "Book pages should be provided"
        3. price: ==> type: Number, default: 0
        4. image ==> type: string, required with message: "Book image should be provided"

* Add the author and book data we gave you in book_seed, author_seed:
    *  Write a command and run it ONCE for each model in app.js for example if we want to insert books from seed file: 

    ```
    Book.insertMany(seed_book).then(function(){
        console.log("Data inserted")  // Success
        }).catch(function(error){
            console.log(error)      // Failure
            });
    ```
and do the same for Author with seed_author data

* Querying
    * Add at least 2 new author and book
    * Select
        1. Find all male authors
        2. Find all authors that age grater than 44
        3. Find all author in Kuwait country
        4. Find all the book that start with ل
        5. Find all the book that have pages more than 250 
    * Select with OR, AND 
        1. Find all author that in Kuwait or Saudi Arabia
        2. Find all author that have 3 books or more and their age grater than 35
