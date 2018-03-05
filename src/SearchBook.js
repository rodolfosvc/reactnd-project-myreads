import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import If from './If'
import _ from 'lodash'

class SearchBook extends Component {

	state = {
		foundBooks: [],
		query: '',
		searching: false
	}

	findBook = _.debounce((query) => {
		let { foundBooks } = this.state
		if(!_.isEmpty(query)){
			BooksAPI.search(query.trim()).then( (result) => {
				if(result && !result.error){
					foundBooks = result
					foundBooks = this.setFoundBooksShelf(foundBooks)
				}else{
					foundBooks = []
				}
				this.setState({foundBooks, searching: false})
			})
		}else{
			foundBooks = []
			this.setState({foundBooks, searching: false})
		}
	}, 500)

	searchOnChange = (query) => {
		this.setState({query: query, searching: true})
		this.findBook(query)
	}

	setFoundBooksShelf(foundBooks){
		const { books } = this.props

		return foundBooks.map((foundBook) => {
			var existingBook = books.find(book => book.id === foundBook.id)
			if(existingBook)
				foundBook.shelf = existingBook.shelf
			else
				foundBook.shelf = "none"
			return foundBook
		})
	}

	render(){
		const { foundBooks, query, searching } = this.state
		const { onUpdateBookStatus } = this.props

		return (
			<div className="search-books">
		        <div className="search-books-bar">
		          <Link to="/" className="close-search">Close</Link>
		          <div className="search-books-input-wrapper">
		            <input value={query} onChange={(e) => this.searchOnChange(e.target.value)} type="text" placeholder="Search by title or author"/>
		          </div>
		        </div>
		        <div className="search-books-results">
		        	<If test={!searching && !_.isEmpty(query) && foundBooks.length > 0}>
				        <ol className="books-grid">
				        	{foundBooks.map( book => (
				        		<li key={book.id}>
				        			<Book book={book} onUpdateBookStatus={onUpdateBookStatus}/>
				        		</li>
				        	))}
				        </ol>
			        </If>
			        <If test={!searching && !_.isEmpty(query) && foundBooks.length === 0}>
				        <h4 className="searching">No books found</h4>
			        </If>
			        <If test={searching}>
				        <h4 className="searching">Searching...</h4>
			        </If>
	        	</div>
			</div>
		)
	}
}

SearchBook.propTypes = {
	books: PropTypes.array.isRequired,
	onUpdateBookStatus: PropTypes.func.isRequired
}

export default SearchBook