import React, { useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Typography
} from '@material-ui/core';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { CountType, Deal, Game, Player } from 'types/types';
import { getDeal, getGame } from 'services/airtable';
import { ParsedUrlQuery } from 'querystring';
import { createDeal, updateDeal } from 'services/local';
import { StateButtons } from 'components/StateButtons';
import { PlayerState } from 'components/PlayerState';
import { formatDate } from 'helpers/utils';
import { useRouter } from 'next/router';

interface Props {
  game: Game;
  deal: Deal;
}

const GamePage: NextPage<Props> = ({ game, deal }) => {
  const [axelAtDeal, setAxelAtDeal] = useState(deal.flowerCount.axel.atDeal);
  const [axelDuringGame, setAxelDuringGame] = useState(
    deal.flowerCount.axel.duringGame
  );
  const [arielleAtDeal, setArielleAtDeal] = useState(
    deal.flowerCount.arielle.atDeal
  );
  const [arielleDuringGame, setArielleDuringGame] = useState(
    deal.flowerCount.arielle.duringGame
  );
  const [sigridAtDeal, setSigridAtDeal] = useState(
    deal.flowerCount.sigrid.atDeal
  );
  const [sigridDuringGame, setSigridDuringGame] = useState(
    deal.flowerCount.sigrid.duringGame
  );
  const [perAtDeal, setPerAtDeal] = useState(deal.flowerCount.per.atDeal);
  const [perDuringGame, setPerDuringGame] = useState(
    deal.flowerCount.per.duringGame
  );

  const updateState = (player: Player, type: CountType) => {
    // Update airtable
    switch (player) {
      case 'axel':
        if (type === 'atDeal') {
          return (change) => {
            const newAmount = axelAtDeal + change;
            updateDeal(deal.airtableId, {
              flowerCount: {
                ...deal.flowerCount,
                axel: { ...deal.flowerCount.axel, atDeal: newAmount }
              }
            });
            setAxelAtDeal(newAmount);
          };
        } else {
          return (change) => {
            const newAmount = axelDuringGame + change;
            updateDeal(deal.airtableId, {
              flowerCount: {
                ...deal.flowerCount,
                axel: { ...deal.flowerCount.axel, duringGame: newAmount }
              }
            });
            setAxelDuringGame(newAmount);
          };
        }
      case 'arielle':
        if (type === 'atDeal') {
          return (change) => {
            const newAmount = arielleAtDeal + change;
            updateDeal(deal.airtableId, {
              flowerCount: {
                ...deal.flowerCount,
                arielle: { ...deal.flowerCount.arielle, atDeal: newAmount }
              }
            });
            setArielleAtDeal(newAmount);
          };
        } else {
          return (change) => {
            const newAmount = arielleDuringGame + change;
            updateDeal(deal.airtableId, {
              flowerCount: {
                ...deal.flowerCount,
                arielle: { ...deal.flowerCount.arielle, duringGame: newAmount }
              }
            });
            setArielleDuringGame(newAmount);
          };
        }
      case 'sigrid':
        if (type === 'atDeal') {
          return (change) => {
            const newAmount = sigridAtDeal + change;
            updateDeal(deal.airtableId, {
              flowerCount: {
                ...deal.flowerCount,
                sigrid: { ...deal.flowerCount.sigrid, atDeal: newAmount }
              }
            });
            setSigridAtDeal(newAmount);
          };
        } else {
          return (change) => {
            const newAmount = sigridDuringGame + change;
            updateDeal(deal.airtableId, {
              flowerCount: {
                ...deal.flowerCount,
                sigrid: { ...deal.flowerCount.sigrid, duringGame: newAmount }
              }
            });
            setSigridDuringGame(newAmount);
          };
        }
      case 'per':
        if (type === 'atDeal') {
          return (change) => {
            const newAmount = perAtDeal + change;
            updateDeal(deal.airtableId, {
              flowerCount: {
                ...deal.flowerCount,
                per: { ...deal.flowerCount.per, atDeal: newAmount }
              }
            });
            setPerAtDeal(newAmount);
          };
        } else {
          return (change) => {
            const newAmount = perDuringGame + change;
            updateDeal(deal.airtableId, {
              flowerCount: {
                ...deal.flowerCount,
                per: { ...deal.flowerCount.per, duringGame: newAmount }
              }
            });
            setPerDuringGame(newAmount);
          };
        }
    }
  };

  const [loadingNewDeal, setLoadingNewDeal] = useState(false);
  const router = useRouter();
  const newDeal = async () => {
    setLoadingNewDeal(true);
    try {
      const newDeal = await createDeal(game.airtableId);
      router.push(`/${game.airtableId}/${newDeal.airtableId}`);
    } catch (error) {
      setLoadingNewDeal(false);
    }
  };

  return (
    <Container maxWidth="md" disableGutters={true}>
      <Head>
        <title>{`Deal - ${formatDate(deal.createdAt)}`}</title>
      </Head>
      <Box padding={1} display="flex" justifyContent="space-between">
        <Box width={1 / 4}>
          <Link href={`/${game.airtableId}`} passHref>
            <Button variant="outlined" color="primary" size="small" fullWidth>
              Tillbaka
            </Button>
          </Link>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="h5" component="h1">
            {formatDate(deal.createdAt)}
          </Typography>
        </Box>
        <Box width={1 / 4}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            fullWidth
            onClick={newDeal}
            disabled={loadingNewDeal}
          >
            Ny giv
          </Button>
        </Box>
      </Box>
      <PlayerState
        player={'axel'}
        value={{ atDeal: axelAtDeal, duringGame: axelDuringGame }}
        updateState={updateState}
      />
      <PlayerState
        player={'arielle'}
        value={{ atDeal: arielleAtDeal, duringGame: arielleDuringGame }}
        updateState={updateState}
      />
      <PlayerState
        player={'sigrid'}
        value={{ atDeal: sigridAtDeal, duringGame: sigridDuringGame }}
        updateState={updateState}
      />
      <PlayerState
        player={'per'}
        value={{ atDeal: perAtDeal, duringGame: perDuringGame }}
        updateState={updateState}
      />
    </Container>
  );
};

interface Params extends ParsedUrlQuery {
  gameId: string;
  dealId: string;
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  const game = await getGame(context.params.gameId);
  const deal = await getDeal(context.params.dealId);

  return {
    props: { game, deal }
  };
};

export default GamePage;
