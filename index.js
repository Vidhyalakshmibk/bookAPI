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
                              //POST
//Route   -/book/new
//Des     -add new book
//Access  -Public
//Method  -post
//Params  -none
ourApp.post("/book/new",(req,res)=>{
    Database.Book.push(req.body); //Data alone is added
    return res.json({message: 'Book Added Successfully'});
});
//Route   -/author/new
//Des     -add new author
//Access  -Public
//Method  -post
//Params  -none
ourApp.post("/author/new",(req,res)=>{
    //Data added with its objectname, as it is in database.
    //newAuthor is the objectname, we add data with this objectname in JSON content.And do the following lines.
    const {newAuthor} =req.body;// const newAuthor=req.body.newAuthor; This can be used.
    //Those curly braces above is known as destructuring.
    //This kind of destructruting is helpful when we add more than one objectname.
    // eg: const {newAuthor,bookData}=req.body; //Two variables(objectNames)
    Database.Author.push(newAuthor);
    console.log(newAuthor);                    
    return res.json(Database.Author);
});
//Route   -/publication/new
//Des     -add new publication
//Access  -Public
//Method  -post
//Params  -none
ourApp.post("/publication/new",(req,res)=>{
    const {newPublication1,newPublication2}=req.body;
    Database.Publication.push(newPublication1);
    Database.Publication.push(newPublication2);
    console.log(newPublication1);
    console.log(newPublication2);
    return res.json(Database.Publication);
});
                                //PUT
//Route   -/book/update
//Des     -update any details of the book
//Access  -Public
//Method  -put
//Params  -ISBN
ourApp.put("/book/update/:isbn",(req,res)=>{
    const {updatedBook}=req.body;
    const {isbn}=req.params;
    const book=Database.Book.map((book)=>{
        if(book.ISBN===isbn){
            return {...book, ...updatedBook};
        }
       return book;
    });
    return res.json(book);
});
//Updating Author in Book
ourApp.put("/bookauthor/update/:isbn",(req,res)=>{
    const {newAuthor}=req.body;
    const {isbn}=req.params;
    const book=Database.Book.map((book)=>{
        if(book.ISBN===isbn){
            if(!book.authors.includes(newAuthor)){
                return book.authors.push(newAuthor);
            }
            return book; //if the 'if' is false, atleast already existing book should be returned, so 'return book'.
        }
       return book;// similarly as above comment
    });
    //As we update the Author in book, it is necessary to update that book in Author too.
    Database.Author.forEach((author)=>{
        if(author.id===newAuthor){
            if(!author.books.includes(isbn)){
                return author.books.push(isbn);

            }
            return author
        }
        return author;
    });
    return res.json({book: Database.Book,author: Database.Author});
});
//Route   -/author/update
//Des     -update any details of the author
//Access  -Public
//Method  -put
//Params  -id
ourApp.put("/author/update/:id",(req,res)=>{
    const {updatedAuthor}=req.body;
    const{id}=req.params;

    const author= Database.Author.map((author)=>{
        if(author.id===parseInt(id)){
            return {...author, ...updatedAuthor} //represents only the values.
        }
        return author
    });
    return res.json(author);
});
//update books in author
ourApp.put("/authorbook/update/:id",(req,res)=>{
    const {updatedAuthor}=req.body;
    const{id}=req.params;
    
    const author=Database.Author.map((author)=>{
        if(author.id===parseInt(id)){
            if(!author.books.includes(updatedAuthor)){
                return author.books.push(updatedAuthor);
            }
            return author;
        }
        return author;

    });
    //updating authors in books after updating in the authors 
    Database.Book.forEach((book)=>{
        if(book.ISBN===updatedAuthor){
            if(!book.authors.includes(id)){
                return book.authors.push(id);

            }
            return book;
        }
        return book;
    });
    //console.log(author,book);
    return res.json({author: Database.Author,book: Database.Book});
});
//updating title of the book based on ISBN
ourApp.put("/book/updateTitle/:isbn",(req,res)=>{
    const {updatedBook}=req.body;
    const {isbn}=req.params;

    Database.Book.forEach((book)=>{
        if(book.ISBN===isbn){
            book.title=updatedBook.title;
            return book;
        }
        return book;
    });
    return res.json(Database.Book);
});
//Route   -/publication/update
//Des     -update any details of the publication
//Access  -Public
//Method  -put
//Params  -id
ourApp.put("/publication/update/:id",(req,res)=>{
    const {newPublication}=req.body;
    const{id}=req.params;

    const publication= Database.Publication.map((publication)=>{
        if(publication.id===parseInt(id)){
            return {...publication, ...newPublication} //represents only the values.
        }
        return publication
    });
    return res.json(publication);
});

                      //DELETE
//Route   -/book/delete/:isbn
//Des     -delete a book
//Access  -Public
//Method  -DELETE
//Params  -ISBN
ourApp.delete("/book/delete/:isbn",(req,res)=>{
    const {isbn}=req.params;
    const filteredBooks=Database.Book.filter((book)=>book.ISBN!=isbn)
    Database.Book=filteredBooks;
    return res.json(Database.Book);
});
//Route   -/book/delete/author/:isbn/:id
//Des     -delete an author from a book
//Access  -Public
//Method  -DELETE
//Params  -ISBN,id
ourApp.delete('/book/delete/author/:isbn/:id',(req,res)=>{
    const {isbn,id}=req.params;
    //updating book database object
    Database.Book.forEach((book)=>{
        if(book.ISBN===isbn){
            if(!book.authors.includes(parseInt(id))){
                //res.status(400).json({message: 'Author not present for this book'});
                return book;
            }
            book.authors=book.authors.filter((Id)=>Id!==parseInt(id));
            return book;
        }
        return book;
    });
    Database.Author.forEach((author)=>{
        if(author.id===parseInt(id)){
            if(!author.books.includes(isbn)){
                return author;
            }
            author.books=author.books.filter((book)=>book!==isbn);// instead of filter, pop, slice are also can be used.
            return author;
        }
        return author;

    });
    return res.json({book: Database.Book, author: Database.Author});
});
//Route   -/author/delete
//Des     -delete an author from database
//Access  -Public
//Method  -DELETE
//Params  -id
ourApp.delete("/author/delete/:id",(req,res)=>{
    const {id}=req.params;
    const filteredAuthors=Database.Author.filter((author)=>author.id!==id);
    Database.Author=filteredAuthors;
    return res.json(Database.Author);
});
//Route   -/publication/delete
//Des     -delete an publication from database
//Access  -Public
//Method  -DELETE
//Params  -id
ourApp.delete("/publication/delete/:id",(req,res)=>{
    const {id}=req.params;
    const filteredPublication=Database.Publication.filter((publication)=>publication.id!==id);
    Database.Publication=filteredPublication;
    return res.json(Database.Publication);
});
//Route   -/publication/delete/book
//Des     -delete an book from a publication
//Access  -Public
//Method  -DELETE
//Params  -id,isbn
ourApp.delete("/publication/delete/book/:isbn/:id",(req,res)=>{
    const {isbn,id}=req.params;
    
    Database.Book.forEach((book)=>{
        if(book.ISBN===isbn){
            book.publication=0;
            return book;
        }
        return book;
    });

    Database.Publication.forEach((publication)=>{
        if(publication.id === parseInt(id)){
            const filteredBooks=publication.books.filter((book)=>book!==isbn);
            publication.books=filteredBooks;
            return publication;
        }
        return publication;
    });
    return res.json({book: Database.Book, author: Database.Author});
});

ourApp.listen(4000,()=>console.log("Server is running"));