import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { Segment } from 'semantic-ui-react';
import styled from '@emotion/styled';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

import { Logo } from '../SVG';
import moment from 'moment';
import { mq } from './breakpoints';

const TopBar = () => {
  const buildTimeData = useStaticQuery(graphql`
    query BuildTimeQuery {
      allBuildTime {
        nodes {
          buildTime
        }
      }
    }
  `);
  const buildTime = buildTimeData.allBuildTime.nodes[0].buildTime;
  return (
    <TopBarWrapper>
      <TopBarContent>
        <Link to="/" aria-label="Frontbook main page">
          <Logo height="60px" textcolor="white" style={{ margin: '20px 0' }} />
        </Link>
        <TopBarLinks>
          <TopBarLink href="https://spectrum.chat/frontbook" target="_blank" rel="noopener noreferrer">
            Spectrum
          </TopBarLink>
          <TopBarLink href="https://github.com/kamiljozwik/frontbook" target="_blank" rel="noopener noreferrer">
            Github
          </TopBarLink>
        </TopBarLinks>
      </TopBarContent>
      <LastUpdate>{`Last update: ${moment(buildTime).format('D MMM YYYY | HH:MM')} (${moment(
        buildTime
      ).fromNow()})`}</LastUpdate>
    </TopBarWrapper>
  );
};

export default TopBar;

const TopBarWrapper = styled(Segment.Inline)`
  &&& {
    position: relative;
    width: 80vw;
    margin: 0 auto;
    height: 100px;
    border-width: 3px;
    border-style: solid;
    border-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0)) 0% 0% 100% 0%;
  }
`;

const TopBarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TopBarLinks = styled.div`
  display: flex;
  align-items: flex-end;
  margin-right: 5%;
  ${mq({
    flexDirection: ['column', 'column', 'row', 'row', 'row'],
  })}
`;

const TopBarLink = styled(OutboundLink)`
  ${mq({
    fontSize: ['16px', '16px', '18px', '18px', '18px'],
  })}
  color: white;
  margin: 0 15px;
  font-weight: 600;
  opacity: 0.8;
  &:hover {
    color: white;
    opacity: 1;
  }
`;

const LastUpdate = styled.span`
  color: rgba(255, 255, 255, 0.6);
`;
