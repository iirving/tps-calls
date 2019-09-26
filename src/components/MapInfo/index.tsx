import * as React from 'react';
import styled, { css } from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import { Incident } from 'tps-calls-shared';

import { Sizes, Colors } from '../../config';
import Text from '../Text';

const AnimatedContainer = posed.div({
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
});

const Container = styled(AnimatedContainer)`
  position: absolute;
  bottom: ${Sizes.SPACING * 4}px;
  left: calc(50% - ${350 / 2}px);
  width: 350px;
  height: auto;
  min-height: 50px;
  background-color: ${Colors.BACKGROUND};
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface MapInfo {
  incident?: Incident<any>;
  drawerOpen: boolean;
}

const MapInfo: React.FunctionComponent<MapInfo> = ({
  incident,
  drawerOpen,
}) => {
  return (
    <PoseGroup>
      {incident && !drawerOpen && (
        <Container key="info">
          <Content>
            <Text as="h5">{incident.name}</Text>
          </Content>
        </Container>
      )}
    </PoseGroup>
  );
};

export default MapInfo;
