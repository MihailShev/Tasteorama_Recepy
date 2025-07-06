import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';
import { selectSelectedCategory, selectSelectedIngredient } from '../../redux/filters/selectors';
import { setSelectedCategory, setSelectedIngredient, resetSelectedFilters} from '../../redux/filters/slice'
import css from './Filters.module.css';
import Dropdown from '../DropDown/DropDown';
import { selectTotalRecipes } from '../../redux/recipes/selectors';



export default function Filters({categories, ingredients}) {
  const isMobile = useMediaQuery({ maxWidth: 1439 });
   const [isFilterOpen, setisFilterOpen] = useState(false);
  const totalRecipes = useSelector(selectTotalRecipes);
  const dispatch = useDispatch();
  
  const selectedCategory = useSelector(selectSelectedCategory);
  const selectedIngredient = useSelector(selectSelectedIngredient);


  const handleReset = () => {
    dispatch(resetSelectedFilters());
  };

  const handleMobileFiltersOpen = () => {
    setisFilterOpen(!isFilterOpen);
  }

  return (
    <div className={css.filtersSection}>
      <h2 className={css.title}>Recipes</h2>

      <div className={css.resultRow}>
        <p className={css.count}>{totalRecipes} recipes</p>
        {isMobile ? (
        <>
        <button className={css.mobileFiltersBtn} onClick={handleMobileFiltersOpen}> 
          Filters
            {isFilterOpen 
            ? (<div className={css.iconContainer}>
              <svg className={css.filtersIconClose} aria-label="icon">
              <use xlinkHref="/img/svg/icons.svg#icon-close-mob-menu-btn" />
              </svg>
              </div>)
            : (<div className={css.iconContainer}>
              <svg className={css.filtersIcon} aria-label="icon">
              <use xlinkHref="/img/svg/icons.svg#icon-filter" />
              </svg>
              </div>)}
        </button>
        {isFilterOpen && 
        <div className={css.mobileFiltersRow}>
          <Dropdown
            options={categories}
            value={categories.find(i => i.name  === selectedCategory)}
            onChange={(option) => dispatch(setSelectedCategory(option.name))}
            placeholder="Category"
          />
          <Dropdown
            options={ingredients}
            value={ingredients.find(i => i._id === selectedIngredient)}
            onChange={(option) => dispatch(setSelectedIngredient(option._id))}
            placeholder="Ingredient"
          />
          <button className={css.resetBtn} onClick={handleReset}>Reset filters</button>
        </div>}
        </>
      ) : (
        <div className={css.filtersRow}>
        <button className={css.resetBtn} onClick={handleReset}>Reset filters</button>
          <Dropdown
            options={categories}
            value={categories.find(i => i.name  === selectedCategory)}
            onChange={(option) => dispatch(setSelectedCategory(option.name))}
            placeholder="Category"
          />
          <Dropdown
            options={ingredients}
            value={ingredients.find(i => i._id === selectedIngredient)}
            onChange={(option) => dispatch(setSelectedIngredient(option._id))}
            placeholder="Ingredient"
          />
        </div>
      )}


      </div>

    </div>
  );
}