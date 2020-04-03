import { executeBackgroundAction } from './helpers/background';

export function newTab() {
  executeBackgroundAction({ newTab: 'https://google.com' });
}

function closeTab() {
  executeBackgroundAction({ closeTab: true });
}

function nextTab() {
  executeBackgroundAction({ nextTab: true });
}

function previousTab() {
  executeBackgroundAction({ previousTab: true });
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-window-restore',
  contexts: [{
    context: 'root',
    commands: [{
      name: 'i18n-command.new-tab',
      help: 'i18n-help.new-tab',
      action: newTab,
      group: 'i18n-group.tab',
    }, {
      name: 'i18n-command.close-tab',
      help: 'i18n-help.close-tab',
      action: closeTab,
      group: 'i18n-group.tab',
    }, {
      name: 'i18n-command.next-tab',
      help: 'i18n-help.next-tab',
      action: nextTab,
      group: 'i18n-group.tab',
    }, {
      name: 'i18n-command.previous-tab',
      help: 'i18n-help.previous-tab',
      action: previousTab,
      group: 'i18n-group.tab',
    }],
    i18n: {
      en: {
        'group.tab': 'Tabs',
        'command.new-tab': 'new tab',
        'help.new-tab': 'Opens a new tab',
        'command.close-tab': 'close tab',
        'help.close-tab': 'Closes the current tab',
        'command.next-tab': 'next tab',
        'help.next-tab': 'Switches to the following tab',
        'command.previous-tab': 'previous tab',
        'help.previous-tab': 'Switches to the previous tab',
      },
      es: {
        'group.tab': 'Pestañas',
        'command.new-tab': 'nueva pestaña',
        'help.new-tab': 'Abrir una nueva pestaña',
        'command.close-tab': 'cerrar pestaña',
        'help.close-tab': 'Cerrar una pestaña',
        'command.next-tab': 'siguiente pestaña',
        'help.next-tab': 'Cambiar a la siguiente pestaña',
        'command.previous-tab': 'anterior pestaña',
        'help.previous-tab': 'Cambiar a la anterior pestaña',
      },
      pt: {
        'group.tab': 'Guias',
        'command.new-tab': 'nova guia',
        'help.new-tab': 'Abrir uma nova guia',
        'command.close-tab': 'fechar guia',
        'help.close-tab': 'Fechar a guia atual',
        'command.next-tab': 'próxima guia',
        'help.next-tab': 'Alternar para próxima guia',
        'command.previous-tab': 'guia anterior',
        'help.previous-tab': 'Alternar para última guia',
      },
      yue: {
        'group.tab': '分頁',
        'command.new-tab': '新分頁',
        'help.new-tab': '開啟新分頁',
        'command.close-tab': '關閉分頁',
        'help.close-tab': '關閉此分頁',
        'command.next-tab': '下一個分頁',
        'help.next-tab': '轉換至下一個分頁',
        'command.previous-tab': '上一個分頁',
        'help.previous-tab': '轉換至上一個分頁',
      },
    },
  }],
  i18n: {
    en: {
      name: 'Tabs',
      description: 'This module allows you to manage the browser tabs.',
    },
    es: {
      name: 'Pestañas',
      description: 'Este módulo permite administrar las pestañas.',
    },
    pt: {
      name: 'Guia',
      description: 'Este módulo permite que seja manuseada as guias do navegador.',
    },
    yue: {
      name: '分頁',
      description: '你可以使用此模組管理所有分頁。',
    },
  },
};
