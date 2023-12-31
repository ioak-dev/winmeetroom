import React from 'react';

import './DropLinks.scss';
import { NavLink } from 'react-router-dom';

interface Props {
  space: string;
  handleClose: any;
}

const DropLinks = (props: Props) => {
  return (
    <div className="drop-links">
      <NavLink
        to={`/${props.space}/home`}
        className="navitem"
        onClick={props.handleClose}
      >
        Home
      </NavLink>
      <NavLink
        to={`/${props.space}/project`}
        className="navitem"
        onClick={props.handleClose}
      >
        Projects
      </NavLink>
      <NavLink
        to={`/${props.space}/template`}
        className="navitem"
        onClick={props.handleClose}
      >
        Templates
      </NavLink>
    </div>
  );
};

export default DropLinks;
