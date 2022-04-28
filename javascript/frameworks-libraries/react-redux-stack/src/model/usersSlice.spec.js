import usersReducer, { addUser, clear } from './usersSlice';

describe('usersSlice', () => {
  const initialState = {value: ['@a', '@b', '@c']};

  it('should have initial state', () => {
    expect(usersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addUser', () => {
    const actual = usersReducer({value:[]}, addUser('Santa'));
    expect(actual.value).toEqual(['Santa']);
  });

  it('should handle clear', () => {
    const actual = usersReducer(initialState, clear());
    expect(actual.value).toEqual([]);
  });
});
