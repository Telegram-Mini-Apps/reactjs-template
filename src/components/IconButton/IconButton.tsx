import { FC } from 'react';
import styles from './IconButton.module.css';

const ICON_SRCS = {
  boost: '../../../assets/rocket.svg',
  rewards: '../../../assets/reward.svg',
  mine: '../../../assets/mine.svg',
  fav: '../../../assets/star.svg',
};

type IconType = 'boost' | 'rewards' | 'mine' | 'fav';

interface Props {
  badge?: number;
  icon?: IconType;
  title?: string;
  onClick?: () => void;
}

const IconButton: FC<Props> = ({ badge, icon = 'boost', title, onClick }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      {badge && (
        <div className={styles.badge}>
          <span className={styles.badgeText}>{badge}</span>
        </div>
      )}

      <div className={styles.button}>
        <img src={ICON_SRCS[icon]} alt={`${icon} icon`} />
      </div>

      {title && <span className={styles.title}>{title}</span>}
    </div>
  );
};

export default IconButton;
