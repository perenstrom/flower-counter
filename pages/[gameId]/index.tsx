import React from 'react';
import {
  Box,
  Button,
  Container,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Deal, Game } from 'types/types';
import { getDeals, getGame } from 'services/airtable';
import { theme } from 'styles/theme';
import { ParsedUrlQuery } from 'querystring';
import { formatDate } from 'helpers/utils';

const useStyles = makeStyles(() => ({
  main: {
    padding: theme.spacing(1),
    borderCollapse: 'separate',
    '& td, & th': {
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5)
    }
  },
  totalRow: {
    borderBottomWidth: '2px'
  }
}));

interface Props {
  game: Game;
  deals: Record<string, Deal>;
}

const GamePage: NextPage<Props> = ({ game, deals }) => {
  const { main, totalRow } = useStyles();
  return (
    <Container maxWidth="md" disableGutters={true}>
      <Head>
        <title>Games</title>
      </Head>
      <Box padding={1} display="flex" justifyContent="space-between">
        <Box width={1 / 4}>
          <Link href={`/`} passHref>
            <Button variant="outlined" color="primary" size="small" fullWidth>
              Tillbaka
            </Button>
          </Link>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="h5" component="h1">{game.date}</Typography>
        </Box>
        <Box width={1 / 4}>
            <Button variant="outlined" color="primary" size="small" fullWidth>
              Ny giv
            </Button>
        </Box>
      </Box>
      <TableContainer>
        <Table size="small" className={main}>
          <TableHead>
            <TableRow>
              <TableCell>Tid</TableCell>
              <TableCell>Axel</TableCell>
              <TableCell>Arielle</TableCell>
              <TableCell>Sigrid</TableCell>
              <TableCell>Per</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key="total">
              <TableCell className={totalRow}>
                <em>Total</em>
              </TableCell>
              <TableCell className={totalRow}>
                <em>
                  {game.flowerCount.axel.total} ({game.flowerCount.axel.atDeal})
                </em>
              </TableCell>
              <TableCell className={totalRow}>
                <em>
                  {game.flowerCount.arielle.total} (
                  {game.flowerCount.arielle.atDeal})
                </em>
              </TableCell>
              <TableCell className={totalRow}>
                <em>
                  {game.flowerCount.sigrid.total} (
                  {game.flowerCount.sigrid.atDeal})
                </em>
              </TableCell>
              <TableCell className={totalRow}>
                <em>
                  {game.flowerCount.per.total} ({game.flowerCount.per.atDeal})
                </em>
              </TableCell>
            </TableRow>
            {game.deals.map((dealId) => (
              <TableRow key={dealId}>
                <TableCell>
                  <Link href={`/${game.airtableId}/${dealId}`}>
                    <a>{formatDate(deals[dealId].createdAt)}</a>
                  </Link>
                </TableCell>
                <TableCell>
                  {deals[dealId].flowerCount.axel.total} (
                  {deals[dealId].flowerCount.axel.atDeal})
                </TableCell>
                <TableCell>
                  {deals[dealId].flowerCount.arielle.total} (
                  {deals[dealId].flowerCount.arielle.atDeal})
                </TableCell>
                <TableCell>
                  {deals[dealId].flowerCount.sigrid.total} (
                  {deals[dealId].flowerCount.sigrid.atDeal})
                </TableCell>
                <TableCell>
                  {deals[dealId].flowerCount.per.total} (
                  {deals[dealId].flowerCount.per.atDeal})
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

interface Params extends ParsedUrlQuery {
  gameId: string;
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  const game = await getGame(context.params.gameId);
  const deals = await getDeals(game.deals);
  const normalizedDeals: Record<string, Deal> = {};
  deals.forEach((deal) => (normalizedDeals[deal.airtableId] = deal));

  return {
    props: { game, deals: normalizedDeals }
  };
};

export default GamePage;
