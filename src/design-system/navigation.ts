export type DesignSystemNavItem = {
  href: string;
  label: string;
  description: string;
};

export type DesignSystemNavGroup = {
  title: string;
  items: DesignSystemNavItem[];
};

export const designSystemNav: DesignSystemNavGroup[] = [
  {
    title: "Компоненти сторінок",
    items: [
      { href: "/hero", label: "Hero", description: "Перший екран, фон, заголовок, CTA." },
      { href: "/title-section", label: "Title section", description: "Вступні секції з великим заголовком." },
      { href: "/subsystem-section", label: "Subsystem section", description: "Список підсистем і великі картки." },
      { href: "/layout-panel", label: "Layout panel", description: "Сторінкова панель навігації і контентна область." },
    ],
  },
  {
    title: "UI kit",
    items: [
      { href: "/ui-kit", label: "Огляд UI kit", description: "Кольори, типографіка, відступи, стани." },
      { href: "/ui-kit/fonts", label: "Fonts", description: "Шрифти, ваги, ієрархія заголовків." },
      { href: "/ui-kit/paddings", label: "Paddings", description: "Контейнери, ритм секцій, grid." },
      { href: "/ui-kit/buttons", label: "Buttons", description: "Primary, secondary, ghost, accent." },
      { href: "/ui-kit/cards", label: "Cards", description: "Картки сервісів, документів і метрик." },
    ],
  },
  {
    title: "Поведінка",
    items: [
      { href: "/modals", label: "Modals", description: "Світла modal, overlay, close animation." },
      { href: "/toasts", label: "Popup toast", description: "Info, warning, success, error notifications." },
      { href: "/adaptive", label: "Adaptive", description: "Як компоненти перебудовуються без макету." },
    ],
  },
];
