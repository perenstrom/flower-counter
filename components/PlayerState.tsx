import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { StateButtons } from './StateButtons';
import { CountType, FlowerCount, Player } from 'types/types';

interface Props {
  player: Player;
  value: Omit<FlowerCount, 'total'>;
  updateState: (player: Player, type: CountType) => (change: any) => void;
}

export const PlayerState: React.FC<Props> = ({
  player,
  value,
  updateState
}) => {
  return (
    <Box padding={1}>
      <Typography variant="h2" align="center">
        {player.charAt(0).toUpperCase() + player.slice(1)}
      </Typography>
      <Box display="flex" justifyContent="center">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginLeft={1}
          marginRight={1}
        >
          <Box paddingBottom={0.5}>
            <Typography variant="h3">Vid giv</Typography>
          </Box>
          <StateButtons
            value={value.atDeal}
            updateState={updateState(player, 'atDeal')}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginLeft={1}
          marginRight={1}
        >
          <Box paddingBottom={0.5}>
            <Typography variant="h3">Under spel</Typography>
          </Box>
          <StateButtons
            value={value.duringGame}
            updateState={updateState(player, 'duringGame')}
          />
        </Box>
      </Box>
    </Box>
  );
};
