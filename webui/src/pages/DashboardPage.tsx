import { Card, CardHeader, Paper } from "@mui/material";
import styles from './DashboardPage.module.css'


export const DashboardPage = () => {
  return (
    <Paper className={styles['dashboard-pat']}>
      <Card>
        <CardHeader>This is a card header</CardHeader>
      </Card>
    </Paper>
  );
};
