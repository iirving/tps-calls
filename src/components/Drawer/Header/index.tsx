import * as React from 'react';
import styled from 'styled-components';
import { useDebouncedCallback } from 'use-debounce';
import posed, { PoseGroup } from 'react-pose';
import 'react-datepicker/dist/react-datepicker.css';

import { Colors, Sizes } from '../../../config';
import { IncidentFilterState } from '../../../store/incidents';
import {
  setIncidentFilter,
  SetIncidentFilterParams,
} from '../../../store/incidents/actions';

import Text, { createTextStyles, DEFAULT_TEXT_STYLES } from '../../Text';
import { IconButton } from '../../Button';
import Icon from '../../Icon';
import DrawerFilter from './Filter';

interface DrawerHeader {
  setFilter: (params: SetIncidentFilterParams) => void;
  filters: IncidentFilterState;
  closeDrawer: () => void;
}

const Container = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  background-color: ${Colors.BACKGROUND_SECONDARY};
  padding: ${Sizes.SPACING / 2}px;
  display: block;
  transition: height 1s ease-in-out;
`;

const Content = styled(
  posed.div({
    enter: {
      opacity: 1,
      height: 'auto',
    },
    exit: {
      opacity: 0,
      height: 0,
    },
  })
)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
`;

const HeadingContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${Sizes.SPACING / 2}px 0;
`;

const SearchBarContainer = styled.div`
  background-color: ${Colors.BACKGROUND};
  height: 35px;
  width: 100%;
  border-radius: 6px;
  padding: ${Sizes.SPACING / 2}px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchBar = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  > input {
    ${createTextStyles({
      ...DEFAULT_TEXT_STYLES.p,
      size: 16,
      lineHeight: 18,
      secondaryFont: true,
    })};
    margin-left: 6px;
    background-color: inherit;
    border: none;
    flex-grow: 1;

    &::placeholder {
      color: ${Colors.TEXT_SECONDARY};
    }

    &:focus {
      outline: none;
    }
  }
`;

const Heading: React.FunctionComponent<{
  label: string;
  onClick: () => void;
}> = ({ onClick, label }) => (
  <HeadingContent>
    <Text as="h1" size={32} lineHeight={34} weight="bold">
      {label}
    </Text>
    <IconButton
      size={20}
      iconProps={{ name: 'x', size: 20 }}
      hoverColor={Colors.PRIMARY}
      onClick={onClick}
    />
  </HeadingContent>
);

const DrawerHeader: React.FunctionComponent<DrawerHeader> = ({
  setFilter,
  filters,
  closeDrawer,
}) => {
  const [showFilters, setFilterVisibility] = React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState<string | undefined>(
    filters.search
  );

  const [updateStoreSearchValue] = useDebouncedCallback(
    (value: string | undefined) => {
      setFilter({ values: { search: value } });
    },
    100
  );

  React.useEffect(() => {
    if (searchValue !== filters.search) {
      updateStoreSearchValue(searchValue);
    }
  }, [searchValue]);

  return (
    <Container>
      <PoseGroup>
        {!showFilters ? (
          <Content key="default">
            <Heading label="Incidents" onClick={closeDrawer} />
            <SearchBarContainer>
              <SearchBar>
                <Icon size={15} name="search" color={Colors.TEXT_SECONDARY} />
                <input
                  type="text"
                  placeholder="Dundas St, Stabbing, etc..."
                  onChange={event => setSearchValue(event.target.value)}
                  value={searchValue || ''}
                />
              </SearchBar>
              <IconButton
                size={30}
                iconProps={{
                  name: 'slider',
                  color: showFilters ? Colors.PRIMARY : Colors.TEXT_SECONDARY,
                  size: 15,
                }}
                hoverColor={Colors.PRIMARY}
                onClick={() => setFilterVisibility(true)}
              />
            </SearchBarContainer>
          </Content>
        ) : (
          <Content key="filters">
            <Heading
              label="Filters"
              onClick={() => setFilterVisibility(false)}
            />
            <DrawerFilter filters={filters} setFilter={setFilter} />
          </Content>
        )}
      </PoseGroup>
    </Container>
  );
};

export default DrawerHeader;
