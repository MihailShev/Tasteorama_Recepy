import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedQuery } from '../../redux/filters/slice';
import css from '../SearchBox/SearchBox.module.css';
import { selectSelectedQuery } from '../../redux/filters/selectors';

export default function SearchBox() {
  const dispatch = useDispatch();
  const selectedQuery = useSelector(selectSelectedQuery);
  const [inputValue, setInputValue] = useState(selectedQuery);

  useEffect(() => {
    setInputValue(selectedQuery);
  }, [selectedQuery]);

  const handleSearch = () => {
    dispatch(setSelectedQuery(inputValue));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className={css.searchBarSection}>
      <div className={css.overlay}>
        <h1 className={css.title}>Plan, Cook, and<br />Share Your Flavors</h1>
        <form onSubmit={handleSubmit} className={css.searchBox}>
          <input
            type="text"
            placeholder="Search recipes"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={css.input}
          />
          <button type="submit" className={css.button}>
            Search
          </button>
        </form>
      </div>
    </div>
  );
}



  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     dispatch(setSelectedQuery(inputValue));
  //   }, 700);

  //   return () => {
  //     clearTimeout(handler);
  //   };
  // }, [inputValue, dispatch]);