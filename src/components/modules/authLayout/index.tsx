import React from 'react';
import styles from './authLayout.module.scss';
const backBackground = '/assets/images/home/authBackground.png';

const AuthLayout = ({ children }: any) => {
  return (
    <div>
      <div className={styles.childrenSection}>
        <div className={styles.signupMainSection}>
          <div className={styles.signupMainGrid}>
            <div className={styles.signupRightMain}>
              <div className={styles.formImage}>
                <img src={backBackground} alt="Background" />
              </div>
            </div>
            <div className={styles.signupLeftMain}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
