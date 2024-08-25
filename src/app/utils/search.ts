export function search<T>(
    items: T[],
    searchTerm: string,
    ...keys: (keyof T)[]
  ): T[] {
    searchTerm = searchTerm.toLowerCase();
  
    if (searchTerm) {
      return items.filter((item) =>
        keys.some((key) =>
          (item[key] as unknown as string).toLowerCase().includes(searchTerm)
        )
      );
    } else {
      return [...items];
    }
  }