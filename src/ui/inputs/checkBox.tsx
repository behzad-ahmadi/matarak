import clsx from 'clsx'
import React from 'react'

interface CheckboxProps {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  className?: string
  checkboxClassName?: string
}

const Checkbox = ({
  id,
  label,
  checked,
  onChange,
  disabled = false,
  className = '',
  checkboxClassName
}: CheckboxProps) => {
  return (
    <div className={`form-control ${className}`}>
      <label htmlFor={id} className="cursor-pointer flex items-center">
        <input
          id={id}
          name={id}
          type="checkbox"
          className={clsx('checkbox', checkboxClassName)}
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          disabled={disabled}
        />
        <span
          className={clsx('label-text ms-2', { 'text-opacity-50': disabled })}
        >
          {label}
        </span>
      </label>
    </div>
  )
}

export default Checkbox
