import React , {Component} from 'react'
import { Link, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
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
	book.shelf = newShelf
    BooksAPI.update({id: book.id}, newShelf)
    this.setState({books})
  }

  render() {
    const { books } = this.state
    const shelfTitleList = ['Currently Reading', 'Want to Read', 'Read']
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
              {shelfTitleList.map( shelfTitle => (
                <BookList
                  key={shelfTitle}
                  listTitle={shelfTitle}
                  books={books}
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

BooksApp.propTypes = {
	books: PropTypes.array.isRequired
}

export default BooksApp
