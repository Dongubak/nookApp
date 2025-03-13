export default ({ config }) => ({
  ...config,
  name: getAppName(),
  ios: {
    ...config.ios,
    bundleIdentifier: getUniqueIdentifier(),
  },
  android: {
    ...config.android,
    package: getUniqueIdentifier(),
  },
});


const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.dongubak.nookApp.dev';
  }

  if (IS_PREVIEW) {
    return 'com.dongubak.nookApp.preview';
  }

  return 'com.dongubak.nookApp';
};

const getAppName = () => {
  if (IS_DEV) {
    return 'NookApp (Dev)';
  }

  if (IS_PREVIEW) {
    return 'NookApp (Preview)';
  }

  return 'NookApp: Kunsan Community';
};