export type FooterContactGroupConfig = {
  title: string;
  description?: string;
  emails: string[];
  phones: string[];
};

export type FooterContactConfig = {
  title: string;
  description?: string;
  groups: FooterContactGroupConfig[];
};

export type FooterLinkConfig = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type FooterVariant = "landing" | "platform";

export const footerBrand = {
  title: 'ІКС "Геоінформаційна система МОУ"',
  mark: "𝑨",
};

export const footerLegal = {
  prefix: `© ${new Date().getFullYear()} Контент доступний за ліцензією`,
  licenseLabel: "Creative Commons Attribution 4.0 International",
  licenseHref: "https://creativecommons.org/licenses/by/4.0/deed.uk",
  suffix: ", якщо не зазначено інше.",
};

export const footerLinks: FooterLinkConfig[] = [
  {
    label: "МОУ",
    href: "https://mod.gov.ua/",
    ariaLabel: "Міністерство оборони України",
  },
  {
    label: "ЗСУ",
    href: "https://www.zsu.gov.ua/",
    ariaLabel: "Збройні сили України",
  },
  {
    label: "КСП",
    href: "https://www.facebook.com/ksp.uaf",
    ariaLabel: "Командування Сил підтримки",
  },
];

export const footerContacts: Record<FooterVariant, FooterContactConfig> = {
  landing: {
    title: "Контакти",
    description: "Оберіть напрям звернення, щоб швидко зв’язатися з відповідальною групою.",
    groups: [
      {
        title: "Підключення",
        description: "Питання щодо підключення користувачів, доступу до платформи та первинної реєстрації.",
        emails: ["user-support@mil.ua"],
        phones: ["+380 00 000 00 00"],
      },
      {
        title: "Робота сайту",
        description: "Помилки інтерфейсу, некоректне відображення сторінок або проблеми з навігацією.",
        emails: ["site-support@mil.ua"],
        phones: ["+380 00 000 00 02"],
      },
      {
        title: "Робота сервісів",
        description:
          "Проблеми з картографічними сервісами, шарами, застосунками або доступом до ресурсів ArcGIS Enterprise.",
        emails: ["services-support@mil.ua"],
        phones: ["+380 00 000 00 03"],
      },
      {
        title: "Співпраця",
        description: "Пропозиції щодо обміну даними, інтеграції, розвитку підсистем або міжвідомчої взаємодії.",
        emails: ["cooperation@mil.ua"],
        phones: ["+380 00 000 00 04"],
      },
    ],
  },

  platform: {
    title: "Контакти підтримки",
    description: "Оберіть напрям звернення відповідно до типу питання або проблеми.",
    groups: [
      {
        title: "Підключення",
        description: "Доступ користувачів, облікові записи, права та первинне підключення до платформи.",
        emails: ["user-support"],
        phones: ["+380 00 000 00 00"],
      },
      {
        title: "Робота сайту",
        description:
          "Некоректна робота сторінок, помилки інтерфейсу, проблеми з переходами або відображенням контенту.",
        emails: ["platform@mil.ua"],
        phones: ["+380 00 000 00 01"],
      },
      {
        title: "Робота сервісів",
        description: "Проблеми з веб-картами, шарами, сервісами, застосунками або матеріалами ArcGIS Enterprise.",
        emails: ["services-support@mil.ua"],
        phones: ["+380 00 000 00 03"],
      },
      {
        title: "Співпраця",
        description: "Питання щодо взаємодії, розвитку геоінформаційних сервісів та інтеграції даних.",
        emails: ["cooperation@mil.ua"],
        phones: ["+380 00 000 00 04"],
      },
    ],
  },
};
