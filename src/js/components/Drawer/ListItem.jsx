import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import globals from '../../globals';

import { dateHelper } from '../../helpers';

const StyledDrawerListItem = styled.li`
  padding: 20px;
  margin: ${props => (props.selected ? '20px 0px' : '0')};
  list-style-type: none;
  background-color: ${props =>
    props.selected
      ? globals.colors.materialDarkGrey
      : globals.colors.materialWhite};
`;

const DrawerListItem = ({ selected, street, type, date }) => (
  <StyledDrawerListItem selected={selected}>
    <Typography variant="title" color="textSecondary">
      {type}
    </Typography>
    <Typography variant="subheading" color="textSecondary">
      {street}
    </Typography>
    <Typography variant="subheading" color="textSecondary">
      {dateHelper.tidyFormat(date)}
    </Typography>
  </StyledDrawerListItem>
);

export default DrawerListItem;
