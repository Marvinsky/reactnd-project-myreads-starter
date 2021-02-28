import React, { Component } from 'react'
import DropDown from './DropDown'
import PropTypes from 'prop-types'

class Book extends Component {
    render() {
        const { book, onChangeShelf } = this.props;
        const { title, authors, imageLinks } = book;
        return (
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" 
                  style={{ 
                    width: 128, 
                    height: 193, 
                    backgroundImage: `url(${imageLinks ? imageLinks.thumbnail : '' })` }}>
                  </div>
                  <DropDown
                    book={book}
                    onChangeShelf={onChangeShelf} />
                </div>
                <div className="book-title">{authors ? authors.join(', ') : ''}</div>
                <div className="book-authors">{title}</div>
              </div>      
        )
    }
}

Book.PropTypes = {
  book: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
};

export default Book;
