import { useMemo } from 'react'
import { Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { makeSelectFieldValue } from '../../features/registration/selectors'
import { registrationActions } from '../../features/registration/reducer'
import Input from '../../components/Input'
import Date from '../../components/Date'
import Select from '../../components/Select'

const fieldsMap = {
  input: Input,
  date: Date,
  select: Select
}

const Field = ({ parentId, id, type, span = {}, ...rest }) => {
  const selectFieldValue = useMemo(
    () => makeSelectFieldValue(parentId, id),
    [parentId, id]
  )
  const value = useSelector(selectFieldValue)
  const dispatch = useDispatch()

  const onChange = value => {
    dispatch(registrationActions.setFormValue({ path: [parentId, id], value }))
  }

  const Component = fieldsMap[type]

  return (
    <Grid item {...span}>
      <Component {...rest} id={id} value={value} onChange={onChange} />
    </Grid>
  )
}

export default Field
