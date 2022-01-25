import { expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom'
import Home from './home';
import '@testing-library/jest-dom/extend-expect'
import { useAuth0 } from '@auth0/auth0-react';

jest.mock('../../Components/list/list', () => () => <div data-testid="list" />)
jest.mock('@auth0/auth0-react')
jest.mock('../../Components/header/header', () => () => <div data-testid="header" />)

const user = {
  email: "johndoe@me.com",
  email_verified: true,
  nickname: 'john'
};

const mock = {
  setSearchList: jest.fn(),
  riderList: [],
  booleanObj: {},
  searchList: jest.fn(),
  setBooleanObj: jest.fn()
}
describe('Home conponent tests', () => {

  describe("Athenticated user", () => {

    beforeEach(() => {
      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn()
      });
    });

    it('Header should render on page', () => {
      render(<Home  setSearchList={mock.setSearchList}
                  riderList={mock.riderList}
                  searchList={mock.searchList}
                  booleanObj={mock.booleanObj}
                  setBooleanObj={mock.setBooleanObj}/>, { wrapper: MemoryRouter })
      expect(screen.getByTestId(/header/)).toBeInTheDocument()
    })

    it("should render two lists if user is authenticated", () => {
      render(<Home  setSearchList={mock.setSearchList}
                  riderList={mock.riderList}
                  searchList={mock.searchList}
                  booleanObj={mock.booleanObj}
                  setBooleanObj={mock.setBooleanObj}/>, { wrapper: MemoryRouter })
      expect(screen.getAllByTestId(/list/)).toHaveLength(2)
    })

    it("should have users name as label for first list", () => {
      render(<Home  setSearchList={mock.setSearchList}
                  riderList={mock.riderList}
                  searchList={mock.searchList}
                  booleanObj={mock.booleanObj}
                  setBooleanObj={mock.setBooleanObj}/>, { wrapper: MemoryRouter })
      expect(screen.getByText(user.nickname)).toBeInTheDocument()
    })
    it("should have pro cycling riders as label for second list", () => {
      render(<Home  setSearchList={mock.setSearchList}
                  riderList={mock.riderList}
                  searchList={mock.searchList}
                  booleanObj={mock.booleanObj}
                  setBooleanObj={mock.setBooleanObj}/>, { wrapper: MemoryRouter })
      expect(screen.getByText('pro cycling riders')).toBeInTheDocument()
    })

    it("should have a search bar", () => {
      const view = render(<Home  setSearchList={mock.setSearchList}
                  riderList={mock.riderList}
                  searchList={mock.searchList}
                  booleanObj={mock.booleanObj}
                  setBooleanObj={mock.setBooleanObj}/>, { wrapper: MemoryRouter })
    expect(screen.getByPlaceholderText(/search/)).toBeInTheDocument(view.container)
    })
  })

  describe("User not authenticated", () => {

    beforeEach(() => {
      useAuth0.mockReturnValue({
        isAuthenticated: false,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn()
      });
    });

    it('should not display lists', () => {
const view = render(<Home  setSearchList={mock.setSearchList}
                  riderList={mock.riderList}
                  searchList={mock.searchList}
                  booleanObj={mock.booleanObj}
                  setBooleanObj={mock.setBooleanObj}/>, { wrapper: MemoryRouter })

      expect(screen.getByText('User not authenticated')).toBeInTheDocument(view.container)
    })
  })
})