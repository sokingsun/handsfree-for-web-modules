import _ from 'lodash';
import $ from 'jquery';
import moment from 'moment';
import { executeBackgroundAction } from './helpers/background';
import { getNumber, getNumbersUntil } from './helpers/number-helpers';
import openUrl from './helpers/open-url';
import scroll from './helpers/scroll';

function getDate(time) {
  return moment(new Date(time)).format('MM/DD/YYYY');
}

function getScrollContainer(rootElement) {
  return $(rootElement.querySelector('.dialog .body'));
}

function down({ rootElement }) {
  scroll.down(getScrollContainer(rootElement));
}

function up({ rootElement }) {
  scroll.up(getScrollContainer(rootElement));
}

function openUrlOfElement(element) {
  const url = element.getAttribute('data-url');
  if (url) {
    openUrl(url);
    return {
      commandWasExecuted: true,
    };
  }
  return {};
}

function reviewCommand({ rootElement, commandName }) {
  const number = getNumber(commandName);
  if (number) {
    const element = rootElement.querySelector(`[data-key="${number}"]`);
    if (element) {
      return openUrlOfElement(element);
    }
  }
  return {};
}

function setup() {
  return new Promise((resolve) => {
    executeBackgroundAction({ getHistory: true }, ({ history }) => {
      const historyRecordsWithActions = history.map((record, index) => ({
        ...record,
        open: index + 1,
      }));
      // eslint-disable-next-line max-len
      const historyRecordsGroupedByDate = _.groupBy(historyRecordsWithActions, record => getDate(record.lastVisitTime));
      resolve({
        history: historyRecordsGroupedByDate,
        expandedCommands: getNumbersUntil(200),
      });
    });
  });
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-history',
  contexts: [{
    context: 'root',
    commands: [{
      name: 'i18n-command.history',
      group: 'i18n-group.history',
      help: 'i18n-help.history',
      action: () => {},
      switchToContext: 'history',
    }],
    i18n: {
      en: {
        'command.history': 'history',
        'group.history': 'History',
        'help.history': 'Opens the accessed website list',
      },
      es: {
        'command.history': 'historial',
        'group.history': 'Historial',
        'help.history': 'Abre lista de sitios webs accedidos',
      },
      pt: {
        'command.history': 'histórico',
        'group.history': 'Histórico',
        'help.history': 'Abre a lista de sites acessados',
      },
      yue: {
        'command.history': '瀏覽記錄',
        'group.history': '瀏覽記錄',
        'help.history': '開啟瀏覽記錄',
      },
    },
  }, {
    context: 'history',
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
    }, {
      name: '*',
      help: 'i18n-help.*',
      action: reviewCommand,
    }],
    i18n: {
      en: {
        name: 'History',
        'command.scroll-up': 'scroll up',
        'group.scroll-up': 'Scroll',
        'help.scroll-up': 'Performs a scroll up of the list',
        'command.scroll-down': 'scroll down',
        'help.scroll-down': 'Performs a scroll down of the list',
        'group.scroll-down': 'Scroll',
        'scroll-up': 'Scroll Up',
        'scroll-down': 'Scroll Down',
        open: 'Open',
        exit: 'Exit',
        'help.*': 'Execute an action',
        'date-format': 'MM/DD/YYYY',
        'no-title-provided': 'No title provided',
      },
      es: {
        name: 'Historial',
        'command.scroll-up': 'subir',
        'group.scroll-up': 'Desplazarse',
        'help.scroll-up': 'Desplazar la lista hacia arriba',
        'command.scroll-down': 'bajar',
        'group.scroll-down': 'Desplazarse',
        'help.scroll-down': 'Desplazar la lista hacia abajo',
        'scroll-up': 'Subir',
        open: 'Abrir',
        exit: 'Salir',
        'scroll-down': 'Bajar',
        'help.*': 'Ejecuta la acción',
        'date-format': 'DD/MM/YYYY',
        'no-title-provided': 'Sin título',
      },
      pt: {
        name: 'Histórico',
        'command.scroll-up': 'rolar para cima',
        'group.scroll-up': 'Rolar',
        'help.scroll-up': 'Executa a rolagem para cima da lista',
        'command.scroll-down': 'rolar para baixo',
        'help.scroll-down': 'Executa a rolagem para baixo da lista',
        'group.scroll-down': 'Rolar',
        'scroll-up': 'Rolar para cima',
        'scroll-down': 'Rolar para baixo',
        open: 'Abrir',
        exit: 'Sair',
        'help.*': 'Execute a ação',
        'date-format': 'DD/MM/AAAA',
        'no-title-provided': 'Sem título',
      },
      yue: {
        name: '瀏覽記錄',
        'command.scroll-up': '向上滑動',
        'group.scroll-up': '滑動',
        'help.scroll-up': '在清單內向上滑動',
        'command.scroll-down': '向下滑動',
        'help.scroll-down': '在清單內向下滑動',
        'group.scroll-down': '滑動',
        'scroll-up': '向上滑動',
        'scroll-down': '向下滑動',
        open: '開啟',
        exit: '離開',
        'help.*': '執行動作',
        'date-format': 'MM/DD/YYYY',
        'no-title-provided': '沒有標題',
      },
    },
  }],
  i18n: {
    en: {
      name: 'History',
      description: 'Manage all about accessed websites',
    },
    es: {
      name: 'Historial',
      description: 'Administra todo acerca de los sitios web visitados',
    },
    pt: {
      name: 'Histórico',
      description: 'Gerenciar tudo sobre websites acessados',
    },
    yue: {
      name: '瀏覽記錄',
      description: '管理所有瀏覽記錄',
    },
  },
};
