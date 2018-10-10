import firebase from 'react-native-firebase';

if (__DEV__) {
  firebase.config().enableDeveloperMode();
}

// Set default values
firebase.config().setDefaults({
  productSKU: false,
  offerSKU: false,
  featureFlagEnableAddCardInApp: false,
  featureFlagEnableReferrals: false,
});

export const getRemoteConfig = (callback) => {

  // Parameter to fetch is how many seconds the config should be cached locally
  // In dev we disable cache to enable instant testing
  // In prod we can max fetch config 5 times per 60 minutes
  // Ref: https://firebase.google.com/docs/remote-config/android#caching_and_throttling
  firebase.config().fetch(__DEV__ ? 0 : 60 * 60 / 5)
    .then(() => {
      return firebase.config().activateFetched();
    })
    .then((activated) => {
      console.log('Fetched data is activated');
      return firebase.config().getValues(['productSKU', 'offerSKU', 'featureFlagShowAddCardButton', 'featureFlagEnableReferrals'])
    })
    .then((objects) => {

      let data = {};
      Object.keys(objects).forEach((key) => {
        data[key] = objects[key].val()
      });

      if (callback) {
        callback(data);
      }
    })
    .catch(console.error);
};
