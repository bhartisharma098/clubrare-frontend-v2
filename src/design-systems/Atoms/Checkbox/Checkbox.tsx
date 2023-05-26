import { Typography } from '../Typography'
import { CheckIcon } from '../Icons'

import { CheckboxProps } from './interface'

import { useToggle } from 'hooks'
import { getBackgroundStyles, getBorderStyles, getCheckStyles } from './utils'

export const Checkbox: React.FC<CheckboxProps> = ({
  id = 'checkbox',
  className = '',
  label = '',
  value = false,
  checked = false,
  disabled = false,
  onChange,
}) => {
  const [state, toggle] = useToggle(checked)
  const classNames = [
    className,
    'group',
    'flex items-center gap-lg',
    disabled ? 'text-neutral-500' : 'cursor-pointer',
  ].join(' ')

  const checkIconClassNames = {
    fill: getBackgroundStyles(disabled, state),
  }

  const handleChange = (state: boolean, label: string) => {
    onChange?.(!state, label)
    toggle()
  }

  return (
    <div className={classNames} onClick={() => handleChange(state, label)}>
      <CheckIcon className="min-w-4 min-h-4 h-4 w-4" {...checkIconClassNames} />
      <Typography variant="condensed" size="body">
        {label}
      </Typography>
    </div>
  )
}
