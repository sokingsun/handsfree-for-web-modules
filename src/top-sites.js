import $ from 'jquery';
import { executeBackgroundAction } from './helpers/background';
import { getNumber, getNumbersUntil } from './helpers/number-helpers';
import openUrl from './helpers/open-url';
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
    executeBackgroundAction({ getTopSites: true }, ({ topSites }) => {
      resolve({
        topSites,
        expandedCommands: getNumbersUntil(20),
      });
    });
  });
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-line-chart',
  contexts: [{
    context: 'root',
    commands: [{
      name: 'i18n-command.top-sites',
      group: 'i18n-group.top-sites',
      help: 'i18n-help.top-sites',
      action: () => {},
      switchToContext: 'top-sites',
    }],
    i18n: {
      en: {
        'command.top-sites': 'top sites',
        'group.top-sites': 'Top sites',
        'help.top-sites': 'Opens the most frequented site list',
      },
      es: {
        'command.top-sites': 'sitios más visitados',
        'group.top-sites': 'Sitios más visitados',
        'help.top-sites': 'Abre lista de sitios más visitados',
      },
      pt: {
        'command.top-sites': 'sites mais acessados',
        'group.top-sites': 'Sites mais acessados',
        'help.top-sites': 'Abre a lista dos sites mais acessados',
      },
      yue: {
        'command.top-sites': '最常瀏覽的網站',
        'group.top-sites': '最常瀏覽的網站',
        'help.top-sites': '開啟最常瀏覽的網站清單',
      },
    },
  }, {
    context: 'top-sites',
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
        name: 'Top Sites',
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
      },
      es: {
        name: 'Sitios más visitados',
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
      },
      pt: {
        name: 'Sites mais acessados',
        'command.scroll-up': 'rolar para cima',
        'group.scroll-up': 'Rolagem',
        'help.scroll-up': 'Executa uma rolagem para cima na lista',
        'command.scroll-down': 'rolar para baixo',
        'help.scroll-down': 'Executa uma rolagem para baixo na lista',
        'group.scroll-down': 'Rolagem',
        'scroll-up': 'Rolar para Cima',
        'scroll-down': 'Rolar para Baixo',
        open: 'Abrir',
        exit: 'Sair',
        'help.*': 'Executa uma ação',
      },
      yue: {
        name: '最常瀏覽的網站',
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
      },
    },
  }],
  i18n: {
    en: {
      name: 'Top Sites',
      description: 'Manage all about most frequented websites',
    },
    es: {
      name: 'Sitios más visitados',
      description: 'Administra todo acerca de los sitios más visitados',
    },
    pt: {
      name: 'Sites mais acessados',
      description: 'Gerencia os sites mais acessados.',
    },
    yue: {
      name: '最常瀏覽的網站',
      description: '管理所有最常瀏覽的網站',
    },
  },
};
