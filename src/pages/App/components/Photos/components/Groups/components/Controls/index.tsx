import React, { useEffect, useMemo } from 'react'
import classes from './controls.module.scss'
import clsx from 'clsx'
import useMediaQuery from '../../../../../../../../hooks/useMediaQuery'

const Controls = ({ columns, setColumns }: any) => {
  const width = useMediaQuery()

  const allowControls = useMemo(
    () => ({
      '1200': width < 1200,
      '800': width < 800,
      '570': width < 570,
    }),
    [width]
  )

  useEffect(() => {
    if (allowControls['1200'] && columns > 6) {
      return setColumns(6)
    } else if (allowControls['800'] && columns > 3) {
      return setColumns(3)
    } else if (allowControls['570'] && columns > 1) {
      return setColumns(1)
    }
  }, [width, columns, setColumns, allowControls])

  return (
    <div className={classes.controls}>
      <p className={classes.label}>Количество столбцов: </p>
      <div className={classes.btns}>
        {allowControls['800'] && (
          <button
            onClick={() => setColumns(1)}
            className={clsx(classes.btn, columns === 1 && classes.btn__active)}
          >
            <span className={classes.col} />
          </button>
        )}

        {!allowControls['570'] && (
          <button
            onClick={() => setColumns(3)}
            className={clsx(classes.btn, columns === 3 && classes.btn__active)}
          >
            <span className={classes.col} />
            <span className={classes.col} />
            <span className={classes.col} />
          </button>
        )}

        {!allowControls['800'] && (
          <button
            onClick={() => setColumns(6)}
            className={clsx(classes.btn, columns === 6 && classes.btn__active)}
          >
            <span className={classes.col} />
            <span className={classes.col} />
            <span className={classes.col} />
            <span className={classes.col} />
            <span className={classes.col} />
            <span className={classes.col} />
          </button>
        )}

        {!allowControls['1200'] && (
          <button
            onClick={() => setColumns(9)}
            className={clsx(classes.btn, columns === 9 && classes.btn__active)}
          >
            <span className={classes.col} />
            <span className={classes.col} />
            <span className={classes.col} />
            <span className={classes.col} />
            <span className={classes.col} />
            <span className={classes.col} />
            <span className={classes.col} />
            <span className={classes.col} />
            <span className={classes.col} />
          </button>
        )}
      </div>
    </div>
  )
}

export default Controls
