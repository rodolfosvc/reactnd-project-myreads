import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const BookList = ({listTitle, books, onUpdateBookStatus}) => {

	const titleNoBlanckChar = listTitle.replace(/\s/g,'') // remover espaços em branco do título
	let currentBooks = books.filter(book => book.shelf.toLowerCase() === titleNoBlanckChar.toLowerCase())

	return (
	    <div className="list-books-content">
	      <div>
	        <div className="bookshelf">
	          <h2 className="bookshelf-title">{listTitle}</h2>
	          <div className="bookshelf-books">
	            <ol className="books-grid">
								{currentBooks.map( book => (
									<li key={book.id}>
										<Book book={book} onUpdateBookStatus={onUpdateBookStatus}/>
									</li>
								))}
	            </ol>
	          </div>
	        </div>
	      </div>
	    </div>
	)
}

BookList.propTypes = {
	listTitle: PropTypes.string.isRequired,
	books: PropTypes.array.isRequired,
	onUpdateBookStatus: PropTypes.func.isRequired
}


export default BookList