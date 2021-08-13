import React from 'react'
import ReactPlayer from 'react-player'
import classes from './videoCatalog.module.scss'

const catalogs = [
  {
    title: 'Новый год',
    videos: [
      {
        video:
          'https://www.youtube.com/watch?v=ZdR0EgMlbZo',
        year: 2016,
      },
      {
        video:
          '      https://www.youtube.com/watch?v=LgtxHiNThE0',
        year: 2017,
      },
      {
        video:
          'https://www.youtube.com/watch?v=AKxzc3eC0H0',
        year: 2019,
      },
      {
        video:
          'https://www.youtube.com/watch?v=R0XauJDI324',
        year: 2019,
      },
      {
        video:
          'https://www.youtube.com/watch?v=vnsk-PS4aYM ',
        year: 2019,
      },
      {
        video:
          'https://www.youtube.com/watch?v=phTKnhMSLEw',
        year: 2020,
      },
    ],
  },
  {
    title: 'День рождения компании',

    videos: [
      {
        video:
          'https://www.youtube.com/watch?v=WnZlon8P9n0',
        year: 2016,
      },
      {
        video:
          'https://www.youtube.com/watch?v=lBuG-PBvWjs',
        year: 2017,
      },
      {
        video:
          'https://www.youtube.com/watch?v=JdD_Elpq3Gg',
        year: 2018,
      },
      {
        video:
          'https://www.youtube.com/watch?v=pSexuGk1fCo',
        year: 2019,
      },
      {
        video:
          'https://www.youtube.com/watch?v=ixFJ_wCtNAM',
        year: 2020,
      },
    ],
  },
  {
    title: 'День строителя ',
    videos: [
      {
        video: 'https://youtu.be/kYkdU3eW6Lk',
        year: 2016,
      },
      {
        video:
          'https://www.youtube.com/watch?v=cXMO1XHUEhE',
        year: 2016,
      },
      {
        video:
          'https://www.youtube.com/watch?v=3oMDAOli1mA',
        year: 2016,
      },
      {
        video:
          'https://www.youtube.com/watch?v=JYXXZV_rvwM',
        year: 2017,
      },
      {
        video:
          'https://www.youtube.com/watch?v=WW0QAwMTE4s',
        year: 2017,
      },
      {
        video:
          'https://www.youtube.com/watch?v=aKZIzflQ3hY',
        year: 2018,
      },
      {
        video:
          'https://www.youtube.com/watch?v=8F9Zi37abWU',
        year: 2019,
      },
      {
        video:
          'https://www.youtube.com/watch?v=8F9Zi37abWU',
        year: 2020,
      },
    ],
  },
]

const VideoCatalog = () => {
  return (
    <div className={classes.root}>
      {catalogs.map((catalog, index) => {
        return (
          <div key={index}>
            <p className={classes.title}>{catalog.title}</p>
            <div className={classes.list}>
              {catalog.videos.map(
                ({ video, year }, index) => {
                  return (
                    <div
                      className={classes.video}
                      key={video + index}
                    >
                      <div className={classes.videoWrapper}>
                        <ReactPlayer
                          controls
                          width="100%"
                          className={classes.videoPlayer}
                          url={video}
                        />
                      </div>
                      <p className={classes.year}>
                        Год: {year}
                      </p>
                    </div>
                  )
                }
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default VideoCatalog
