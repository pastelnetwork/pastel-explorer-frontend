export const options = {
  maintainAspectRatio: false,
  legend: {
    display: true,
  },
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
  },
  scales: {
    xAxes: [
      {
        reverse: true,
        gridLines: {
          color: 'rgba(0,0,0,0.05)',
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          stepSize: 500,
        },
        display: true,
        borderDash: [5, 5],
        gridLines: {
          color: 'rgba(0,0,0,0)',
          fontColor: '#fff',
        },
      },
    ],
  },
};
