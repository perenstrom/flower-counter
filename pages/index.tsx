import React from 'react';
import {
  Container,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Game } from 'types/types';
import { getGames } from 'services/airtable';
import { theme } from 'styles/theme';

const useStyles = makeStyles(() => ({
  main: {
    padding: theme.spacing(1),
    borderCollapse: 'separate',
    '& td, & th': {
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5)
    }
  }
}));

interface Props {
  games: Game[];
}

const GamesPage: NextPage<Props> = ({ games }) => {
  const { main } = useStyles();
  return (
    <Container maxWidth="md" disableGutters={true}>
      <Head>
        <title>Games</title>
      </Head>
      <TableContainer>
        <Table size="small" className={main}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Axel</TableCell>
              <TableCell>Arielle</TableCell>
              <TableCell>Sigrid</TableCell>
              <TableCell>Per</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {games.map((game) => (
              <TableRow key={game.id}>
                <TableCell>
                  <Link href={`/${game.airtableId}`}>
                    <a>{game.date}</a>
                  </Link>
                </TableCell>
                <TableCell>
                  {game.flowerCount.axel.total} ({game.flowerCount.axel.atDeal})
                </TableCell>
                <TableCell>
                  {game.flowerCount.arielle.total} (
                  {game.flowerCount.arielle.atDeal})
                </TableCell>
                <TableCell>
                  {game.flowerCount.sigrid.total} (
                  {game.flowerCount.sigrid.atDeal})
                </TableCell>
                <TableCell>
                  {game.flowerCount.per.total} ({game.flowerCount.per.atDeal})
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const games = await getGames();

  return {
    props: { games }
  };
};

export default GamesPage;
