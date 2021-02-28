import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'


class ListBooks extends Component {

    render() {
        const { books, reloadList } = this.props; 
        const showingCurrent = (shelf) => (
          books.filter(b => (
            b.shelf.toLowerCase()===shelf.toLocaleLowerCase()
          ))
        )

        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf 
                  title='Currently Reading'
                  books={showingCurrent('currentlyReading')}
                  reloadShelf={reloadList} 
                />

                <BookShelf 
                  title='Want to Read'
                  books={showingCurrent('wantToRead')}
                  reloadShelf={reloadList} 
                />

                <BookShelf 
                  title='Read'
                  books={showingCurrent('read')}
                  reloadShelf={reloadList} 
                />

              </div>
            </div>
            <div className="open-search">
              <Link
                to='/search'
                className='open-search-button'
                >
                Add a book
              </Link>
            </div>
          </div>
        )
    }
}

ListBooks.propTypes = {
    books: PropTypes.array.isRequired,
    reloadList: PropTypes.func.isRequired
}

export default ListBooks;