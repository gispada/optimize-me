import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Button,
  Grid
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { get } from 'lodash'
import { selectForm } from '../../features/registration/selectors'
import { registrationActions } from '../../features/registration/reducer'
import config from './config'
import Input from '../../components/Input'
import Date from '../../components/Date'
import Select from '../../components/Select'

const fieldsMap = {
  input: Input,
  date: Date,
  select: Select
}

const Registration = () => {
  const dispatch = useDispatch()
  const formValues = useSelector(selectForm)

  const makeOnChange = path => value => {
    dispatch(registrationActions.setFormValue({ path, value }))
  }

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 6 }}>
        Registration form
      </Typography>

      {config.map(({ title, subtitle, id: parentId, fields }) => (
        <Card key={parentId} sx={{ mb: 4 }}>
          <CardHeader
            title={title}
            subheader={subtitle}
            titleTypographyProps={{ color: 'primary' }}
          />
          <CardContent>
            <Grid container spacing={4}>
              {fields.map(({ type, span, ...props }) => {
                const Component = fieldsMap[type]
                const path = [parentId, props.id]
                return (
                  <Grid key={props.id} item {...span}>
                    <Component
                      {...props}
                      value={get(formValues, path)}
                      onChange={makeOnChange(path)}
                    />
                  </Grid>
                )
              })}
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
