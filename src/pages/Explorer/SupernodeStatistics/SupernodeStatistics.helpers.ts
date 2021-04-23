import { HeaderType } from '@components/Table/Table';

import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { INetworkMasternodes } from '@utils/types/INetwork';

import themeVariant from '@theme/variants';

interface CountryObject {
  [key: string]: number;
}

export interface CountryList {
  totalQuantity: number;
  chartData: {
    headers: Array<string>;
    quantities: Array<number>;
  };
  tableData: {
    name: string;
    quantity: number;
    percentage: string;
  }[];
}

export const headers: Array<HeaderType> = [
  { id: 1, header: 'Country' },
  { id: 2, header: 'Quantity' },
  { id: 3, header: '%' },
];

export const generateChartData = (labels: Array<string>, data: Array<number>) => {
  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: [
          themeVariant.palette.primary.main,
          themeVariant.palette.secondary.main,
          themeVariant.custom.green.light,
          themeVariant.custom.red.light,
          themeVariant.custom.orange.light,
          themeVariant.custom.green.dark,
          themeVariant.custom.red.dark,
          themeVariant.custom.orange.dark,
        ],
        borderWidth: 5,
        borderColor: themeVariant.palette.background.paper,
      },
    ],
  };
};

const generateSortedList = (list: CountryObject) => {
  return Object.entries(list).sort(([, valueA], [, valueB]) => {
    if (valueA < valueB) return 1;
    if (valueA > valueB) return -1;
    return 0;
  });
};

const generateNarrowedCountryList = (list: [string, number][], quantity: number) => {
  return list.map(([country, value]) => {
    return {
      name: country,
      quantity: value,
      percentage: formatNumber((value / quantity) * 100, { decimalsLength: 2 }),
    };
  });
};

const generateOtherCountryList = (list: [string, number][], quantity: number) => {
  const otherCountryQuantity = list.reduce((acc, [, value]) => acc + value, 0);

  return {
    name: 'Other',
    quantity: otherCountryQuantity,
    percentage: formatNumber((otherCountryQuantity / quantity) * 100, { decimalsLength: 2 }),
  };
};

const generateCountryChartData = (tableData: CountryList['tableData']) => {
  return tableData.reduce(
    (acc: { headers: string[]; quantities: number[] }, { name, quantity }) => {
      acc.headers.push(name);
      acc.quantities.push(quantity);
      return acc;
    },
    {
      headers: [],
      quantities: [],
    },
  );
};

const generateSortedNarrowedList = (list: CountryObject, narrowDepth: number) => {
  const countrySortedList = generateSortedList(list);
  const countriesQuantity = countrySortedList.reduce((acc, [, value]) => acc + value, 0);
  const displayCountryList = countrySortedList.slice(0, narrowDepth);
  const otherCountryList = countrySortedList.slice(narrowDepth);

  const countryList = generateNarrowedCountryList(displayCountryList, countriesQuantity);
  const otherList = generateOtherCountryList(otherCountryList, countriesQuantity);

  const tableData = otherList.quantity ? [...countryList, otherList] : countryList;
  const chartData = generateCountryChartData(tableData);

  return {
    totalQuantity: countriesQuantity,
    chartData,
    tableData,
  };
};

export const generateMasternodeCountriesList = (
  nodes: Array<INetworkMasternodes>,
  countryQuantity: number,
): CountryList => {
  const objectList = nodes.reduce((acc: CountryObject, { country }) => {
    return {
      ...acc,
      [country]: acc[country] + 1 || 1,
    };
  }, {});

  return generateSortedNarrowedList(objectList, countryQuantity);
};
