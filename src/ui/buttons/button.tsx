import clsx from 'clsx'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children?: React.ReactNode
  loading?: boolean
  iconStart?: React.ReactNode
  iconEnd?: React.ReactNode
  disabled?: boolean
  size?: 'sm' | 'md'
}

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  loading,
  iconStart,
  iconEnd,
  size = 'md',
  ...props
}) => {
  const sizeClasses = {
    sm: 'h-btn-sm text-base',
    md: 'h-btn-md text-lg'
  }

  const colorType = findButtonColorType(className || '')

  return (
    <button
      className={clsx(
        'btn font-normal rounded-xl items-center flex',
        sizeClasses[size],
        className,
        {
          'disabled:bg-primary/10': colorType === 'btn-primary',
          'disabled:bg-secondary/10': colorType === 'btn-secondary',
          'disabled:bg-accent/10': colorType === 'btn-accent',
          'disabled:bg-info/10': colorType === 'btn-info',
          'disabled:bg-success/10': colorType === 'btn-success',
          'disabled:bg-warning/10': colorType === 'btn-warning',
          'disabled:bg-error/10': colorType === 'btn-error',
          'disabled:bg-ghost/10': colorType === 'btn-ghost',
          'disabled:bg-neutral/10': colorType === 'btn-neutral'
        }
      )}
      {...props}
      disabled={loading || props.disabled}
      type={props.type ? props.type : 'button'}
    >
      {iconStart}
      {children}
      {iconEnd}
      {loading && <span className="loading loading-spinner"></span>}
    </button>
  )
}

export default Button

type BtnColorType =
  | 'btn-primary'
  | 'btn-secondary'
  | 'btn-accent'
  | 'btn-info'
  | 'btn-success'
  | 'btn-warning'
  | 'btn-error'
  | 'btn-ghost'
  | 'btn-neutral'

const findButtonColorType = (className: string): BtnColorType | undefined => {
  const classList = className.split(' ') as string[]
  const buttonColorTypes: BtnColorType[] = [
    'btn-primary',
    'btn-secondary',
    'btn-accent',
    'btn-info',
    'btn-success',
    'btn-warning',
    'btn-error',
    'btn-ghost',
    'btn-neutral'
  ]

  return classList.find(cls =>
    buttonColorTypes.includes(cls as BtnColorType)
  ) as BtnColorType | undefined
}
