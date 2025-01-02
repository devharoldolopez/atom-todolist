import { LocalStorageUtil } from "./local-storage.util";

describe('LocalStorageUtil', () => {

  const testKey = 'test';
  const testValue = 'test value';

  afterEach(() => {
    localStorage.clear();
  });

  it('should save and get data', () => {
    LocalStorageUtil.save<string>(testKey, testValue);
    expect(localStorage.getItem(testKey)).toEqual(JSON.stringify(testValue));
  });

  it('should get data', () => {
    localStorage.setItem(testKey, JSON.stringify(testValue));
    LocalStorageUtil.get<string>(testKey);
    expect(localStorage.getItem(testKey)).toEqual(JSON.stringify(testValue));
  });

  it('should remove data', () => {
    localStorage.setItem(testKey, JSON.stringify(testValue));
    LocalStorageUtil.remove(testKey);
    expect(localStorage.getItem(testKey)).toBeNull();
  });

  it('should clear data', () => {
    localStorage.setItem(testKey, JSON.stringify(testValue));
    LocalStorageUtil.clear();
    expect(localStorage.getItem(testKey)).toBeNull();
  });

});