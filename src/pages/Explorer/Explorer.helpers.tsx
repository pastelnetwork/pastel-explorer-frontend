import themeVariant from '@theme/variants';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';

import { Chip } from '@material-ui/core';

const MOCKED_VALUES = [3495, 234, 3289];

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
              label={formatNumber(MOCKED_VALUES[0])}
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
              label={formatNumber(MOCKED_VALUES[1])}
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
              label={formatNumber(MOCKED_VALUES[2])}
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
        data: MOCKED_VALUES,
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
