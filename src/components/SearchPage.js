import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import styles from "./SearchPage.module.css";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const history = useHistory();
  return (
    <>
      <link
        href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <input
        key="random1"
        value={keyword}
        className={styles.searchBar}
        placeholder={"Nunca dejes de buscar"}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />
      <button
        type="submit"
        className={styles.searchButton}
        onClick={() =>
          history.replace(`/ItemContainer/items?search=${keyword}`, {
            keyword: keyword,
          })
        }
      >
        <i class="fa fa-search"></i>
      </button>
    </>
  );
};

export default SearchBar;
