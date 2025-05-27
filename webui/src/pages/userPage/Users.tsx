import styles from "./Users.module.css";

export const Users = () => {
  return (
    <div className={styles["users"]}>
      <div className={styles["users-filters"]}>This is user filters</div>
      <div className={styles["user"]}>
        <div className={styles["pfp"]}> This is pfp </div>
        <div className={styles["details"]}>This is user details</div>
        <div className={styles["actions"]}>
          <div className={styles["payment-details"]}>
            This is payment details
          </div>
          <div className={styles["actions__buttons"]}>
            This is action buttons
          </div>
        </div>
      </div>
    </div>
  );
};
