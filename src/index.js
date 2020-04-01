import speechRecognitionControl from 'handsfree-for-web-control-speech-recognition-module';
import zoom from 'handsfree-for-web-zoom-module';
import bookmarks from './bookmarks';
import downloads from './downloads';
import history from './history';
import tabs from './tabs';
import topSites from './top-sites';

const browserModules = [
  bookmarks,
  downloads,
  history,
  speechRecognitionControl,
  tabs,
  topSites,
  zoom,
];

export default browserModules;
