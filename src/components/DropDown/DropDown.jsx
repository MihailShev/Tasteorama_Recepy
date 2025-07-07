// import { useState, useRef, useEffect } from 'react';
// import css from './DropDown.module.css';

// export default function Dropdown({ options, value, onChange, placeholder }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const handleClickOutside = (e) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//       setIsOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleSelect = (option) => {
//     onChange(option);
//     setIsOpen(false);
//   };

//   return (
//     <div className={css.dropdown} ref={dropdownRef}>
//       <button className={css.button} onClick={() => setIsOpen(!isOpen)}>
//         {<>
//         {value ? value : placeholder}
//         <svg className={css.saveIcon} aria-label="icon">
//             <use xlinkHref="/img/svg/icons.svg#icon-save" />
//         </svg>
//         </>}
//       </button>
//       {isOpen && (
//         <ul className={css.menu}>
//           {options.map((option) => (
//             <li
//               key={option}
//               className={css.item}
//               onClick={() => handleSelect(option)}
//             >
//               {option}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

import { useState, useRef, useEffect } from 'react';
import css from './DropDown.module.css';

export default function Dropdown({ options, value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={css.dropdown} ref={dropdownRef}>
      <button className={css.button} onClick={() => setIsOpen(!isOpen)}>
        <>
          {value?.name || placeholder}
          <svg className={css.iconDown} aria-label="icon">
            <use xlinkHref="/img/svg/icons.svg#icon-filters-down" />
          </svg>
        </>
      </button>
      {isOpen && (
        <ul className={css.menu}>
          {options.map((option) => (
            <li
              key={option._id}
              className={css.item}
              onClick={() => handleSelect(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
