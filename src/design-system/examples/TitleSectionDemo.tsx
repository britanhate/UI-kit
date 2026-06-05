import { TitleSection } from "@/components/features/shared/TitleSection";

export function TitleSectionDemo() {
  return (
    <TitleSection
      title="Назва сторінки або великого розділу"
      subtitle="Короткий опис, який пояснює зміст сторінки. Один-два рядки без зайвої деталізації."
      backgroundImage="/images/sections/main-title-bg.webp"
    />
  );
}
