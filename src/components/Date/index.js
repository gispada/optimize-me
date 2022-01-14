import { DatePicker } from '@mui/lab'
import Input from '../Input'

const Date = ({ onChange, value = null, ...props }) => (
  <DatePicker
    {...props}
    value={value}
    onChange={date => {
      if (!isNaN(date)) {
        onChange(date?.toISOString() || null)
      }
    }}
    inputFormat="dd/MM/yyyy"
    renderInput={Input}
  />
)

export default Date
