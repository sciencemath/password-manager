import { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Icon,
} from '@mui/material';
import { Lock, LockOpen, ContentCopy } from '@mui/icons-material';

/**
 *
 * @param {string} title
 * @param {string} password
 * @returns JSX
 */
export const PasswordCard = ({ title, password }) => {
  const [togglePassword, setTogglePassword] = useState(false);

  return (
    <Card variant="outlined">
      <CardContent>
        <Icon aria-label="passwordlock">
          {togglePassword ? <LockOpen /> : <Lock />}
        </Icon>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h5" component="div" className="showPass">
          {togglePassword ? password : 'Hidden'}
        </Typography>
      </CardContent>
      <div>
        <CardActions style={{ position: 'relative' }}>
          <Button
            size="small"
            onClick={() => setTogglePassword(!togglePassword)}
          >
            {togglePassword ? 'Hide' : 'Show'} Password
          </Button>
          {togglePassword && (
            <Icon
              onClick={(event) => {
                const targetPasswordElement =
                  event.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(
                    'showPass',
                  );

                if (!targetPasswordElement.length) {
                  return;
                }

                navigator.clipboard.writeText(
                  targetPasswordElement[0].innerText,
                );
              }}
              style={{
                position: 'absolute',
                right: '10px',
                color: '#1976d2',
                cursor: 'pointer',
              }}
            >
              {<ContentCopy fontSize="small" />}
            </Icon>
          )}
        </CardActions>
      </div>
    </Card>
  );
};
