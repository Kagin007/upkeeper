import Button from "./Button";
import InputForm from "./InputForm";
import useCitySuggestions from "../hooks/useCitySuggestions";
import CitySuggestions from "./CitySuggestions";
import axios from "axios";
import React, { useEffect, useState } from "react";

const SearchForm = ({ setCleaners, setSelectedDate, toasterFunction }) => {
  const {
    onSearchHandler,
    onClickHandler,
    inputValue,
    citySearch,
    suggestions,
  } = useCitySuggestions();

  const submitHandler = e => {
    e.preventDefault();
    const date = e.target.date.value;
    const city = e.target.city.value;
    if (date && city) {
      axios
        .get(`/api/users/${city.toLowerCase()}/${date}`)
        .then(res => {
          setCleaners(res.data);
          setSelectedDate(date);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      toasterFunction("Please provide Location and Date for the Search.");
    }
  };

  return (
    <section className="searchform" onClick={onClickHandler}>
      <header>
        <h2>Search for Cleaners in Your Area:</h2>
      </header>
      <form onSubmit={submitHandler} autoComplete="off">
        <InputForm
          placeholder="City"
          onChange={onSearchHandler}
          inputValue={inputValue}
          name="city"
        />
        {citySearch && (
          <CitySuggestions suggestions={suggestions} onClick={onClickHandler} />
        )}
        <InputForm placeholder="Date" type="date" name="date" />
        <Button>Search</Button>
      </form>
    </section>
  );
};

export default SearchForm;
