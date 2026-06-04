export type ArcgisCardOverride = {
  imageUrl?: string;
  title?: string;
  description?: string;
  order?: number;
};

export const arcgisCardOverrides: Record<string, ArcgisCardOverride> = {
  "d287df3de2ff483e934270c8a938cf73": {
    imageUrl: "/images/geoportal/app-card.webp",
    description: "цей текст буде показаний замість опису елемента з ArcGIS, який може бути відсутнім або неінформативним. Його можна змінювати в /src/config/arcgis-card-overrides.ts",
    order: 10,
  },
};

export function getArcgisCardOverride(itemId: string) {
  return arcgisCardOverrides[itemId];
}
