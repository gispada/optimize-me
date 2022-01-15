import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Button,
  Grid
} from '@mui/material'
import config from './config'
import Field from './Field'

const Registration = () => {
  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 6 }}>
        Registration form
      </Typography>

      {config.map(({ id, title, subtitle, fields }) => (
        <Card key={id} sx={{ mb: 4 }}>
          <CardHeader
            title={title}
            subheader={subtitle}
            titleTypographyProps={{ fontWeight: 'bold' }}
          />
          <CardContent>
            <Grid container spacing={4}>
              {fields.map(item => (
                <Field key={item.id} {...item} parentId={id} />
              ))}
            </Grid>
          </CardContent>
        </Card>
      ))}

      <Button variant="contained" sx={{ px: 4 }}>
        Fake Submit
      </Button>
    </Box>
  )
}

export default Registration
