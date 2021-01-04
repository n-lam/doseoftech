import React from 'react';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';

const ListItemLink = (props: ListItemProps<'a', { button?: true }>): JSX.Element => {
  return <ListItem button component="a" {...props} />;
};

export default ListItemLink;
