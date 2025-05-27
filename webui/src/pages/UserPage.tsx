import { useGetUsers } from "../fakeapi/useGetUsers";
import styles from "./UserPage.module.css";
import { Filters } from "./userPage/Filters";
import { Users } from "./userPage/Users";

export const UserPage = () => {
  const { users, loading, error } = useGetUsers();
  console.log("users", users);
  return (
    <div className={styles["user-page"]}>
      <div className="search">This is search</div>
      <div className={styles["filters-users-container"]}>
        <Filters />
        <Users />
      </div>
    </div>
  );
};

// Html style repetitions 
const UserPage1 = () => {

  return (
    <div className={styles["user-page"]}>
      {/* For starters ill section off the page into 3 parts, search, filters and users */}
      <div className="search">This is search</div>
      {/* I can see that filters and search will need to be below search so i setup a container */}
      <div className={styles["filters-users-container"]}>
        Filters Users Container
        <div className={styles["filters"]}> This is filters </div>
        <div className={styles["users"]}>
          {/* Again similar to how search sits above filters and users, i will do the same for user filters */}
          <div className={styles["users-filters"]}>This is user filters</div>
          {/* When processing each user they can fit into these repeatable caards */}
          <div className={styles["user"]}>
            <div className={styles["pfp"]}> This is pfp </div>
            <div className={styles["details"]}>This is user details</div>
            <div className={styles["actions"]}>
              <div className={styles["payment-details"]}> This is payment details </div>
              <div className={styles["actions__buttons"]}> This is action buttons</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}