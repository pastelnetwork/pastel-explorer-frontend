import { TFunction } from 'i18next';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MyMockType = jest.Mock<any, any, any> &
  TFunction<['translation', ...string[]], undefined>;
