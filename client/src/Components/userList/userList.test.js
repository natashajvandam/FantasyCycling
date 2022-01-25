/* eslint-disable */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserList from './userList';

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

test('renders content', () => {
  const { container } = render(
    <UserList userList={mockData} userData={mockData[0]} />,
    {
      wrapper: MemoryRouter,
    }
  );

  expect(container.firstChild).toHaveClass('user_list');
});

test('renders Loading on empty list', () => {
  render(<UserList userList={[]} userData={mockData[0]} />, {
    wrapper: MemoryRouter,
  });

  screen.getByText('loading...');
});

test('Handles invalid props', () => {
  const { container } = render(<UserList userList={null} userData={null} />, {
    wrapper: MemoryRouter,
  });

  expect(container.getElementsByClassName('user_list').children.length).toBe(1);
});
