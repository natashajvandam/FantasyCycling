import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import League from './league';
import { MemoryRouter } from 'react-router-dom';

const mockData = [
  {
    id: 8,
    email: 'john@john.com',
    nickname: 'john',
    score: 500,
    money: 200,
  },
  {
    id: 6,
    email: 'test1234@gmail.com',
    nickname: 'test1234',
    score: 0,
    money: 380,
  },
  {
    id: 11,
    email: 'undefined',
    nickname: 'undefined',
    score: 0,
    money: 500,
  },
];

describe('League component', () => {
  it('should render content', () => {
  const view = render(<League userList={mockData} />, {
    wrapper: MemoryRouter,
  });

  expect(view.container).toHaveTextContent('fantacy league');
});
})

