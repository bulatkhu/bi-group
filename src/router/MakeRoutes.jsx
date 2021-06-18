import React from 'react'
import { view } from '@risingstack/react-easy-state'
import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import auth from '../store/modules/auth'
import Loader from '../components/elements/Loader'


const Render = view(({ route }) => {
  const history = useHistory()
  const { isAuth, loaded } = auth

  if (!route.private) {

    if (isAuth) {
      history.replace('/app-catalogues')
      return null
    }

    return <route.component {...route} />
  }

  if (
    !loaded
  ) {
    return <Loader/>
  } else
  if (isAuth) {
    return <route.component {...route} />
  } else if (!isAuth) {
    history.push({
      pathname: '/',
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
