import * as React from 'react';
import { useSelector } from 'react-redux';
import { getThemeState } from '@redux/reducers/appThemeReducer';
import {
  CHART_THEME_BACKGROUND_DEFAULT_COLOR,
  CHART_THEME_BACKGROUND_DEFAULT_COLOR_LIGHT,
  themes,
} from '@utils/constants/statistics';
import { TThemeColor } from '@utils/constants/types';

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

export function useBackgroundChart(): [string, (_color: string) => void] {
  const [bgColor, setBgColor] = React.useState<string>('');
  const { darkMode } = useSelector(getThemeState);
  React.useEffect(() => {
    if (darkMode) {
      setBgColor(CHART_THEME_BACKGROUND_DEFAULT_COLOR);
    } else {
      setBgColor(CHART_THEME_BACKGROUND_DEFAULT_COLOR_LIGHT);
    }
  }, [darkMode]);
  const handleBgColorChange = React.useCallback((color: string) => {
    setBgColor(color);
  }, []);
  return [bgColor, handleBgColorChange];
}

export function useUpdatChartTheme(): [TThemeColor | null, React.Dispatch<TThemeColor>] {
  const [currentTheme, setCurrentTheme] = React.useState<TThemeColor | null>(null);
  const { darkMode } = useSelector(getThemeState);
  React.useEffect(() => {
    if (darkMode) {
      setCurrentTheme(themes[0]);
    } else {
      setCurrentTheme(themes[2]);
    }
  }, [darkMode]);
  return [currentTheme, setCurrentTheme];
}
