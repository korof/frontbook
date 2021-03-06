import React from 'react';
import styled from '@emotion/styled';
import { Header, Button } from 'semantic-ui-react';

import { TopsToolsList } from './';
import { SubcategoryNode } from '../../shared';
import { Trophy } from '../SVG';
import { mq } from '../layout';
import { Link } from 'gatsby';

interface LeaderboardProps {
  npmTops: SubcategoryNode[];
  githubTops: SubcategoryNode[];
  full?: boolean;
}

export const Leaderboard = ({ npmTops, githubTops, full }: LeaderboardProps) => {
  return (
    <FlexWrapper style={{ borderWidth: full ? '0px' : '3px' }}>
      {!full && <ResponsiveTrophy />}
      <LeaderboardWrapper style={{ width: full ? '50%' : '480px' }}>
        {!full && (
          <Header size="huge" textAlign="center">
            Tools leaderboard
          </Header>
        )}
        <TopsToolsList.Wrapper horizontal>
          <TopsToolsList.Segment>{npmTops ? <TopsToolsList tops={npmTops} type="npm" /> : null}</TopsToolsList.Segment>
          <TopsToolsList.Segment>
            {githubTops ? <TopsToolsList tops={githubTops} type="github" /> : null}
          </TopsToolsList.Segment>
        </TopsToolsList.Wrapper>
        {!full && (
          <Button as={Link} to="/leaderboard" primary>
            See all
          </Button>
        )}
      </LeaderboardWrapper>
      {!full && <ResponsiveTrophy />}
    </FlexWrapper>
  );
};

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  padding: 20px 0;
  border-style: solid;
  border-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(23, 124, 190, 0.5), rgba(0, 0, 0, 0)) 100% 0% 100% 0%;
`;

const LeaderboardWrapper = styled.div`
  min-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5%;
`;

const ResponsiveTrophy = styled(Trophy)`
  ${mq({
    display: ['none', 'none', 'initial', 'initial', 'initial'],
  })}
`;
