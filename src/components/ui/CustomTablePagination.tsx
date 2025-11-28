"use client";

import { TablePagination } from "@mui/material";

interface Props {
  total: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
  getRowLink?: (id: number) => string;
}

export const CustomTablePagination = ({
  total,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
}: Props) => {
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={total}
      rowsPerPage={rowsPerPage}
      page={page - 1}
      onPageChange={(_, newPage) => onPageChange(newPage + 1)}
      onRowsPerPageChange={(event) =>
        onRowsPerPageChange(parseInt(event.target.value, 10))
      }
      labelRowsPerPage={"Rows per page:"}
      labelDisplayedRows={({ from, to, count }) =>
        `${from}-${to} of ${count !== -1 ? count : "more than " + to}`
      }
    />
  );
};
