import { getURLSearchString } from './query';

describe('getURLSearchString', () => {
  it('empty search string', () => {
    expect(getURLSearchString('', { limit: 10, offset: 10 })).toEqual('?limit=10&offset=10');
  });

  it('appending to search string', () => {
    expect(getURLSearchString('?param1=value', { limit: 10, offset: 10 })).toEqual('?param1=value&limit=10&offset=10');
  });

  it('replacing search values', () => {
    expect(getURLSearchString('?offset=999&param1=value', { limit: 10, offset: 10 })).toEqual('?param1=value&limit=10&offset=10');
  });

  it('clearing empty values', () => {
    expect(getURLSearchString('?offset=10', { offset: 0 })).toEqual('?');
  });
});
