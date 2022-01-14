import { TextField } from '@mui/material'

const Input = ({ onChange, value = '', ...props }) => (
  <TextField
    {...props}
    value={value}
    onChange={({ target }) => onChange?.(target.value)}
    fullWidth
    variant="standard"
  />
)
export default Input
