import { MarkerProps } from '@components/Map/Map';
import themeVariant from '@theme/variants';

export const generateMapOptions = (geoLocationList: Array<MarkerProps> | null) => {
  return {
    onMarkerTipShow: (event: Event, label: Array<HTMLElement>, code: number) => {
      const isSupernode = geoLocationList && geoLocationList[code].data[0].type === 'Supernode';
      label[0].setAttribute(
        'style',
        `background-color: ${isSupernode ? themeVariant.map.masternode : themeVariant.map.peer}`,
      );
    },
    onRegionTipShow: () => false,
  };
};
