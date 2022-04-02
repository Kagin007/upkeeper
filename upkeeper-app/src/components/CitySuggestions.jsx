const CitySuggestions = props => {
  return (
    <ul className="search-suggestions">
      {props.suggestions.map((suggestion, i) => (
        <li
          key={i}
          className="search-suggestion-item"
          onClick={e => {
            props.onClick(e.target.innerHTML);
          }}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  );
};

export default CitySuggestions;
