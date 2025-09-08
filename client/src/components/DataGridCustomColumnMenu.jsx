import React from "react";
import {
  GridColumnMenuContainer,
  GridColumnMenuFilterItem,
  GridColumnMenuHideItem,
  GridColumnMenuColumnsItem,
  GridColumnMenuSortItem,
} from "@mui/x-data-grid";

export default function DataGridCustomColumnMenu(props) {
  const { hideMenu, currentColumn } = props;
  return (
    <GridColumnMenuContainer {...props}>
      <GridColumnMenuSortItem onClick={hideMenu} column={currentColumn} />
      <GridColumnMenuFilterItem onClick={hideMenu} column={currentColumn} />
      <GridColumnMenuHideItem onClick={hideMenu} column={currentColumn} />
      <GridColumnMenuColumnsItem onClick={hideMenu} />
    </GridColumnMenuContainer>
  );
}
