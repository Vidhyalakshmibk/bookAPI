const { request } = require("express");
const express=require("express");
// database
const Database=require("./database");
//Initialization
const ourApp=express();

ourApp.use(express.json());//This line required for POST request because the data is in JSON format.

ourApp.get("/",(request,response)=>{
    response.json({message: "request is working!!!"});
});

//Route   -/book
//Des     -To get all books
//Access  -Public
//Method  -GET
//Params  -none
//Body    -none
ourApp.get("/book",(req,res)=>{
    return res.json({books:Database.Book});
});

//Route   -/book/:bookID
//Des     -To get the books based on ISBN
//Access  -Public
//Method  -GET
//Params  -bookID
//Body    -none
ourApp.get("/book/:bookID",(req,res)=>{
    const getBook=Database.Book.filter(
        (book)=>book.ISBN===req.params.bookID
    );
    return res.json({book:getBook}); 
});

//Route   -/book/c/:category
//Des     -To get the books based on category
//Access  -Public
//Method  -GET
//Params  -category
//Body    -none
ourApp.get("/book/c/:category",(req,res)=>{
    const getBook=Database.Book.filter(
        (book)=>book.category.includes(req.params.category)
    );
    return res.json({book:getBook}); 
});
//Route   -/book/c/:authors
//Des     -To get the books based on author
//Access  -Public
//Method  -GET
//Params  -category
//Body    -none
ourApp.get("/book/a/:authors",(req,res)=>{
    const getBook=Database.Book.filter(
        (book)=>book.authors.includes(parseInt(req.params.authors))
    );
    return res.json({book:getBook}); 
});
                 //AUTHOR
//Route   -/author
//Des     -To get all authors
//Access  -Public
//Method  -GET
//Params  -none
//Body    -none
ourApp.get("/author",(req,res)=>{
    return res.json({authors:Database.Author});
});
//Route   -/author/:authorID
//Des     -To get the authors based on their id
//Access  -Public
//Method  -GET
//Params  -authorID
//Body    -none
ourApp.get("/author/:authorID",(req,res)=>{
    const getAuthor=Database.Author.filter(
        (author)=>author.id===parseInt(req.params.authorID)
    );
    return res.json({author:getAuthor}); 
});
//Route   -/author/b/:book
//Des     -To get list of author based on book
//Access  -Public
//Method  -GET
//Params  -book
//Body    -none
ourApp.get("/author/b/:book",(req,res)=>{
    const getAuthor=Database.Author.filter(
        (author)=>author.books.includes(req.params.book)
    );
    return res.json({author:getAuthor}); 
});
                 //PUBLICATIONS
//Route   -/publication
//Des     -To get all publications
//Access  -Public
//Method  -GET
//Params  -none
//Body    -none
ourApp.get("/publication",(req,res)=>{
    return res.json({publication:Database.Publication});
});
//Route   -/publication/:publicationID
//Des     -To get the authors based on their id
//Access  -Public
//Method  -GET
//Params  -publicationID
//Body    -none
ourApp.get("/publication/:publicationID",(req,res)=>{
    const getPublication=Database.Publication.filter(
        (publication)=>publication.id===parseInt(req.params.publicationID)
    );
    return res.json({publication:getPublication}); 
});
//Route   -/publication/b/:book
//Des     -To get the authors based on their id
//Access  -Public
//Method  -GET
//Params  -book
//Body    -none
ourApp.get("/publication/b/:book",(req,res)=>{
    const getPublication=Database.Publication.filter(
        (publication)=>publication.books.includes(req.params.book)
    );
    return res.json({publication:getPublication}); 
});
//Route   -/book/new
//Des     -add new book
//Access  -Public
//Method  -post
//Params  -none
ourApp.post("/book/new",(req,res)=>{
    console.log(req.body); //Data alone is added
    return res.json({message: 'Book Added Successfully'});
});
//Route   -/author/new
//Des     -add new author
//Access  -Public
//Method  -post
//Params  -none
ourApp.post("/author/new",(req,res)=>{
    //Data added with its key, as it is in database.
    //newAuthor is the key, we add data with this key in JSON content.And do the following lines.
    const {newAuthor} =req.body;// const newAuthor=req.body.newAuthor; This can be used.
    //Those curly braces above is known as destructuring.
    //This kind of destructruting is helpful when we add more than one key.
    // eg: const {newAuthor,bookData}=req.body; //Two variables(keys)
    console.log(newAuthor);                    
    return res.json({message: 'author Added Successfully'});
});
//Route   -/publication/new
//Des     -add new publication
//Access  -Public
//Method  -post
//Params  -none
ourApp.post("/publication/new",(req,res)=>{
    const {newPublication1,newPublication2}=req.body;
    console.log(newPublication1);
    console.log(newPublication2);
    return res.json({message: 'Publication Added Successfully'});
});
ourApp.listen(4000,()=>console.log("Server is running"));