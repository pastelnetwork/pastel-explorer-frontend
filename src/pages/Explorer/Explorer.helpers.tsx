import themeVariant from '@theme/variants';

import { Chip } from '@material-ui/core';

export const mockChartTableData = {
  headers: [
    { id: 1, header: 'Statistic' },
    { id: 2, header: 'Value' },
  ],
  rows: [
    {
      id: 1,
      data: [
        { id: 1, value: 'Active' },
        {
          id: 2,
          value: (
            <Chip
              label={3495}
              style={{
                backgroundColor: themeVariant.palette.secondary.main,
                color: themeVariant.palette.secondary.contrastText,
              }}
            />
          ),
        },
      ],
    },
    {
      id: 2,
      data: [
        { id: 1, value: 'Inactives' },
        {
          id: 2,
          value: (
            <Chip
              label={234}
              style={{
                backgroundColor: themeVariant.custom.red.main,
                color: themeVariant.palette.secondary.contrastText,
              }}
            />
          ),
        },
      ],
    },
    {
      id: 3,
      data: [
        { id: 1, value: 'Unique IPs' },
        {
          id: 2,
          value: (
            <Chip
              label={3289}
              style={{
                backgroundColor: themeVariant.palette.primary.main,
                color: themeVariant.palette.secondary.contrastText,
              }}
            />
          ),
        },
      ],
    },
  ],
  data: {
    labels: ['Active', 'Inactives', 'Unique IPs'],
    datasets: [
      {
        data: [3495, 234, 3289],
        backgroundColor: [
          themeVariant.palette.secondary.main,
          themeVariant.custom.red.main,
          themeVariant.palette.primary.main,
        ],
        borderWidth: 5,
        borderColor: themeVariant.palette.background.paper,
      },
    ],
  },
};

export const mockMapMarkers = [
  {
    latLng: [52.237049, 21.017532],
    name: 'Warsaw',
  },
  {
    latLng: [39.904202, 116.407394],
    name: 'Beijing (9)',
  },
  {
    latLng: [28.70406, 77.102493],
    name: 'Delhi',
  },
  {
    latLng: [41.00824, 28.978359],
    name: 'Istanbul',
  },
  {
    latLng: [40.7127837, -74.0059413],
    name: 'New York',
  },
  {
    latLng: [34.052235, -118.243683],
    name: 'Los Angeles',
  },
  {
    latLng: [41.878113, -87.629799],
    name: 'Chicago',
  },
  {
    latLng: [51.507351, -0.127758],
    name: 'London',
  },
  {
    latLng: [55.755825, 37.617298],
    name: 'Moscow',
  },
  {
    latLng: [40.416775, -3.70379],
    name: 'Madrid',
  },
];
