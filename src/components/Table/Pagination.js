import { TableFooter, TableRow, TablePagination } from '@mui/material'

const Pagination = ({ size, total, page, onChange }) => {
  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[]}
          count={total}
          rowsPerPage={size}
          page={total <= page * size ? 0 : page} // Prevents a warning when there are more rows displayed than data
          onPageChange={(_, page) => onChange(page)}
        />
      </TableRow>
    </TableFooter>
  )
}

export default Pagination
