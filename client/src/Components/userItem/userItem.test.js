/* eslint-disable */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserItem from './userItem';
import { prettyDOM } from '@testing-library/dom';

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

test('renders correct content', () => {
  render(<UserItem user={mockData[0]} topScore={500} self={false} />, {
    wrapper: MemoryRouter,
  });

  screen.getByText(mockData[0].nickname);
  screen.getByText(mockData[0].score);
});

test('renders correct attributes on self username', () => {
  const { container } = render(
    <UserItem user={mockData[0]} topScore={500} self={true} />,
    {
      wrapper: MemoryRouter,
    }
  );

  console.log(prettyDOM(container));

  expect(container.getElementsByClassName('user_item_myName').length).toBe(1);
});

test('Handles invalid props', () => {
  const { container } = render(
    <UserItem user={null} topScore={null} self={null} />,
    {
      wrapper: MemoryRouter,
    }
  );

  expect(container.getElementsByClassName('league_page').children.length).toBe(
    1
  );
});
