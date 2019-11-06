import ReactGA from 'react-ga';

const debug = process.env.NODE_ENV === 'development';

const trackPageView = (location) => {
  ReactGA.set({
    page: location.pathname,
  });
  ReactGA.pageview(location.pathname);
};

const initGa = (history) => {
  ReactGA.initialize('UA-126268381-1', {
    debug,
  });
  if (debug) {
    ReactGA.ga('set', 'sendHitTask', null);
  }
  trackPageView(history.location);
  history.listen(trackPageView);
};

const trackSubscribedEvent = () => {
  ReactGA.event({
    category: 'User',
    action: 'Subscribed',
  });
};

const trackPaidEvent = () => {
  ReactGA.event({
    category: 'User',
    action: 'Paid',
  });
};

const trackVerifiedEvent = () => {
  ReactGA.event({
    category: 'User',
    action: 'Verified',
  });
};

const trackActivatedEvent = () => {
  ReactGA.event({
    category: 'User',
    action: 'Activated',
  });
};

export {
  initGa as default,
  trackPageView,
  trackVerifiedEvent,
  trackPaidEvent,
  trackSubscribedEvent,
  trackActivatedEvent,
};
