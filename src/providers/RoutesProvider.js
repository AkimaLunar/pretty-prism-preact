import { h } from 'preact';
import Route from 'react-router/Route';
import Redirect from 'react-router/Redirect';
import AuthProvider from './AuthProvider';

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return h(component, finalProps);
};

export const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        return renderMergedProps(component, routeProps, rest);
      }}
    />
  );
};

export const PrivateRoute = ({ component, redirectTo, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        return AuthProvider.isUserAuthenticated() ? (
          renderMergedProps(component, routeProps, rest)
        ) : (
          <Redirect
            to={{
              pathname: redirectTo,
              state: { from: routeProps.location }
            }}
          />
        );
      }}
    />
  );
};
