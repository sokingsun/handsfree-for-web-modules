import _ from 'lodash';
import $ from 'jquery';
import moment from 'moment';
import { executeBackgroundAction } from './helpers/background';
import scroll from './helpers/scroll';

function getScrollContainer(rootElement) {
  return $(rootElement.querySelector('.dialog .body'));
}

function down({ rootElement }) {
  scroll.down(getScrollContainer(rootElement));
}

function up({ rootElement }) {
  scroll.up(getScrollContainer(rootElement));
}

function getDate(time) {
  return moment(new Date(time)).format('MM/DD/YYYY');
}

function setup() {
  return new Promise((resolve) => {
    executeBackgroundAction({ getDownloads: true }, ({ downloads }) => {
      const updatedDownloads = downloads.map((download, index) => ({
        complete: download.state === 'complete',
        file: _.last(download.filename.split('/')),
        filename: download.filename,
        id: download.id,
        mime: download.mime,
        startTime: download.startTime,
        url: download.url,
      }));
      resolve({
        downloads: _.groupBy(updatedDownloads, record => getDate(record.startTime)),
      });
    });
  });
}


export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-download',
  contexts: [{
    context: 'root',
    commands: [{
      name: 'i18n-command.downloads',
      group: 'i18n-group.downloads',
      help: 'i18n-help.downloads',
      action: () => {},
      switchToContext: 'downloads',
    }],
    i18n: {
      en: {
        'command.downloads': 'downloads',
        'group.downloads': 'Downloads',
        'help.downloads': 'Opens the downloaded file list',
      },
      es: {
        'command.downloads': 'descargas',
        'group.downloads': 'Descargas',
        'help.downloads': 'Abre lista de descargas realizadas',
      },
      pt: {
        'command.downloads': 'downloads',
        'group.downloads': 'Downloads',
        'help.downloads': 'Abre a lista de arquivos baixados',
      },
      yue: {
        'command.downloads': '下載',
        'group.downloads': '下載',
        'help.downloads': '開啟下載檔案清單',
      },
    },
  }, {
    context: 'downloads',
    name: 'i18n-name',
    setup,
    commands: [{
      name: 'i18n-command.scroll-up',
      action: up,
      group: 'i18n-group.scroll-up',
      help: 'i18n-help.scroll-up',
    }, {
      name: 'i18n-command.scroll-down',
      action: down,
      group: 'i18n-group.scroll-down',
      help: 'i18n-help.scroll-down',
    }],
    i18n: {
      en: {
        name: 'Downloads',
        'command.scroll-up': 'scroll up',
        'group.scroll-up': 'Scroll',
        'help.scroll-up': 'Performs a scroll up of the list',
        'command.scroll-down': 'scroll down',
        'help.scroll-down': 'Performs a scroll down of the list',
        'group.scroll-down': 'Scroll',
        'scroll-up': 'Scroll Up',
        'scroll-down': 'Scroll Down',
        exit: 'Exit',
        'date-format': 'MM/DD/YYYY',
      },
      es: {
        name: 'Descargas',
        'command.scroll-up': 'subir',
        'group.scroll-up': 'Desplazarse',
        'help.scroll-up': 'Desplazar la lista hacia arriba',
        'command.scroll-down': 'bajar',
        'group.scroll-down': 'Desplazarse',
        'help.scroll-down': 'Desplazar la lista hacia abajo',
        'scroll-up': 'Subir',
        exit: 'Salir',
        'date-format': 'DD/MM/YYYY',
      },
      pt: {
        name: 'Downloads',
        'command.scroll-up': 'rolar para cima',
        'group.scroll-up': 'Rolar',
        'help.scroll-up': 'Executa uma rolagem para cima na página',
        'command.scroll-down': 'rolar para baixo',
        'help.scroll-down': 'Executa uma rolagem para baixo na página',
        'group.scroll-down': 'Rolar',
        'scroll-up': 'Rolar para Cima',
        'scroll-down': 'Rolar para Baixo',
        exit: 'Sair',
        'date-format': 'DD/MM/AAAA',
      },
      yue: {
        name: '下載',
        'command.scroll-up': '向上滑動',
        'group.scroll-up': '滑動',
        'help.scroll-up': '在清單內向上滑動',
        'command.scroll-down': '向下滑動',
        'help.scroll-down': '在清單內向下滑動',
        'group.scroll-down': '滑動',
        'scroll-up': '向上滑動',
        'scroll-down': '向下滑動',
        exit: 'Exit',
        'date-format': 'MM/DD/YYYY',
      },
    },
  }],
  i18n: {
    en: {
      name: 'Downloads',
      description: 'See the downloaded files',
    },
    es: {
      name: 'Descargas',
      description: 'Abre la lista de archivos descargados',
    },
    pt: {
      name: 'Downloads',
      description: 'Veja os arquivos baixados',
    },
    yue: {
      name: '下載',
      description: '檢視下載檔案',
    },
  },
};
