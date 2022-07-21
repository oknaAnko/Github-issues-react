import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { storeSearchValue } from "../store/results/actions";
import useDebounce from "../helpers/useDebounce";
import logo from "../images/logo.png";

const Menu = () => {
  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(searchValue, 500);

  useEffect(() => {
    dispatch(storeSearchValue(searchValue));
  }, [debouncedValue]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <header className="menu">
        <div className="wrapper">
          <Link to="/">
            <img src={`${logo}`} alt="logo" />
          </Link>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              className="button-search"
              placeholder="Search"
              value={searchValue}
              onChange={handleInputChange}
            />
          </form>
        </div>
      </header>
    </>
  );
};

export default Menu;
