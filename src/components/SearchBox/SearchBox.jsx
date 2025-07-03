import React, { useState } from 'react';
import css from '../SearchBox/SearchBox.module.css';

export default function SearchBox() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    setQuery(query);
    console.log(query)
  };

  return (
    <div className={css.searchBarSection}>
      <div className={css.overlay}>
        <h1 className={css.title}>Plan, Cook, and<br />Share Your Flavors</h1>
        <div className={css.searchBox}>
          <input
            type="text"
            placeholder="Search recipes"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={css.input}
          />
          <button onClick={handleSearch} className={css.button}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
