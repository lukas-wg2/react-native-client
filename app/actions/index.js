import { CALL_API, Schemas } from '../middleware/api';

export const SUBSCRIPTION_REQUEST = 'SUBSCRIPTION_REQUEST';
export const SUBSCRIPTION_SUCCESS = 'SUBSCRIPTION_SUCCESS';
export const SUBSCRIPTION_FAILURE = 'SUBSCRIPTION_FAILURE';

const fetchSubscription = () => ({
  [CALL_API]: {
    types: [ SUBSCRIPTION_REQUEST, SUBSCRIPTION_SUCCESS, SUBSCRIPTION_FAILURE ],
    endpoint: 'subscription/status',
    method: 'GET'
  }
});

export const loadSubscription = () => (dispatch, getState) => {
  const subscription = getState().subscription;
  if (subscription && subscription.isFetching) {
    // We are curently fetching the subscription,
    // wait before sending a new request
    console.log("In the middle of fetching subscription");
    return null;
  }
  console.log("Fetching subscription");
  return dispatch(fetchSubscription());
}

export const BUNDLES_REQUEST = 'BUNDLES_REQUEST';
export const BUNDLES_SUCCESS = 'BUNDLES_SUCCESS';
export const BUNDLES_FAILURE = 'BUNDLES_FAILURE';

const fetchBundles = () => ({
  [CALL_API]: {
    types: [ BUNDLES_REQUEST, BUNDLES_SUCCESS, BUNDLES_FAILURE ],
    endpoint: 'bundles',
    method: 'GET'
  }
});

export const loadBundles = () => (dispatch, getState) => {
  const bundles = getState().bundles;
  if (bundles && bundles.isFetching) {
    // We are curently fetching the subscription,
    // wait before sending a new request
    console.log("In the middle of fetching bundles");
    return null;
  }
  console.log("Fetching bundles");
  return dispatch(fetchBundles());
}

export const PURCHASE_HISTORY_REQUEST = 'PURCHASE_HISTORY_REQUEST';
export const PURCHASE_HISTORY_SUCCESS = 'PURCHASE_HISTORY_SUCCESS';
export const PURCHASE_HISTORY_FAILURE = 'PURCHASE_HISTORY_FAILURE';

const fetchPurchaseHistory = () => ({
  [CALL_API]: {
    types: [ PURCHASE_HISTORY_REQUEST, PURCHASE_HISTORY_SUCCESS, PURCHASE_HISTORY_FAILURE ],
    endpoint: 'purchases',
    method: 'GET'
  }
});

export const loadPurchaseHistory = () => (dispatch, getState) => {
  const purchaseHistory = getState().purchaseHistory;
  if (purchaseHistory && purchaseHistory.isFetching) {
    // We are curently fetching the subscription,
    // wait before sending a new request
    console.log("In the middle of fetching purchaseHistory");
    return null;
  }
  console.log("Fetching purchaseHistory");
  return dispatch(fetchPurchaseHistory());
}

export const PSEUDONYM_REQUEST = 'PSEUDONYM_REQUEST';
export const PSEUDONYM_SUCCESS = 'PSEUDONYM_SUCCESS';
export const PSEUDONYM_FAILURE = 'PSEUDONYM_FAILURE';

const fetchPseudonyms = () => ({
  [CALL_API]: {
    types: [ PSEUDONYM_REQUEST, PSEUDONYM_SUCCESS, PSEUDONYM_FAILURE ],
    endpoint: 'subscription/activePseudonyms',
    method: 'GET'
  }
});

export const loadPseudonyms = () => (dispatch, getState) => {
  const pseudonyms = getState().pseudonyms;
  if (pseudonyms && pseudonyms.isFetching) {
    // We are curently fetching the pseudonyms,
    // wait before sending a new request
    console.log("In the middle of fetching pseudonyms")
    return null;
  }
  console.log("Fetching pseudonyms")
  return dispatch(fetchPseudonyms());
}

export const PRODUCTS_REQUEST = 'PRODUCTS_REQUEST';
export const PRODUCTS_SUCCESS = 'PRODUCTS_SUCCESS';
export const PRODUCTS_FAILURE = 'PRODUCTS_FAILURE';

const fetchProducts = () => ({
  [CALL_API]: {
    types: [ PRODUCTS_REQUEST, PRODUCTS_SUCCESS, PRODUCTS_FAILURE ],
    endpoint: 'products',
    method: 'GET'
  }
});

export const loadProducts = () => (dispatch, getState) => {
  const products = getState().products;
  if (products && products.isFetching) {
    // We are curently fetching the product list,
    // wait before sending a new request
    console.log("In the middle of fetching products")
    return null;
  }
  console.log("Fetching products");
  return dispatch(fetchProducts());
}

export const PRODUCT_BUY_REQUEST = 'PRODUCT_BUY_REQUEST';
export const PRODUCT_BUY_SUCCESS = 'PRODUCT_BUY_SUCCESS';
export const PRODUCT_BUY_FAILURE = 'PRODUCT_BUY_FAILURE';

const purchaseProduct = (sku, source) => ({
  [CALL_API]: {
    types: [ PRODUCT_BUY_REQUEST, PRODUCT_BUY_SUCCESS, PRODUCT_BUY_FAILURE ],
    endpoint: `products/${sku}/purchase`,
    method: 'POST',
    allowEmptyResponse: true,
    params: [`sourceId=${source}`, `saveCard=${false}`]
  }
});

export const buyProduct = (sku, source) => (dispatch, getState) => {
  console.log("buyProduct =", sku, 'source =', source);
  return dispatch(purchaseProduct(sku, source))
    .then(() => {
      // Since the subscription has changed, lets reload.
      console.log("Refreshing subscription");
      return dispatch(fetchSubscription());
    });
}

export const CONSENTS_REQUEST = 'CONSENTS_REQUEST';
export const CONSENTS_SUCCESS = 'CONSENTS_SUCCESS';
export const CONSENTS_FAILURE = 'CONSENTS_FAILURE';

const fetchConsents = () => ({
  [CALL_API]: {
    types: [ CONSENTS_REQUEST, CONSENTS_SUCCESS, CONSENTS_FAILURE ],
    endpoint: 'consents',
    method: 'GET'
  }
});

export const loadConsents = () => (dispatch, getState) => {
  const consents = getState().consents;
  if (consents && consents.isFetching) {
    // We are curently fetching the consents list,
    // wait before sending a new request
    console.log("In the middle of fetching consents")
    return null;
  }
  console.log("Fetching consents");
  return dispatch(fetchConsents());
}

export const CONSENT_SET_REQUEST = 'CONSENT_SET_REQUEST';
export const CONSENT_SET_SUCCESS = 'CONSENT_SET_SUCCESS';
export const CONSENT_SET_FAILURE = 'CONSENT_SET_FAILURE';

const putConsent = (consentId, accepted) => ({
  [CALL_API]: {
    types: [ CONSENT_SET_REQUEST, CONSENT_SET_SUCCESS, CONSENT_SET_FAILURE ],
    endpoint: `consents/${consentId}?accepted=${accepted}`,
    method: 'PUT',
    allowEmptyResponse: true
  }
});

export const setConsent = (consentId, accepted) => (dispatch, getState) => {
  console.log("Setting consent for ", consentId, accepted);
  return dispatch(putConsent(consentId, accepted))
    .then(() => {
      // Since the consents have changed, lets reload.
      console.log("Fetching consents");
      return dispatch(fetchConsents());
    });
}

export const PROFILE_REQUEST = 'PROFILE_REQUEST';
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_FAILURE = 'PROFILE_FAILURE';
export const PROFILE_REMOVE = 'PROFILE_REMOVE';

const fetchProfile = () => ({
  [CALL_API]: {
    types: [ PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE ],
    endpoint: 'profile',
    method: 'GET'
  }
});

export const getProfile = () => (dispatch, getState) => {
  const profile = getState().profile;
  if (profile && profile.isFetching) {
    // We are curently fetching the profile,
    // wait before sending a new request
    console.log("In the middle of fetching profile")
    return null;
  }
  console.log("Fetching profile");
  return dispatch(fetchProfile());
};

export const removeProfile = () => ({
  type: PROFILE_REMOVE,
});

export const PROFILE_CREATE_REQUEST = 'PROFILE_CREATE_REQUEST';
export const PROFILE_CREATE_SUCCESS = 'PROFILE_CREATE_SUCCESS';
export const PROFILE_CREATE_FAILURE = 'PROFILE_CREATE_FAILURE';

export const PROFILE_UPDATE_REQUEST = 'PROFILE_UPDATE_REQUEST';
export const PROFILE_UPDATE_SUCCESS = 'PROFILE_UPDATE_SUCCESS';
export const PROFILE_UPDATE_FAILURE = 'PROFILE_UPDATE_FAILURE';

export const APPLICATION_TOKEN_CREATE_REQUEST = 'APPLICATION_TOKEN_CREATE_REQUEST';
export const APPLICATION_TOKEN_CREATE_SUCCESS = 'APPLICATION_TOKEN_CREATE_SUCCESS';
export const APPLICATION_TOKEN_CREATE_FAILURE = 'APPLICATION_TOKEN_CREATE_FAILURE';

const postProfile = (profile, referredBy) => ({
  [CALL_API]: {
    types: [ PROFILE_CREATE_REQUEST, PROFILE_CREATE_SUCCESS, PROFILE_UPDATE_FAILURE ],
    endpoint: 'profile',
    method: 'POST',
    body: JSON.stringify(profile),
    params: referredBy ? [`referred_by=${referredBy}`] : []
  }
});
const putProfile = profile => ({
  [CALL_API]: {
    types: [ PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_FAILURE ],
    endpoint: 'profile',
    method: 'PUT',
    body: JSON.stringify(profile)
  }
});

const postApplicationToken = applicationToken => ({
  [CALL_API]: {
    types: [ APPLICATION_TOKEN_CREATE_REQUEST, APPLICATION_TOKEN_CREATE_SUCCESS, APPLICATION_TOKEN_CREATE_FAILURE ],
    endpoint: 'applicationtoken',
    method: 'POST',
    body: JSON.stringify(applicationToken)
  }
});

export const createProfile = (profile, referredBy) => (dispatch) => {
  console.log("Creating profile");
  return dispatch(postProfile(profile, referredBy));
}
export const updateProfile = profile => (dispatch) => {
  console.log("Updating profile");
  return dispatch(putProfile(profile));
}

export const storeApplicationToken = applicationToken => (dispatch) => {
  console.log("Storing application token : ", applicationToken);
  return dispatch(postApplicationToken(applicationToken));
}

export const SELECT_PRODUCT = 'SELECT_PRODUCT';
export const PRODUCTS_REMOVE = 'PRODUCTS_REMOVE';

export const removeProducts = () => ({
  type: PRODUCTS_REMOVE
});

export const selectProduct = product => ({
  type: SELECT_PRODUCT,
  product
});

// export const REMOVE_PRODUCTS = 'PRODUCTS_REMOVE'

export const SET_AUTH = 'SET_AUTH';

export const setAuthentication = auth => ({
  type: SET_AUTH,
  auth
});

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
});

export const USER_LOGIN = 'USER_LOGIN';

export const userLoggedIn = () => ({
  type: USER_LOGIN
});

export const USER_LOGOUT = 'USER_LOGOUT';

export const userLogout = () => ({
  type: USER_LOGOUT
});

export const SET_REMOTE_CONFIG = 'SET_REMOTE_CONFIG';

export const setRemoteConfig = (data) => ({
  type: SET_REMOTE_CONFIG,
  data,
});

export const CARD_ADD = 'CARD_ADD';
export const CARD_SET = 'CARD_SET';
export const CARD_REMOVE = 'CARD_REMOVE';
export const CARD_SET_DEFAULT = 'CARD_SET_DEFAULT';
export const CARD_SET_ALL = 'CARD_SET_ALL';

export const cardAdd = card => ({
  type: CARD_ADD,
  data: {
    card
  }
});

export const cardSet = (id, card) => ({
  type: CARD_SET,
  data: {
    id,
    card
  }
});

export const cardRemove = id => ({
  type: CARD_REMOVE,
  data: {
    id
  }
});

export const cardSetDefault = id => ({
  type: CARD_SET_DEFAULT,
  data: {
    id
  }
});

export const cardSetAll = cards => ({
  type: CARD_SET_ALL,
  data: {
    cards
  }
});
