import React from 'react';
import { Modal } from '../Modal';
import { CircularProgress } from './';
import { Card } from '../Card';

// style
import { useStyles } from '../../styles';
import { Box } from '../Layouts';

export const GlobalCircleLoader = ({
  isOpen
}) => {
  const classes = useStyles();
  return (
    <Modal open={isOpen}>
      <Box
        height="100vh"
        className={`${classes.container} ${classes.disableFocus}`}
      >
        <Card
          className={`${classes.loadingCardOnModal} ${classes.disableFocus}`}
          variant="elevation"
        >
          {/* CardContentはlast-childにpb=3が入っているため一旦↓で */}
          <Box p={2}>
            <CircularProgress />
          </Box>
        </Card>
      </Box>
    </Modal>
  );
};
