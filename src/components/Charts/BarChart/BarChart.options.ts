// import { lighten } from '@material-ui/core';
import themeVariant from '@theme/variants';

export const options = {
  maintainAspectRatio: false,
  tooltips: {
    intersect: false,
  },
  hover: {
    intersect: true,
  },
  plugins: {
    filler: {
      propagate: false,
    },
    legend: {
      display: false,
    },
  },
  scales: {
    // xAxes: [
    //   {
    //     reverse: true,
    //     gridLines: {
    //       color: lighten(themeVariant.custom.white, 0.05),
    //     },
    //   },
    // ],
    yAxes: [
      {
        ticks: {
          stepSize: 500,
        },
        display: true,
        borderDash: [5, 5],
        gridLines: {
          color: themeVariant.custom.white,
          fontColor: themeVariant.custom.black,
        },
      },
    ],
  },
};
