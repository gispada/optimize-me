import { TextField } from '@mui/material'

const Input = ({ onChange, value = '', ...props }) => (
  <TextField
    autoComplete="off"
    {...props}
    value={value}
    onChange={({ target }) => onChange?.(target.value)}
    fullWidth
    variant="standard"
  />
)
export default Input
