import React from 'react'
import { view } from '@risingstack/react-easy-state'
import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import auth from '../store/modules/auth'


const Render = view(({ route }) => {
  const history = useHistory()
  const { isAuth, loaded } = auth

  if (!route.private) {
    return <route.component {...route} />
  }

  if (
    !loaded
  ) {
    return <p>...Loading</p>
  } else if (isAuth) {
    return <route.component {...route} />
  } else if (!isAuth) {
    history.push({
      pathname: '/auth',
      state: { message: "You should be logged in" }
    })
  }

  return null
})

const MakeRoutes = ({ routes }) => {
  const location = useLocation();

  if (!routes) {
    return null;
  }

  const routesMap = routes.map((route) => {
    return (
      <Route key={route.path} path={route.path} exact={route.exact}>
        <Render route={route} />
      </Route>
    );
  });

  return <Switch location={location}>{routesMap}</Switch>;
}

export default MakeRoutes