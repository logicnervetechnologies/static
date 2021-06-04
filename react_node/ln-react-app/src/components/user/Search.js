import React from 'react';

const Search = ({value, onSearch}) => {
    return (
    <div>
        <tr>
    <label htmlFor="searchInput">Search: </label>
    <input id="searchInput" type="text"
        value={value}
        onChange={onSearch} />
        </tr>
     </div>
    )
};

export default Search