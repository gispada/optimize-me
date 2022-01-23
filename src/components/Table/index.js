import { useEffect, useMemo, useState } from 'react'
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
import Pagination from './Pagination'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.common.white
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  }
}))

const Table = ({
  columns,
  data,
  alternativeStyle,
  pagination,
  paginationSize = 10,
  emptyMessage = 'No items'
}) => {
  const [page, setPage] = useState(0)

  const Cell = alternativeStyle ? StyledTableCell : TableCell
  const Row = alternativeStyle ? StyledTableRow : TableRow

  const tableData = useMemo(
    () =>
      data && pagination
        ? data.slice(
            page * paginationSize,
            page * paginationSize + paginationSize
          )
        : data,
    [data, page, pagination, paginationSize]
  )

  const tooManyRows = (data || []).length <= page * paginationSize

  useEffect(() => {
    // Reset pagination when there are more rows than actual data
    if (tooManyRows) setPage(0)
  }, [data, tooManyRows])

  const renderEmptyRow = () => (
    <Row>
      <TableCell colSpan={columns.length}>{emptyMessage}</TableCell>
    </Row>
  )

  const renderBody = () =>
    tableData.map((row, i) => {
      const rowId = row.id || `row-${i}`
      return (
        <Row key={rowId}>
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
          {tableData?.length === 0 ? renderEmptyRow() : renderBody()}
        </TableBody>
        {pagination && (
          <Pagination
            size={paginationSize}
            total={data?.length}
            page={page}
            onChange={setPage}
          />
        )}
      </MuiTable>
    </TableContainer>
  )
}

export default Table
