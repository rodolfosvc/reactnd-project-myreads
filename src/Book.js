import React from 'react'
import ReactStars from 'react-stars'
import { Button, Glyphicon } from 'react-bootstrap'

const Book = ({book, onUpdateBookStatus}) => {
	return (
		<div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={(e) => onUpdateBookStatus(e.target.value, book)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {book.authors && book.authors.map( author => (
          	<div key={`${author}`} className="book-authors">{author}</div>
          ))}
          <ReactStars value={book.averageRating ? book.averageRating : 0} count={5} edit={false}/>
          <Button onClick={() => window.open(`${book.infoLink}`, "_blank")} bsSize="xsmall"><Glyphicon glyph="info-sign"/> information </Button>
        </div>
	)
}

export default Book