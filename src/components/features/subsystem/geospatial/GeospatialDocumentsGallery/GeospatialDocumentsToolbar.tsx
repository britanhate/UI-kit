import styles from "./GeospatialDocumentsGallery.module.css";

type GeospatialDocumentsToolbarProps = {
  query: string;
  selectedType: string;
  itemTypes: string[];
  filteredCount: number;
  totalCount: number;
  onQueryChange: (value: string) => void;
  onTypeChange: (value: string) => void;
};

export function GeospatialDocumentsToolbar({
  query,
  selectedType,
  itemTypes,
  filteredCount,
  totalCount,
  onQueryChange,
  onTypeChange,
}: GeospatialDocumentsToolbarProps) {
  return (
    <>
      <div className={styles.toolbar}>
        <label className={styles.searchLabel}>
          <span>Пошук</span>

          <input
            aria-label="Пошук документів"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Назва, опис, тег або тип матеріалу"
            type="search"
          />
        </label>

        <label className={styles.filterLabel}>
          <span>Тип</span>

          <span className={styles.selectWrap}>
            <select
              aria-label="Тип матеріалу"
              value={selectedType}
              onChange={(event) => onTypeChange(event.target.value)}
            >
              <option value="all">Усі типи</option>

              {itemTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </span>
        </label>
      </div>

      <output className={styles.summary} aria-live="polite" aria-atomic="true">
        Показано {filteredCount} з {totalCount}
      </output>
    </>
  );
}
