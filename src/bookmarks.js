import $ from 'jquery';
import { executeBackgroundAction } from './helpers/background';
import { getNumber, getNumbersUntil } from './helpers/number-helpers';
import openUrl from './helpers/open-url';
import scroll from './helpers/scroll';

let bookmarksIndex = 1;

function normalizeBookmarksSite(site) {
  const index = bookmarksIndex;
  bookmarksIndex += 2;
  return {
    delete: index + 1,
    id: site.id,
    open: index,
    title: site.title,
    url: site.url,
  };
}

function normalizeBookmarksFolder(folder) {
  const newFolder = {
    title: folder.title,
  };
  if (folder.children) {
    newFolder.children = folder.children
      .filter(child => !(child.url === 'chrome://bookmarks/' || child.url === ''))
      .map(normalizeBookmarksNode);
  }
  return newFolder;
}

function normalizeBookmarksNode(node) {
  if (node.children) {
    return normalizeBookmarksFolder(node);
  }
  return normalizeBookmarksSite(node);
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

function addBookmarks() {
  executeBackgroundAction({
    addBookmark: {
      title: document.title,
      url: document.URL,
    },
  });
}

function removeBookmark(bookmarkId) {
  return new Promise((resolve) => {
    executeBackgroundAction({ removeBookmark: bookmarkId }, ({ bookmarksTree }) => {
      bookmarksIndex = 1;
      resolve({
        bookmarksTree: bookmarksTree.map(normalizeBookmarksNode),
        commandWasExecuted: true,
      });
    });
  });
}

function handleBookmarkAction(el) {
  const id = el.getAttribute('data-id');
  if (id) {
    return removeBookmark(id);
  }

  const url = el.getAttribute('data-url');
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
      return handleBookmarkAction(element);
    }
  }
  return {};
}

function setup() {
  return new Promise((resolve) => {
    executeBackgroundAction({ getBookmarks: true }, ({ bookmarksTree }) => {
      bookmarksIndex = 1;
      resolve({
        expandedCommandNames: getNumbersUntil(200),
        bookmarksTree: bookmarksTree.map(normalizeBookmarksNode),
      });
    });
  });
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-bookmark',
  contexts: [{
    context: 'root',
    commands: [{
      name: 'i18n-command.add-bookmark',
      group: 'i18n-group.add-bookmark',
      help: 'i18n-help.add-bookmark',
      action: addBookmarks,
    }, {
      name: 'i18n-command.bookmarks',
      group: 'i18n-group.bookmarks',
      help: 'i18n-help.bookmarks',
      action: () => {},
      switchToContext: 'bookmarks',
    }],
    i18n: {
      en: {
        'command.add-bookmark': 'add bookmark',
        'help.add-bookmark': 'Saves the current page as a bookmark',
        'group.add-bookmark': 'Bookmarks',
        'command.bookmarks': 'bookmarks',
        'group.bookmarks': 'Bookmarks',
        'help.bookmarks': 'Opens bookmark list',
      },
      es: {
        'command.add-bookmark': 'agregar a favoritos',
        'help.add-bookmark': 'Guarda el sitio actual en favoritos',
        'group.add-bookmark': 'Favoritos',
        'command.bookmarks': 'favoritos',
        'group.bookmarks': 'Favoritos',
        'help.bookmarks': 'Abre lista de favoritos',
      },
      pt: {
        'command.add-bookmark': 'adicionar aos favoritos',
        'help.add-bookmark': 'Salvar página atual aos favoritos',
        'group.add-bookmark': 'Favoritos',
        'command.bookmarks': 'favoritos',
        'group.bookmarks': 'Favoritos',
        'help.bookmarks': 'Abrir lista de favoritos',
      },
      yue: {
        'command.add-bookmark': '加入書籤',
        'help.add-bookmark': '將此分頁加入書籤',
        'group.add-bookmark': '書籤',
        'command.bookmarks': '書籤',
        'group.bookmarks': '書籤',
        'help.bookmarks': '開啟書籤清單',
      },
    },
  }, {
    context: 'bookmarks',
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
        name: 'Bookmarks',
        'command.scroll-up': 'scroll up',
        'group.scroll-up': 'Scroll',
        'help.scroll-up': 'Performs a scroll up of the bookmark list',
        'command.scroll-down': 'scroll down',
        'help.scroll-down': 'Performs a scroll down of the bookmark list',
        'group.scroll-down': 'Scroll',
        'scroll-up': 'Scroll Up',
        'scroll-down': 'Scroll Down',
        open: 'Open',
        delete: 'Delete',
        exit: 'Exit',
        'help.*': 'Execute an action',
      },
      es: {
        name: 'Favoritos',
        'command.scroll-up': 'subir',
        'group.scroll-up': 'Desplazarse',
        'help.scroll-up': 'Desplazar la lista de favoritos hacia arriba',
        'command.scroll-down': 'bajar',
        'group.scroll-down': 'Desplazarse',
        'help.scroll-down': 'Desplazar la lista de favoritos hacia abajo',
        'scroll-up': 'Subir',
        open: 'Abrir',
        exit: 'Salir',
        'scroll-down': 'Bajar',
        delete: 'Eliminar',
        'help.*': 'Ejecuta la acción',
      },
      pt: {
        name: 'Favoritos',
        'command.scroll-up': 'rolar para cima',
        'group.scroll-up': 'Rolagem',
        'help.scroll-up': 'Rolar para cima na lista de favoritos',
        'command.scroll-down': 'rolar para baixo',
        'help.scroll-down': 'Rolar para baixo na lista de favoritos',
        'group.scroll-down': 'Rolagem',
        'scroll-up': 'Rolar para cima',
        'scroll-down': 'Rolar para baixo',
        open: 'Abrir',
        delete: 'Excluir',
        exit: 'Sair',
        'help.*': 'Executar ação',
      },
      yue: {
        name: '書籤',
        'command.scroll-up': '向上滑動',
        'group.scroll-up': '滑動',
        'help.scroll-up': '在書籤清單內向上滑動',
        'command.scroll-down': '向下滑動',
        'help.scroll-down': '在書籤清單內向下滑動',
        'group.scroll-down': '滑動',
        'scroll-up': '向上滑動',
        'scroll-down': '向下滑動',
        open: '開啟',
        delete: '刪除',
        exit: '離開',
        'help.*': '執行動作',
      },
    },
  }],
  i18n: {
    en: {
      name: 'Bookmarks',
      description: 'Manage all about bookmarks',
    },
    es: {
      name: 'Favoritos',
      description: 'Administra todo acerca de los favoritos',
    },
    pt: {
      name: 'Favoritos',
      description: 'Gerenciador de favoritos',
    },
    yue: {
      name: '書籤',
      description: '管理所有書籤',
    },
  },
};
