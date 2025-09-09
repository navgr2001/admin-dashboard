import React from "react";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

export default function DataGridCustomToolbar(props) {
  const { searchInput, setSearchInput, setSearch } = props;
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <GridToolbarQuickFilter
        value={searchInput}
        onChange={(e) => setSearchInput?.(e.target.value)}
        onDebounce={(_, v) => setSearch?.(v)}
        debounceMs={500}
        placeholder="Search…"
      />
    </GridToolbarContainer>
  );
}
