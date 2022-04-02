import { useState } from "react";
import canadianCities from "../static/cities";

const useCitySuggestions = () => {
  const [inputValue, setInputValue] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const onSearchHandler = e => {
    setInputValue(e.target.value);
    setCitySearch(e.target.value);
    const regex = new RegExp(
      `^${e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)}`,
      "i"
    );
    setSuggestions(canadianCities.filter(city => regex.test(city)));
    if (suggestions.length === 0) {
      setCitySearch("");
    }
  };
  const onClickHandler = e => {
    if (typeof e === "string") {
      setInputValue(e);
    }
    setCitySearch("");
  };
  return {
    onSearchHandler,
    onClickHandler,
    inputValue,
    citySearch,
    suggestions,
  };
};

export default useCitySuggestions;
