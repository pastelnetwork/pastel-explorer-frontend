export const lines = [
  'M80 286.763V280.437',
  'M158.967 286.763V280.437',
  'M239.92 286.763V280.437',
  'M319.877 286.763V280.437',
  'M400.836 286.763V280.437',
  'M482.789 286.763V280.437',
  'M562.744 286.763V280.437',
];

export const transform = ['8', '22', '35', '46', '60', '70'];
export const transformValue = ['8', '22', '35', '46', '74', '62'];

export const tspan = [
  {
    x: '72',
    y: '306.621',
  },
  {
    x: '149.967',
    y: '306.621',
  },
  {
    x: '231.92',
    y: '306.621',
  },
  {
    x: '307.877',
    y: '306.621',
  },
  {
    x: '392.836',
    y: '306.621',
  },
  {
    x: '468.789',
    y: '306.621',
  },
  {
    x: '550.744',
    y: '306.621',
  },
];

export const barLabel = [
  {
    x: '74.498',
    y: '266.367',
  },
  {
    x: '150.498',
    y: '266.367',
  },
  {
    x: '231.498',
    y: '266.367',
  },
  {
    x: '314.498',
    y: '266.367',
  },
  {
    x: '381.498',
    y: '266.367',
  },
  {
    x: '484.498',
    y: '266.367',
  },
  {
    x: '549.498',
    y: '266.367',
  },
];

type TCountryProps = {
  code: string;
  name: string;
};

const countriesList: TCountryProps[] = [
  {
    code: 'US',
    name: 'United States',
  },
  {
    code: 'DE',
    name: 'Germany',
  },
  {
    code: 'FR',
    name: 'France',
  },
  {
    code: 'CA',
    name: 'Canada',
  },
  {
    code: 'IN',
    name: 'India',
  },
  {
    code: 'Other',
    name: 'Other',
  },
];

export const generateCountries = (countries: string[]): string[] => {
  if (!countries?.length) {
    return [];
  }

  return countries.map(c => {
    const item = countriesList.find((it: TCountryProps) => it.name === c);

    return item?.code || '';
  });
};

export const bars = [
  [
    {
      fill: 'url(#paint0_linear_8260_41311)',
      path: 'M66 10C66 7.79087 67.7909 6 70 6H95C97.2091 6 99 7.79086 99 10V196H66V10Z',
    },
  ],
  [
    {
      fill: 'url(#paint1_linear_8260_41311)',
      path: 'M224 72C224 69.7909 225.791 68 228 68H253C255.209 68 257 69.7909 257 72V192H224V72Z',
    },
  ],
  [
    {
      fill: 'url(#paint2_linear_8260_41311)',
      path: 'M464 51C464 48.7909 465.791 47 468 47H493C495.209 47 497 48.7909 497 51V192H464V51Z',
    },
  ],
  [
    {
      fill: 'url(#paint3_linear_8260_41311)',
      path: 'M144 72C144 69.7909 145.791 68 148 68H173C175.209 68 177 69.7909 177 72V192H144V72Z',
    },
  ],
  [
    {
      fill: 'url(#paint4_linear_8260_41311)',
      path: 'M384 72C384 69.7909 385.791 68 388 68H413C415.209 68 417 69.7909 417 72V192H384V72Z',
    },
  ],
  [
    {
      fill: 'url(#paint5_linear_8260_41311)',
      path: 'M304 78C304 75.7909 305.791 74 308 74H333C335.209 74 337 75.7909 337 78V192H304V78Z',
    },
  ],
  [
    {
      fill: 'url(#paint6_linear_8260_41311)',
      path: 'M544 27C544 24.7909 545.791 23 548 23H573C575.209 23 577 24.7909 577 27V192H544V27Z',
    },
  ],
];

export const barsChart = [
  {
    x: '66',
    fill: 'url(#paint0_linear_8260_41311)',
  },
  {
    x: '160',
    fill: 'url(#paint1_linear_8260_41311)',
  },
  {
    x: '254',
    fill: 'url(#paint2_linear_8260_41311)',
  },
  {
    x: '344',
    fill: 'url(#paint3_linear_8260_41311)',
  },
  {
    x: '438',
    fill: 'url(#paint4_linear_8260_41311)',
  },
  {
    x: '532',
    fill: 'url(#paint5_linear_8260_41311)',
  },
  {
    x: '662',
    fill: 'url(#paint6_linear_8260_41311)',
  },
];

export const percentPosition = [
  {
    x: '17.6406',
    y: '283.405',
  },
  {
    x: '10.6406',
    y: '228.8',
  },
  {
    x: '10.6406',
    y: '174.6',
  },
  {
    x: '10.6406',
    y: '120.4',
  },
  {
    x: '10.6406',
    y: '66.2',
  },
  {
    x: '6.6406',
    y: '12',
  },
];

export const percentLine = [0, -54, -110, -164, -218, -272];
