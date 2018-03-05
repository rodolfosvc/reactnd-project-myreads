import React from 'react'
import ReactStars from 'react-stars'
import { Button, Glyphicon } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Book = ({book, onUpdateBookStatus}) => {

  const thumbnail = book.imageLinks? book.imageLinks.thumbnail : ''
  const authors = book.authors? book.authors : []

	return (
		<div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={(e) => onUpdateBookStatus(e.target.value, book)}>
                <option value="moveTo" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {authors && authors.map( author => (
          	<div key={`${author}`} className="book-authors">{author}</div>
          ))}
          <ReactStars value={book.averageRating ? book.averageRating : 0} count={5} edit={false}/>
          <Button onClick={() => window.open(`${book.infoLink}`, "_blank")} bsSize="xsmall"><Glyphicon glyph="info-sign"/> information </Button>
        </div>
	)
}

Book.propTypes = {
	book: PropTypes.array.isRequired,
	onUpdateBookStatus: PropTypes.func.isRequired
}

export default Book