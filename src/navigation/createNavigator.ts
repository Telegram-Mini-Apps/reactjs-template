import type { HashNavigatorOptions } from '@tma.js/sdk';
import { HashNavigator, isPageReload } from '@tma.js/sdk';

/**
 * Creates Telegram Mini Apps navigator.
 */
export function createNavigator(): HashNavigator {
  let navigator: HashNavigator | undefined;
  const navigatorOptions: HashNavigatorOptions = {
    debug: true,
  };

  // If page was reloaded, we assume that navigator had to previously save
  // its state in the session storage.
  if (isPageReload()) {
    const stateRaw = sessionStorage.getItem('hash-navigator-state');
    if (stateRaw) {
      try {
        const { cursor, entries } = JSON.parse(stateRaw);
        navigator = new HashNavigator(entries, cursor, navigatorOptions);
      } catch (e) {
        console.error('Unable to restore hash navigator state.', e);
      }
    }
  }

  // In case, we could not restore its state, or it is the fresh start, we
  // can create empty navigator.
  if (!navigator) {
    navigator = new HashNavigator([{}], 0, navigatorOptions);
  }

  const saveState = (nav: HashNavigator) => {
    sessionStorage.setItem('hash-navigator-state', JSON.stringify({
      cursor: nav.cursor,
      entries: nav.getEntries(),
    }));
  };

  // Whenever navigator changes its state, we save it in the session storage.
  navigator.on('change', ({ navigator: nav }) => saveState(nav));

  // Save initial state to make sure nothing will break when page will
  // be reloaded.
  saveState(navigator);

  return navigator;
}
