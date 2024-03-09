import type { HashNavigator } from '@tma.js/sdk';
import { useBackButton } from '@tma.js/sdk-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Location, Navigator, Path } from 'react-router-dom';

export function useNavigator(tmaNavigator: HashNavigator): [Location, Navigator] {
  const bb = useBackButton();

  // Creates location based on the TMA navigator.
  const createLocation = useCallback(() => ({
    state: null,
    key: '',
    pathname: tmaNavigator.pathname,
    hash: tmaNavigator.hash,
    search: tmaNavigator.search,
  }), [tmaNavigator]);
  const [location, setLocation] = useState(createLocation);
  const [canGoBack, setCanGoBack] = useState(tmaNavigator.canGoBack);

  // Create Navigator appropriate to th react-router-dom package.
  const navigator = useMemo<Navigator>(() => ({
    go: tmaNavigator.go.bind(tmaNavigator),
    push: tmaNavigator.push.bind(tmaNavigator),
    replace: tmaNavigator.replace.bind(tmaNavigator),
    createHref(to) {
      return typeof to === 'string' ? `#${to}` : `#${to.pathname}${to.search}${to.hash}`;
    },
    encodeLocation(to): Path {
      return new URL(
        typeof to === 'string'
          ? to
          : `${to.pathname}${to.search}${to.hash}`,
        'http://localhost',
      );
    },
  }), [tmaNavigator]);

  // When TMA navigator state changed, we should actualize the reactive value.
  useEffect(() => {
    return tmaNavigator.on('change', () => {
      setLocation(createLocation());
      setCanGoBack(tmaNavigator.canGoBack);
    });
  }, [tmaNavigator, createLocation]);

  // When button
  useEffect(() => {
    if (canGoBack) {
      bb.show();
    } else {
      bb.hide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canGoBack]);

  // When user presses the Back Button, we navigate back.
  useEffect(() => {
    return bb.on('click', () => tmaNavigator.back());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [location, navigator];
}
