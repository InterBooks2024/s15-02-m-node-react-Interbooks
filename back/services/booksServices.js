const BookModel = require('../models/BooksModel')
const UserModel = require('../models/User')
const uploadImage = require('../utils/uploadImg')
const mongoose = require('mongoose')

const addNewBook = async (req) => {
    if(!req.file) return {message: "Image is required",
        error: true
    }
    const imgUrl = await uploadImage(req.file.path, 'books')
    if(!imgUrl){
        return res.status(500).json({error: "Error uploading image"})
    }
    const {title, year, author, genre, isbn, actions } = req.body
    
    const newBook = new BookModel({
        title,
        year,
        ISBN: isbn || null,
        author,
        genre,
        image: imgUrl,
        actions: actions.split(','),
        userId: req.user._id
    })
    await newBook.save()
    req.user.books.push(newBook._id);
    await req.user.save();

    return {
        message: "Book added",
        book: newBook
    }
}

const deleteBook = async (id) => {
    try{
        const book = await BookModel.findById(id)
        if(!book){
            return {
                error: 'Book not found'
            }
        }else{
            await BookModel.findByIdAndDelete(id)
            await UserModel.findByIdAndUpdate({_id: book.userId}, {$pull: {books: book._id}})
            return {
                error: false,
                message: "Book deleted"
            }
        }
    }catch(error){
        console.log(error)
       return{message: 'Error deleting book', error}
    }
}   

const editBook = async (bookId,updateData) =>{
    try{
        const updatedBook = await BookModel.findByIdAndUpdate(bookId,{$set: updateData},{new:true, runValidators:true})

        if(!updatedBook) { return { error: "Book not found"}}
        
        return updatedBook
    } catch(e){
        console.log("Error updating book",e)
        return{message: 'Error deleting book', e}
    }
}
// const editBook = async (id,updates) => {
//     try{
//         console.log("services",updates)
//         const book = await BookModel.findById(id)
//         if(!book){
//             return { error : "Book not found"}
//         }
        
//         for (let key in updates){
//             if(book[key] !== undefined) {
//                 book[key] = updates[key]
//             }
//         }

//         await book.save()
//         return { message: "Book updated", book }
//     } catch (e) {
//         console.log("Error updating books",e)
//         return { message: "Error updating books", e}
//     }
// }



module.exports = {
    addNewBook,
    deleteBook,
    editBook
}