import React, { forwardRef } from 'react'
import clsx from 'clsx'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  iconEnd?: React.ReactNode
  iconStart?: React.ReactNode
  iconStartDivider?: boolean
  iconEndDivider?: boolean
  containerClassName?: string
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      iconEnd,
      iconStart,
      iconEndDivider,
      iconStartDivider,
      className,
      containerClassName,
      ...inputProps
    },
    ref
  ) => {
    return (
      <div
        className={clsx(
          'input input-bordered flex items-center gap-2',
          'focus-within:border-border-dark',
          containerClassName
        )}
      >
        {iconStart && <span className="leading-none">{iconStart}</span>}
        {iconStart && iconStartDivider && (
          <div className="border-inherit border-[0.5px] h-full me-1"></div>
        )}

        <input
          {...inputProps}
          className={clsx('grow w-full', className)}
          ref={ref} // forward the ref to the input element
        />

        {iconEnd && iconEndDivider && (
          <div className="border-inherit border-[0.5px] h-full me-1"></div>
        )}
        {iconEnd && <span className="leading-none">{iconEnd}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
