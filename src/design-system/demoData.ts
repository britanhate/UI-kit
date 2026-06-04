import type { SanitizedArcgisItem } from "@/lib/arcgis/types";

export const demoAppItem: SanitizedArcgisItem = {
  id: "demo-app",
  title: "Приклад веб-застосунку",
  type: "Web Experience",
  snippet: "Картка показує, як виглядає застосунок із зображенням, metadata, коротким описом і основною дією.",
  created: Date.UTC(2026, 4, 25),
  modified: Date.UTC(2026, 4, 25),
  itemPageUrl: "#",
  openUrl: "#",
  imageUrl: "/images/geoportal/app-card.webp",
};

export const demoDocumentItem: SanitizedArcgisItem = {
  id: "demo-doc",
  title: "Приклад документа",
  type: "Microsoft Word",
  snippet: "Картка документа використовується для матеріалів, які можна відкрити або завантажити через дію внизу картки.",
  created: Date.UTC(2026, 5, 1),
  modified: Date.UTC(2026, 5, 1),
  itemPageUrl: "#",
  openUrl: "#",
  downloadUrl: "#",
};

export const introPoints = [
  {
    title: "Веб-застосунки",
    description: "Плитка коротко пояснює тип матеріалу або напрям роботи.",
    icon: "apps" as const,
  },
  {
    title: "Документація",
    description: "Текст має бути стислим і не дублювати заголовок.",
    icon: "layers" as const,
  },
  {
    title: "Захищений доступ",
    description: "Іконка використовується як допоміжний маркер, не як основний зміст.",
    icon: "lock" as const,
  },
  {
    title: "Каталогізація",
    description: "Сітка перебудовується в одну колонку на вузьких екранах.",
    icon: "grid" as const,
  },
];

export const colorTokens = [
  ["Base background", "#010102", "Фон сторінок і темних секцій."],
  ["Surface", "rgba(245, 248, 255, 0.035)", "Підкладки карток і технічних блоків."],
  ["Text primary", "#ffffff", "Заголовки і активний текст."],
  ["Text secondary", "#cccccc", "Описи, metadata, допоміжні підписи."],
  ["Action accent", "#f39200", "Головна дія, маркери секцій, focus."],
  ["Border", "#272727", "Розділювачі та контури."],
  ["Light surface", "#f5f8ff", "Світлий header/footer."],
  ["Light text", "#122238", "Текст на світлому фоні."],
] as const;

export const spacingTokens = [
  ["space-1", "4px"],
  ["space-2", "8px"],
  ["space-3", "12px"],
  ["space-4", "16px"],
  ["space-5", "20px"],
  ["space-6", "24px"],
  ["space-8", "32px"],
  ["space-10", "48px"],
  ["space-12", "64px"],
  ["space-14", "96px"],
] as const;
