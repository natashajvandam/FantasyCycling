/* eslint-disable */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserItem from './userItem';

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

describe('User Item component', () => {

  it('should not render any data if an invalid prop is passed', () => {
    const { container } = render(
      <UserItem user={null} topScore={null} self={null} />,
      {
        wrapper: MemoryRouter,
      }
    );
    expect(container.getElementsByClassName('league_page').children).toBeFalsy()
  });

  describe('if self attribute if false', () => {

    it('should render correct nickname', () => {
      render(<UserItem user={mockData[0]} topScore={500} self={false} />, {
        wrapper: MemoryRouter,
      });
      screen.getByText(mockData[0].nickname);
    });

    it('should render correct score', () => {
      render(<UserItem user={mockData[0]} topScore={500} self={false} />, {
        wrapper: MemoryRouter,
      });

      screen.getByText(mockData[0].score);
    });
  })

  describe('If self attribute is true', ()=> {
    it('should apply correct styling on self username', () => {
    const { container } = render(
      <UserItem user={mockData[0]} topScore={500} self={true} />,
      {
        wrapper: MemoryRouter,
      }
    );
    expect(container.getElementsByClassName('user_item_myName').length).toBe(1);
  });
  })
})
