import styles from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ load }) {
  return (
    <button className={styles.loadMore} onClick={load}>
      Load More
    </button>
  );
}
