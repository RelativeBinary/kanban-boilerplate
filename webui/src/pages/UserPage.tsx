import { useGetUsers } from "../fakeapi/useGetUsers";
import styles from './UserPage.module.css';

export const UserPage = () => {
  const { users, loading, error } = useGetUsers();

  return (
    <div className={styles["user-page"]}>
      <div className="search">
        This is search
      </div>
      <div className="filters"> This is filters </div>
      <div className="users">
        <div className="users-filters">
          This is user filters 
        </div>
        <div className="user">
          <div className="pfp"> This is pfp </div>
          <div className="details">
            This is user details 
          </div>
          <div className="actions">
            <div className="payment-details"> This is payment details </div>
            <div className="actions__buttons"> This is action buttons</div>
          </div>
        </div>
      </div>
    </div>
  );
};
