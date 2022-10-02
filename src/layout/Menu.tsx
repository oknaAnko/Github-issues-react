import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { storeSearchValue } from "../store/results/actions";
import useDebounce from "../helpers/useDebounce";
import logo from "../images/logo.png";
import { useSelector } from "react-redux";
import { getSearchValue } from "../store/results/selectors";

const Menu = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(searchValue, 500);

  // const searchValueFromStore = useSelector(getSearchValue);
  // console.log("searchValue", searchValue);
  // console.log("searchValueFromStore", searchValueFromStore);

  // useEffect(() => {
  //   if (searchValueFromStore !== searchValue) {
  //     setSearchValue(searchValueFromStore);
  //   }
  // }, [searchValueFromStore]);

  useEffect(() => {
    dispatch(storeSearchValue(searchValue));
    navigate("/");
  }, [debouncedValue]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <header className="menu-container">
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
      </header>
    </>
  );
};

export default Menu;
