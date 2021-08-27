import React from 'react';
import { Button, ButtonGroup, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    '&$disabled': {
      color: 'rgba(0, 0, 0, 0.87)',
      borderTopColor: 'rgba(0, 0, 0, 0.23)',
      borderBottomColor: 'rgba(0, 0, 0, 0.23)',
      borderLeftColor: 'rgba(0, 0, 0, 0.23)'
    }
  },
  disabled: {}
}));

interface Props {
  value: number;
  updateState: (change: number) => void;
}

export const StateButtons: React.FC<Props> = ({ value, updateState }) => {
  const { root, disabled } = useStyles();

  return (
    <ButtonGroup size="large">
      <Button onClick={() => updateState(-1)}>
        -
      </Button>
      <Button disabled classes={{ root: root, disabled: disabled }}>
        {value}
      </Button>
      <Button onClick={() => updateState(1)}>+</Button>
    </ButtonGroup>
  );
};
