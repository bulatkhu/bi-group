import React from 'react'
import classes from './switcher.module.scss'
import clsx from 'clsx'

const CustomSwitcher = ({
  setShow,
  value,
  label,
  className,
}) => {
  return (
    <div className={clsx(classes.root, className)}>
      {label && <p className={classes.label}>{label}</p>}
      <div
        onClick={() => setShow((p) => !p)}
        className={classes.switcher}
      >
        <div
          className={clsx(
            classes.dotWrapper,
            value && classes.activeDotWrapper
          )}
        >
          <button
            className={clsx(
              classes.dot,
              value && classes.activeDot
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default CustomSwitcher
