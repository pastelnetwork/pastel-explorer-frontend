import { useState } from 'react';
import parse from 'html-react-parser';
import { SelectChangeEvent } from '@mui/material/Select';

import { Dropdown, OptionsProps } from '@components/Dropdown/Dropdown';
import Input from '@components/Input/Input';
import { translate, translateDropdown } from '@utils/helpers/i18n';

import * as TableStyles from '@components/Table/Table.styles';
import * as PastelIdStyles from '@pages/Details/PastelIdDetails/PastelIdDetails.styles';
import * as SupernodesStyles from '@pages/Supernodes/Supernodes.styles';

import * as Styles from './NetworkChallengesAndSelfHealing.styles';
import { TYPE_OPTIONS } from './NetworkChallengesAndSelfHealing.helpers';
import SelfHealingTriggers from './SelfHealingTriggers';
import HealthCheckChallenges from './HealthCheckChallenges';
import StorageChallenges from './StorageChallenges';

const NetworkChallengesAndSelfHealing = () => {
  const [type, setType] = useState<string>(TYPE_OPTIONS[0].value);
  const [pastelID, setPastelID] = useState<string>('');

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const generateStatusOptions = () => {
    return TYPE_OPTIONS.map((item: OptionsProps) => ({
      value: item.value,
      name: translateDropdown(item.name),
    }));
  };

  const renderContent = () => {
    switch (type) {
      case TYPE_OPTIONS[1].value:
        return <HealthCheckChallenges pid={pastelID} />;
      case TYPE_OPTIONS[2].value:
        return <SelfHealingTriggers pid={pastelID} />;
      default:
        return <StorageChallenges pid={pastelID} />;
    }
  };

  return (
    <Styles.Wrapper>
      <SupernodesStyles.BlockWrapper>
        <SupernodesStyles.GridWrapper item>
          <TableStyles.BlockWrapper className="mb-0">
            <PastelIdStyles.BlockWrapper className="ticket-title-wrapper">
              <SupernodesStyles.TitleWrapper>
                <TableStyles.BlockTitle>
                  <SupernodesStyles.Title>
                    {parse(translate('pages.networkChallengesAndSelfHealing.pageTitle'))}
                  </SupernodesStyles.Title>
                </TableStyles.BlockTitle>
                <div className="filter-wrapper">
                  <Input
                    name="pId"
                    className="keyword"
                    placeholder={translateDropdown(
                      'pages.networkChallengesAndSelfHealing.enterPastelID',
                    )}
                    onEnter={setPastelID}
                    onBlur={setPastelID}
                  />
                  <Dropdown
                    value={type}
                    onChange={handleChange}
                    options={generateStatusOptions()}
                    label={translateDropdown('pages.networkChallengesAndSelfHealing.type')}
                    classNameWrapper="supernode-status"
                  />
                </div>
              </SupernodesStyles.TitleWrapper>
            </PastelIdStyles.BlockWrapper>
            <SupernodesStyles.ContentWrapper>{renderContent()}</SupernodesStyles.ContentWrapper>
          </TableStyles.BlockWrapper>
        </SupernodesStyles.GridWrapper>
      </SupernodesStyles.BlockWrapper>
    </Styles.Wrapper>
  );
};

export default NetworkChallengesAndSelfHealing;
