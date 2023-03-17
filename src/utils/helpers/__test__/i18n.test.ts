import i18n, { changeLanguage } from '../i18n';

describe('utils/helpers/i18n', () => {
  test('changeLanguage should works correctly', () => {
    const changeLanguageSpy = jest.spyOn(i18n, 'changeLanguage');

    changeLanguage('en');
    expect(changeLanguageSpy).toBeCalledTimes(1);
  });
});
