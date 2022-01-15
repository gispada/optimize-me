import {
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Table as MuiTable,
  tableCellClasses,
  Paper
} from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

const Table = ({
  columns,
  data,
  alternativeStyle,
  emptyMessage = 'No items'
}) => {
  const Cell = alternativeStyle ? StyledTableCell : TableCell
  const Row = alternativeStyle ? StyledTableRow : TableRow

  const renderEmptyRow = () => (
    <Row>
      <TableCell colSpan={columns.length}>{emptyMessage}</TableCell>
    </Row>
  )

  const renderBody = () =>
    data.map((row, i) => {
      const rowId = row.id || `row-${i}`
      return (
        <Row
          key={rowId}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          {columns.map(({ dataIndex, render }, i) => (
            <TableCell key={`${rowId}-${i}`}>
              {render ? render(row[dataIndex], row) : row[dataIndex]}
            </TableCell>
          ))}
        </Row>
      )
    })

  return (
    <TableContainer
      component={Paper}
      sx={({ drawerWidth }) => ({
        maxWidth: {
          xs: 'calc(100vw - 64px)',
          sm: `calc(100vw - ${drawerWidth + 80}px)`
        }
      })}
    >
      <MuiTable sx={{ minWidth: 480 }}>
        <TableHead>
          <TableRow>
            {columns.map(({ title }, i) => (
              <Cell key={`head-col-${i}`}>{title}</Cell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length === 0 ? renderEmptyRow() : renderBody()}
        </TableBody>
      </MuiTable>
    </TableContainer>
  )
}

export default Table
