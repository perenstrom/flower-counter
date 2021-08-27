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
import { Deal, Game, Player } from 'types/types';
import { getDeal, getGame } from 'services/airtable';
import { ParsedUrlQuery } from 'querystring';
import { updateDeal } from 'services/local';

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

  const updateState = (
    player: Player,
    type: 'AtDeal' | 'DuringGame',
    change: number
  ) => {
    // Update airtable
    switch (player) {
      case 'axel':
        if (type === 'AtDeal') {
          const newAmount = axelAtDeal + change;
          updateDeal(deal.airtableId, {
            flowerCount: {
              ...deal.flowerCount,
              axel: { ...deal.flowerCount.axel, atDeal: newAmount }
            }
          });
          setAxelAtDeal(newAmount);
        } else {
          const newAmount = axelDuringGame + change;
          updateDeal(deal.airtableId, {
            flowerCount: {
              ...deal.flowerCount,
              axel: { ...deal.flowerCount.axel, duringGame: newAmount }
            }
          });
          setAxelDuringGame(newAmount);
        }
        break;
      case 'arielle':
        if (type === 'AtDeal') {
          const newAmount = arielleAtDeal + change;
          updateDeal(deal.airtableId, {
            flowerCount: {
              ...deal.flowerCount,
              arielle: { ...deal.flowerCount.arielle, atDeal: newAmount }
            }
          });
          setArielleAtDeal(newAmount);
        } else {
          const newAmount = arielleDuringGame + change;
          updateDeal(deal.airtableId, {
            flowerCount: {
              ...deal.flowerCount,
              arielle: { ...deal.flowerCount.arielle, duringGame: newAmount }
            }
          });
          setArielleDuringGame(newAmount);
        }
        break;
      case 'sigrid':
        if (type === 'AtDeal') {
          const newAmount = sigridAtDeal + change;
          updateDeal(deal.airtableId, {
            flowerCount: {
              ...deal.flowerCount,
              sigrid: { ...deal.flowerCount.sigrid, atDeal: newAmount }
            }
          });
          setSigridAtDeal(newAmount);
        } else {
          const newAmount = sigridDuringGame + change;
          updateDeal(deal.airtableId, {
            flowerCount: {
              ...deal.flowerCount,
              sigrid: { ...deal.flowerCount.sigrid, duringGame: newAmount }
            }
          });
          setSigridDuringGame(newAmount);
        }
        break;
      case 'per':
        if (type === 'AtDeal') {
          const newAmount = perAtDeal + change;
          updateDeal(deal.airtableId, {
            flowerCount: {
              ...deal.flowerCount,
              per: { ...deal.flowerCount.per, atDeal: newAmount }
            }
          });
          setPerAtDeal(newAmount);
        } else {
          const newAmount = perDuringGame + change;
          updateDeal(deal.airtableId, {
            flowerCount: {
              ...deal.flowerCount,
              per: { ...deal.flowerCount.per, duringGame: newAmount }
            }
          });
          setPerDuringGame(newAmount);
        }
        break;
    }
  };

  return (
    <Container maxWidth="md" disableGutters={true}>
      <Head>
        <title>Deal</title>
      </Head>
      <Box padding={1}>
        <Link href={`/${game.airtableId}`}>
          <a>Tillbaka</a>
        </Link>
      </Box>
      <Box padding={1}>
        <Typography variant="h2" align="center">
          Axel
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
            <ButtonGroup size="large">
              <Button onClick={() => updateState('axel', 'AtDeal', -1)}>
                -
              </Button>
              <Button disabled>{axelAtDeal}</Button>
              <Button onClick={() => updateState('axel', 'AtDeal', 1)}>
                +
              </Button>
            </ButtonGroup>
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
            <ButtonGroup size="large">
              <Button>-</Button>
              <Button disabled>{axelDuringGame}</Button>
              <Button>+</Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Box>
      <Box padding={1}>
        <Box>Arielle</Box>
      </Box>
      <Box padding={1}>
        <Box>Sigrid</Box>
      </Box>
      <Box padding={1}>
        <Box>Per</Box>
      </Box>
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
