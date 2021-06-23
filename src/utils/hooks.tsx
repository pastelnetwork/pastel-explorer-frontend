import * as React from 'react';

interface IUseSortDataProps<T> {
  fetchData?: () => Promise<{ data: T[] } | undefined>;
  inititalData?: T[] | null;
}
export function useSortData<T>({
  fetchData,
  inititalData = null,
}: IUseSortDataProps<T>): [
  T[] | null,
  (_event: React.MouseEvent<HTMLTableHeaderCellElement>) => void,
] {
  const [list, setList] = React.useState<T[] | null>(inititalData);

  const [sort, setSort] = React.useState<{ sortBy: string | null; sortDirection: number }>({
    sortBy: null,
    sortDirection: 1,
  });

  React.useEffect(() => {
    if (!list) {
      if (fetchData) {
        fetchData().then(response => {
          if (response && response.data) {
            setList(response.data || []);
          }
        });
      }
      if (inititalData && inititalData.length) {
        setList(inititalData);
      }
    }
  }, [fetchData, inititalData]);

  const data = React.useMemo<T[] | null>(() => {
    if (sort.sortBy && list && list.length) {
      const newList = [...list];
      const sortBy = sort.sortBy as keyof T;
      newList.sort((a: T, b: T) => {
        let keyA = (a[sortBy] as unknown) as string | number;
        let keyB = (b[sortBy] as unknown) as string | number;
        if (typeof keyA === 'string' && typeof keyB === 'string') {
          keyA = keyA.toUpperCase();
          keyB = keyB.toUpperCase();
        }

        if (sort.sortDirection === 1) {
          return keyA > keyB ? 1 : -1;
        }
        return keyA > keyB ? -1 : 1;
      });
      return newList;
    }
    return list;
  }, [list, sort.sortBy, sort.sortDirection]);

  const handleClickSort = React.useCallback(
    (event: React.MouseEvent<HTMLTableHeaderCellElement>) => {
      const { id } = event.currentTarget.dataset as { id: string };
      setSort(prev => {
        const newSort = { ...prev };
        if (!newSort.sortBy) {
          newSort.sortBy = id;
          return newSort;
        }
        if (newSort.sortBy !== id) {
          return { sortBy: id, sortDirection: 1 };
        }
        newSort.sortDirection = newSort.sortDirection === 0 ? 1 : 0;
        return newSort;
      });
    },
    [],
  );
  return [data, handleClickSort];
}
