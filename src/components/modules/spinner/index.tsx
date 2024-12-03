import styles from './spinner.module.scss';

const Spinner = () => {
  return <div className={`${styles.spinner} ${styles.loading}`}></div>;
};

export default Spinner;
