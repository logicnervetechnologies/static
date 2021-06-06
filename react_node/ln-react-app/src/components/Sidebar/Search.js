import React from 'react';

const Search = ({value, onSearch, style}) => {
    return (
    <div>
        <tr>
    <label style={{color:'white', alignItems:'center'}} htmlFor="searchInput">Search: </label>
    <input id="searchInput" type="text"
        value={value}
        onChange={onSearch} />
        </tr>
     </div>
    )
};

export default Search