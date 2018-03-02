import React, {Component} from 'react'
import { Link } from 'react-router-dom'
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
			BooksAPI.search(query).then( (result) => {
				if(result && !result.error){
					foundBooks = result
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
		
	saerchOnChange = (query) => {
		this.setState({query: query.trim(), searching: true})
		this.findBook(query)
	}

	setFoundBooksShelf(foundBooks){
		const { books } = this.props

		foundBooks = foundBooks.map((book) => {
			var existingBook = books.filter(b => b.id === book.id)[0]
			if(existingBook)
				book.shelf = existingBook.shelf
			else
				book.shelf = "none"
			return book
		})

	}

	render(){
  	const { foundBooks, query, searching } = this.state
  	const { onUpdateBookStatus } = this.props
  	foundBooks.length > 0 && this.setFoundBooksShelf(foundBooks)
    	
		return (
			<div className="search-books">
		        <div className="search-books-bar">
		          <Link to="/" className="close-search">Close</Link>
		          <div className="search-books-input-wrapper">
		            <input value={query} onChange={(e) => this.saerchOnChange(e.target.value)} type="text" placeholder="Search by title or author"/>
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

export default SearchBook