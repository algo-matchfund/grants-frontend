import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Button } from 'shards-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons';
import { Trans } from 'react-i18next';

import './ErrorBoundary.scss';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      errorInfo: undefined,
    };
  }

  static getDerivedStateFromError(error, errorInfo) {
    return { error, errorInfo };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    const { children } = this.props;
    const { error, errorInfo } = this.state;
    const rootView = `/${window.location.pathname.split('/')[1]}`; // if current path is /foo/bar/baz, rootView is /foo

    return (
      error ? (
        <div className="error-boundary">
          <Card className="error-boundary-card">
            <CardBody className="d-flex flex-column align-items-center">
              <FontAwesomeIcon icon={faCloudRain} size="8x" />
              <h4><Trans>Something went wrong...</Trans></h4>
              <p><Trans>Please try again later.</Trans></p>
              <div className="d-flex justify-content-between mt-2">
                <Button
                  className="mr-2"
                  type="button"
                  onClick={() => window.location.replace(rootView)}
                >
                  <Trans>Return to previous page</Trans>
                </Button>
                <Button
                  className="ml-2"
                  type="button"
                  onClick={() => window.location.replace('/')}
                >
                  <Trans>Return to homepage</Trans>
                </Button>
              </div>
              {process.env.NODE_ENV === 'development' && (
              <details className="mt-4">
                {error.toString()}
                {errorInfo && errorInfo.componentStack}
              </details>
              )}
            </CardBody>
          </Card>
        </div>
      ) : children
    );
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ErrorBoundary;
