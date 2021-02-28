import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI';
import Book from './Book'

class Search extends Component {

    static PropTypes = {
      booksOnShelf: PropTypes.array.isRequired,
      reloadShelves: PropTypes.func.isRequired
    }

    state = {
      query: '',
      searchedBooks: []
    }

    reloadListBooks = (query) => {
      this.setState({query: query.trim()})
      if (query.trim()) {
        BooksAPI.search(query)
          .then((matchingBooks) => {
            if (matchingBooks && matchingBooks.length) {
              var searchedBooks = matchingBooks.map((book) => this.updateShelfInfo(book))
              this.setState({searchedBooks})
            } else {
              this.setState({searchedBooks: []})
            }
        })
      }
    }

    updateShelfInfo = (book) => {
      book.shelf = 'none'
      if (this.props.booksOnShelf && this.props.booksOnShelf.length) {
        var bookFromShelf = this.props.booksOnShelf.filter((b) => b.id === book.id)
        if (bookFromShelf.length) {
          book.shelf = bookFromShelf[0].shelf
        }
      }
      return book
    }


    render() {
        const { reloadShelves } = this.props
        const {query, searchedBooks} = this.state
        
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link
                className='close-search'
                to='/'
              >
                Close
              </Link>              
              <div className="search-books-input-wrapper">
                <input 
                type="text"
                placeholder="Search by title or author"
                value={query}
                onChange={(event) => this.reloadListBooks(event.target.value)}
                />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {
                  searchedBooks.map((book) => (
                    <Book book={book} onChangeShelf={reloadShelves} />
                  ))
                }
              </ol>
            </div>
          </div>
        )
    }
}

export default Search;