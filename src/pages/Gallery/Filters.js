import { useDispatch } from 'react-redux'
import { Card, CardHeader, CardContent, Grid, Button } from '@mui/material'
import { galleryActions } from '../../features/gallery/reducer'
import Select from '../../components/Select'

const Filters = ({ users, filters }) => {
  const dispatch = useDispatch()

  const filtersConfig = [
    {
      id: 'userId',
      label: 'Author',
      options: users.map(({ name, id }) => ({
        label: name,
        value: id
      }))
    },
    {
      id: 'rating',
      label: 'Rating',
      options: [
        { value: 0, label: 'No rating' },
        { value: 1, label: '1 star' },
        { value: 2, label: '2 stars' },
        { value: 3, label: '3 stars' },
        { value: 4, label: '4 stars' },
        { value: 5, label: '5 stars' }
      ]
    }
  ]

  const makeSetFilter = filterName => value => {
    dispatch(galleryActions.setFilter({ name: filterName, value }))
  }

  const resetFilters = () => dispatch(galleryActions.resetFilters())

  return (
    <Card sx={{ mb: 4 }}>
      <CardHeader
        action={
          Object.keys(filters).length > 0 ? (
            <Button onClick={resetFilters}>Clear all</Button>
          ) : undefined
        }
        title="Filters"
      />
      <CardContent>
        <Grid container spacing={4}>
          {filtersConfig.map(({ id, label, options }) => (
            <Grid key={id} item xs={12} sm={6} md={4}>
              <Select
                variant="outlined"
                label={label}
                value={filters[id]}
                onChange={makeSetFilter(id)}
                options={options}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Filters
