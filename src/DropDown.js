import React from 'react';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types'


const DropDown = ({book, onChangeShelf}) => {

    const { id, shelf } = book;

    const onHandleChange = (event) => {
        BooksAPI.update(book, event.target.value)
            .then(() => {
                onChangeShelf();
            });
    }

    return (
    <div className="book-shelf-changer">
        <select name={id} defaultValue={shelf} 
            onChange={onHandleChange}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
        </select>
    </div>
        );
}

DropDown.PropTypes = {
    book: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
};

export default DropDown;