import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Icon,
} from '@mui/material';
import { Lock, LockOpen } from '@mui/icons-material';
import { useState } from 'react';

export const PasswordCard = ({ title, password }) => {
  const [togglePassword, setTogglePassword] = useState(false);

  return (
    // <Box
    //   sx={{
    //     display: 'flex',
    //     flexWrap: 'wrap',
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //   }}
    // >
    <Card variant="outlined">
      <CardContent>
        <Icon aria-label="passwordlock">
          {togglePassword ? <LockOpen /> : <Lock />}
        </Icon>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {togglePassword ? password : 'Hidden'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => setTogglePassword(!togglePassword)}>
          {togglePassword ? 'Hide' : 'Show'} Password
        </Button>
      </CardActions>
    </Card>
    // </Box>
  );
};
