import { Card, CardHeader, Paper } from "@mui/material";
import styles from './Dashboard.module.css'


export const Dashboard = () => {
  return (
    <Paper className={styles['dashboard-pat']}>
      <Card>
        <CardHeader>This is a card header</CardHeader>
      </Card>
    </Paper>
  );
};
