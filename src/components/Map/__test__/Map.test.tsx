import { shallow } from 'enzyme';

import 'jest-styled-components';

import Map, { MarkerProps } from '../Map';

describe('components/Map', () => {
  const markers = [
    {
      latLng: [39.9625, -83.0061],
      name: 'United States - Columbus (Peer(s): 1, Supernode(s): 1)',
      style: {
        fill: '#000',
        stroke: '#279989',
      },
      data: [
        {
          type: 'Peer',
          country: 'United States',
          city: 'Columbus',
          id: 'f34a34b3-bf49-4323-8cdf-34c270dd1bec',
          ip: '18.118.218.206',
        },
        {
          type: 'Supernode',
          country: 'United States',
          city: 'Columbus',
          id: '8c939e2b-09c7-4df1-a034-c951bfe8c695',
          ip: '52.15.244.16',
        },
      ],
    },
    {
      latLng: [51.1878, 6.8607],
      name: 'Germany - Düsseldorf (Peer(s): 2)',
      style: {
        fill: '#279989',
        stroke: '#279989',
      },
      data: [
        {
          type: 'Peer',
          country: 'Germany',
          city: 'Düsseldorf',
          id: 'c4b9a89e-1736-4c3e-ae11-9813a055e97a',
          ip: '38.242.134.66',
        },
        {
          type: 'Peer',
          country: 'Germany',
          city: 'Düsseldorf',
          id: 'f2d4b69c-c9c9-48b3-8e62-0f65cba444b2',
          ip: '109.205.181.92',
        },
      ],
    },
  ];
  const wrapper = shallow(
    <Map title="Lorem ipsum dolor sit amet" markers={markers as MarkerProps[]} />,
  );

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
