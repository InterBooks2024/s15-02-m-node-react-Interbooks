const BookModel = require('../models/BooksModel')
const booksServices = require('../services/booksServices')

const addBook = async (req, res ) => {
    try{
        const result = await booksServices.addNewBook(req)
        if(result.error) return res.status(400).json(result.message)
        res.status(200).json(result)
    }catch(error){
        console.error(error)
    }
}

const deleteBook = async (req, res) => {
    try{
        const result = await booksServices.deleteBook(req.params.id)
        if(result.error) return res.status(400).json(result)
        res.status(200).json(result)
    }catch(error){
        console.error(error)
    }
}

const getBooks = async (req, res) => {
    try {
        const books = await BookModel.find()
        if(!books || books.length === 0) return res.status(404).json({message: "No books found"})
        res.status(200).json(books)
    }catch(e){
        console.error(e)
    }
}

const editBook = async (req,res) =>{
    const bookId = req.params.id
    const updateData = req.body
    try{
        const updateBook = await booksServices.editBook(bookId, updateData)
        res.status(200).json(updateBook)
    } catch(e){
        res.status(400).json({message: error.message})
    }
}

// const editBook = async (req,res) =>{
//     try{
//         const id = req.params.id
//         const {updates} = req.body
//         console.log("controllers",updates)
//         const result = await booksServices.editBook(id,updates)
//         if (result.error) return res.status(400).json(result)
//         res.status(200).json(result) 
//     } catch (e){
//         console.error(e)
//     }
// }

module.exports = {
    addBook,
    deleteBook,
    getBooks,
    editBook
}