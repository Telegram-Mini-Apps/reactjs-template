import styles from './PromoBanner.module.css';

const PromoBanner = () => {
  return (
    <div className={styles.container}>
      <img src={'../../../assets/gold.png'} alt={'Gold icon'} />

      <div className={styles.content}>
        <p className={styles.title}>The Easiest way to mine 24K pure gold online</p>
        <p className={styles.subtitle}>Contrary to popular belief, Lorem Ipsum. simply random text.</p>
      </div>
    </div>
  );
};

export default PromoBanner;
