import React , {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import { Link, Route } from 'react-router-dom'
import './App.css'
import BookList from './BookList'
import SearchBook from './SearchBook'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount(){
    BooksAPI.getAll().then( (books) => { 
      this.setState({books})
    })
  }

  updateBookStatus = (newShelf, book) => {
    let {books} = this.state
    books = books.filter( b => b.id !== book.id ).concat({
      ...book,
      shelf: newShelf
    })
    BooksAPI.update({id: book.id}, newShelf)
    this.setState({books})
  }

  render() {
    const { books } = this.state
    const bookLists = [
      {shelfTitle: 'Currently Reading', books}, 
      {shelfTitle: 'Want to Read', books},
      {shelfTitle: 'Read', books}
    ]
    return (
      <div className="app">
        <Route path="/search" render={ () => ( 
          <SearchBook
            books={books}
            onUpdateBookStatus={this.updateBookStatus}
          />
        )}/>
        <Route exact path="/" render={ () => (
          <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              {bookLists.map( bookList => (
                <BookList
                  key={bookList.shelfTitle} 
                  listTitle={bookList.shelfTitle}
                  books={bookList.books}
                  onUpdateBookStatus={this.updateBookStatus}
                />
              ))}
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
          </div>
        )}/>   
    </div>
    )
  }
}

export default BooksApp
