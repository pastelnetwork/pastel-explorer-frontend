import { useState, useEffect, ChangeEvent, useRef } from 'react';

import ExplorerMap from '@pages/Explorer/ExplorerMap/ExplorerMap';
import SupernodeStatistics from '@pages/Explorer/SupernodeStatistics/SupernodeStatistics';
import InfinityTable, { RowsProps } from '@components/InfinityTable/InfinityTable';
import { INetworkSupernodes } from '@utils/types/INetwork';
import { formatNumber } from '@utils/helpers/formatNumbers/formatNumbers';
import { Dropdown, OptionsProps } from '@components/Dropdown/Dropdown';
import useSupernodes from '@hooks/useSupernodes';
import { translate } from '@utils/helpers/i18n';

import { columns } from './Supernodes.columns';
import {
  transformSupernodesData,
  STATUS_LIST,
  getCsvHeaders,
  getCsvData,
} from './Supernodes.helpers';
import * as Styles from './Supernodes.styles';

const Supernodes: React.FC = () => {
  const downloadRef = useRef(null);
  const { masternodes, isLoading } = useSupernodes();
  const [status, setStatus] = useState<string>(STATUS_LIST[0].value);
  const [supernodes, setSupernodes] = useState<Array<RowsProps>>([]);
  const [originalSupernodes, setOriginalSupernodes] = useState<Array<INetworkSupernodes>>([]);
  const [currentSupernodes, setCurrentSupernodes] = useState<Array<INetworkSupernodes>>([]);
  const [innerWidth, setInnerWidth] = useState(0);

  const handleShowSubMenu = () => {
    setInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    if (masternodes?.length) {
      setSupernodes(transformSupernodesData(masternodes));
      setOriginalSupernodes(masternodes);
      setCurrentSupernodes(masternodes);
    }
  }, [isLoading, masternodes]);

  useEffect(() => {
    handleShowSubMenu();

    window.addEventListener('resize', handleShowSubMenu);
    return () => {
      window.removeEventListener('resize', handleShowSubMenu);
    };
  }, []);

  const handleChange = (
    event: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    if (event.target.value) {
      setStatus(event.target.value as string);
      let newSupernodes: Array<{
        ip: JSX.Element;
      }> = [];
      if (event.target.value !== 'all') {
        newSupernodes = transformSupernodesData(
          originalSupernodes.filter(s => s.status === event.target.value),
        );
        setCurrentSupernodes(originalSupernodes.filter(s => s.status === event.target.value));
      } else {
        newSupernodes = transformSupernodesData(originalSupernodes);
        setCurrentSupernodes(originalSupernodes);
      }

      setSupernodes(newSupernodes);
    }
  };

  const generateStatusOptions = () => {
    const results: OptionsProps[] = [];
    STATUS_LIST.map((item: OptionsProps) => {
      let total = originalSupernodes.filter((i: INetworkSupernodes) => i.status === item.value)
        .length;
      if (item.value === 'all') {
        total = originalSupernodes.length;
      }
      return results.push({
        value: item.value,
        name: `${translate(item.name)} (${total})`,
      });
    });

    return results;
  };

  const getSupernodeTitle = () => (
    <Styles.TitleContainer>
      <Styles.TitleWrapper>
        <Styles.Title>{translate('pages.supernodes.supernodeList')}</Styles.Title>{' '}
        {supernodes.length > 0 ? (
          <Styles.SubTitle>
            (
            {translate('pages.supernodes.totalSupernodes', {
              total: formatNumber(originalSupernodes.length),
            })}
            )
          </Styles.SubTitle>
        ) : null}
      </Styles.TitleWrapper>
      <Styles.FilterBlock>
        <Dropdown
          value={status}
          onChange={handleChange}
          options={generateStatusOptions()}
          label={translate('pages.supernodes.supernodeStatus')}
          classNameWrapper="supernode-status"
        />
        <Styles.CSVLinkButton
          data={getCsvData(currentSupernodes)}
          filename="supernode_list.csv"
          headers={getCsvHeaders()}
          separator=","
          ref={downloadRef}
          className="download"
        >
          {translate('pages.historicalStatistics.downloadCSV')}
        </Styles.CSVLinkButton>
      </Styles.FilterBlock>
    </Styles.TitleContainer>
  );

  const getHeight = () => {
    if (innerWidth < 600) {
      return {
        table: 660 * (supernodes.length + 1),
        row: 660,
      };
    }
    if (innerWidth < 960) {
      return {
        table: 354 * (supernodes.length + 1),
        row: 354,
      };
    }

    return {
      table: 180 * (supernodes.length + 1),
      row: 180,
    };
  };

  return (
    <>
      <Styles.Gird>
        <Styles.ExplorerMapColumn>
          <ExplorerMap hidePeer />
        </Styles.ExplorerMapColumn>
        <Styles.SupernodeColumn>
          <SupernodeStatistics />
        </Styles.SupernodeColumn>
      </Styles.Gird>
      <Styles.BlockWrapper>
        <Styles.GridWrapper item>
          <InfinityTable
            title={getSupernodeTitle()}
            rows={supernodes}
            columns={columns}
            tableHeight={getHeight().table}
            disableLoading
            renderAllRows
            className="supernode-table"
            headerBackground
            rowHeight={getHeight().row}
            isLoading={isLoading}
          />
        </Styles.GridWrapper>
      </Styles.BlockWrapper>
    </>
  );
};

export default Supernodes;
