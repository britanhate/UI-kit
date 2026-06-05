import { MainHero } from "@/components/features/shared/MainHero";

export function HeroDemo() {
  return (
    <MainHero
      title="Назва сторінки або сервісу"
      subtitle="Коротке пояснення призначення сторінки, сервісу або розділу. Один компактний абзац."
      ctaHref="#"
      ctaLabel="Основна дія"
    />
  );
}
