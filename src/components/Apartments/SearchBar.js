const SearchBar = (props) => {
    const handleChange = (e) => {
        props.onFilter(e.target.value);        
    };
      
    return <input
        type="search"
        placeholder="Search here"
        onChange={handleChange} />
}

export default SearchBar;
