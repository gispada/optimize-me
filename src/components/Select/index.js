import {
  FormControl,
  Select as MuiSelect,
  InputLabel,
  MenuItem
} from '@mui/material'

const Select = ({
  options,
  onChange,
  variant = 'standard',
  value = '',
  ...props
}) => (
  <FormControl fullWidth>
    <InputLabel>{props.label}</InputLabel>
    <MuiSelect
      {...props}
      variant={variant}
      value={value}
      onChange={({ target }) => onChange?.(target.value)}
    >
      {options.map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </MuiSelect>
  </FormControl>
)

export default Select
