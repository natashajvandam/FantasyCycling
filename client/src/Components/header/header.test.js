import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Header from './header';
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

const mockLink = ['home', 'league'];

describe("Header component", () => {

  it('should render the app name', () => {
    const view = render(
      <Header userData={mockData[0]} link_route={mockLink[0]} />,
      {wrapper: MemoryRouter}
    );
    expect(view.container).toHaveTextContent('Granny Gear Groupetto');
  });

  it('should still render app name if invalid props passed', () => {
    let view = render(<Header userData={null} link_route={null} />, {
      wrapper: MemoryRouter,
    });

    expect(view.container).toHaveTextContent('Granny Gear Groupetto');

    view = render(<Header userData={undefined} link_route={undefined} />, {
      wrapper: MemoryRouter,
    });

    expect(view.container).toHaveTextContent('Granny Gear Groupetto');

    view = render(<Header userData={mockData[0]} link_route={undefined} />, {
      wrapper: MemoryRouter,
    });

    expect(view.container).toHaveTextContent('Granny Gear Groupetto');

    view = render(<Header userData={undefined} link_route={mockLink[0]} />, {
      wrapper: MemoryRouter,
    });

    expect(view.container).toHaveTextContent('Granny Gear Groupetto');
  });


    it('should render correct user nickname', () => {
      render(<Header userData={mockData[0]} link_route={mockLink[0]} />, {
        wrapper: MemoryRouter,
      });
      screen.getByText(mockData[0].nickname);
    });
    it('should render correct user money', () => {
      render(<Header userData={mockData[0]} link_route={mockLink[0]} />, {
        wrapper: MemoryRouter,
      });
      screen.getByText('€ ' + mockData[0].money);
    });
    it('should render correct user score', () => {
      render(<Header userData={mockData[0]} link_route={mockLink[0]} />, {
        wrapper: MemoryRouter,
      });
      screen.getByText(mockData[0].score + ' pts');
    });

})
