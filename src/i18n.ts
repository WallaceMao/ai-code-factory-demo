import { FilterType } from './types/todo';

export type Language = 'zh' | 'en';

export interface TodoTranslations {
  app: {
    languageLabel: string;
  };
  input: {
    placeholder: string;
    addButton: string;
  };
  filter: {
    labels: Record<FilterType, string>;
    activeCount: (count: number) => string;
    clearCompleted: string;
  };
  list: {
    emptyState: string;
  };
  item: {
    editTitle: string;
    deleteTitle: string;
  };
}

export const languageNames: Record<Language, string> = {
  zh: '中文',
  en: 'English',
};

export const translations: Record<Language, TodoTranslations> = {
  zh: {
    app: {
      languageLabel: '语言',
    },
    input: {
      placeholder: '添加新任务...',
      addButton: '添加',
    },
    filter: {
      labels: {
        all: '全部',
        active: '进行中',
        completed: '已完成',
      },
      activeCount: count => `${count} 个待办`,
      clearCompleted: '清除已完成',
    },
    list: {
      emptyState: '暂无任务',
    },
    item: {
      editTitle: '编辑',
      deleteTitle: '删除',
    },
  },
  en: {
    app: {
      languageLabel: 'Language',
    },
    input: {
      placeholder: 'Add a new task...',
      addButton: 'Add',
    },
    filter: {
      labels: {
        all: 'All',
        active: 'Active',
        completed: 'Completed',
      },
      activeCount: count => `${count} active`,
      clearCompleted: 'Clear completed',
    },
    list: {
      emptyState: 'No tasks yet',
    },
    item: {
      editTitle: 'Edit',
      deleteTitle: 'Delete',
    },
  },
};
