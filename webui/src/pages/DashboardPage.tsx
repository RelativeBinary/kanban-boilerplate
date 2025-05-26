import { Card, CardContent, CardHeader, Paper, Typography } from "@mui/material";
import styles from './DashboardPage.module.css'


export const DashboardPage = () => {
  return (
    <Paper className={styles['dashboard']}>
      <Card variant="outlined" className={styles['backlog-card']}>
        <CardContent>
          <Typography gutterBottom>
            This is a task card
          </Typography>
        </CardContent>
      </Card>
       <Card variant="outlined" className={styles['inprogress-card']}>
        <CardContent>
          <Typography gutterBottom>
            This is a task card
          </Typography>
        </CardContent>
      </Card>
       <Card variant="outlined" className={styles['complete-card']}>
        <CardContent>
          <Typography gutterBottom>
            This is a task card
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
};
