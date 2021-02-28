import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI';
import {DebounceInput} from 'react-debounce-input';
import Book from './Book'

class SearchBook extends Component {

    state = {
      query: '',
      searchedBooks: []
    }

    reloadListBooks = (query) => {
      if (query.trim() && query.length) {
        BooksAPI.search(query)
          .then((matchingBooks) => {
            if (matchingBooks && matchingBooks.length) {
              var searchedBooks = matchingBooks.map((book) => this.updateShelfInfo(book))
              this.setState({searchedBooks})
            } else {
              this.setState({searchedBooks: []})
            }
        })
      } else {
        this.setState({searchedBooks: []})
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
                <DebounceInput
                debounceTimeout={500}
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
                    <li key={book.id}>
                      <Book book={book} onChangeShelf={reloadShelves} />
                    </li>
                  ))
                }
              </ol>
            </div>
          </div>
        )
    }
}

SearchBook.propTypes = {
  booksOnShelf: PropTypes.array.isRequired,
  reloadShelves: PropTypes.func.isRequired
}

export default SearchBook;