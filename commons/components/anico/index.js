import styles from './index.less';

const Anico=props=><span className={styles.anico}>
  <span className={props.type?`${styles.hline} ${styles[props.type]}`:styles.hline} />
</span>;

export default Anico;







