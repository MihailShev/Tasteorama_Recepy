import style from "./Loader3.module.css";
const f = (
  <svg width="24" height="24">
    <use href="/img/svg/icons.svg#icon-free"></use>
  </svg>
);
const p = (
  <svg width="24" height="24">
    <use href="/img/svg/icons.svg#icon-pancake"></use>
  </svg>
);
const s = (
  <svg width="24" height="24">
    <use href="/img/svg/icons.svg#icon-soup"></use>
  </svg>
);
const b = (
  <svg width="24" height="24">
    <use href="/img/svg/icons.svg#icon-burger"></use>
  </svg>
);
const c = (
  <svg width="24" height="24">
    <use href="/img/svg/icons.svg#icon-cake"></use>
  </svg>
);
const m = (
  <svg width="24" height="24">
    <use href="/img/svg/icons.svg#icon-meat"></use>
  </svg>
);
const r = (
  <svg width="24" height="24">
    <use href="/img/svg/icons.svg#icon-ramen"></use>
  </svg>
);
const rm = (
  <svg width="24" height="24">
    <use href="/img/svg/icons.svg#icon-rmeat"></use>
  </svg>
);
const pu = (
  <svg width="24" height="24">
    <use href="/img/svg/icons.svg#icon-puding"></use>
  </svg>
);
const pi = (
  <svg width="24" height="24">
    <use href="/img/svg/icons.svg#icon-pizza"></use>
  </svg>
);

const Loader = () => {
  const foodItems = [f, p, m, b, s, c, r, rm, pu, pi];

  return (
    <div className={style.foodLoaderContainer}>
      <div className={style.wrap}>
        <div className={style.scrollTrack}>
          <div className={style.scrollingContent}>
            {foodItems.map((item, index) => (
              <span className={style.item} key={`original-${index}`}>
                {item}
              </span>
            ))}
            {foodItems.map((item, index) => (
              <span className={style.item} key={`clone-${index}`}>
                {item}
              </span>
            ))}
            {foodItems.map((item, index) => (
              <span className={style.item} key={`original-${index}`}>
                {item}
              </span>
            ))}
            {foodItems.map((item, index) => (
              <span className={style.item} key={`clone-${index}`}>
                {item}
              </span>
            ))}
            {foodItems.map((item, index) => (
              <span className={style.item} key={`original-${index}`}>
                {item}
              </span>
            ))}
            {foodItems.map((item, index) => (
              <span className={style.item} key={`clone-${index}`}>
                {item}
              </span>
            ))}
            {foodItems.map((item, index) => (
              <span className={style.item} key={`original-${index}`}>
                {item}
              </span>
            ))}
            {foodItems.map((item, index) => (
              <span className={style.item} key={`clone-${index}`}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
