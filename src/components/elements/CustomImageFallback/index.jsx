import React, { useState } from 'react'
import classes from './styles.module.scss'
import clsx from 'clsx'

const CustomImageFallback = React.forwardRef(
  ({ className, alt = Date.now(), src, ...rest }, ref) => {
    const [isFailed, setIsFailed] = useState(false)

    return (
      <>
        {!isFailed ? (
          <img
            data-role="image-fallback-catcher"
            ref={ref}
            onLoad={() => setIsFailed(false)}
            onError={() => setIsFailed(true)}
            className={clsx(classes.root, className)}
            src={src}
            alt={alt}
            {...rest}
          />
        ) : (
          <p
            ref={ref}
            className={clsx(classes.fallback, className)}
          >
            <span className={classes.fallback__label}>
              Фото не найденно
            </span>
            <span>
              Проверьте путь фото:{' '}
              <span className={classes.fallback__path}>
                {src}
              </span>
            </span>
          </p>
        )}
      </>
    )
  }
)

export default CustomImageFallback
