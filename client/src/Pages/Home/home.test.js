import { expect } from '@jest/globals';
import { render, screen, waitFor} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom'
import Home from './home';
import '@testing-library/jest-dom/extend-expect'
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import * as API from '../../Services/apiService'


jest.mock('../../Components/list/list', () => () => <div data-testid="list" />)
jest.mock('@auth0/auth0-react')
jest.mock('../../Components/header/header', () => () => <div data-testid="header" />)
// jest.mock('../../Services/apiService', () => {
//   return {
//     fetchUserData: jest.fn(() => {
//     return Promise.resolve({
//        " id": 8,
//           "email": "john@john.com",
//             "nickname": "john",
//               "score": 500,
//                 "money": 200
//       })
//     }),
//     fetchUserRoster: jest.fn(() => {
//       return Promise.resolve([])
//     })
//    }
//  })


const user = {
  email: "john@john.com",
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

describe.only('Home conponent tests', () => {

  describe("Athenticated user", () => {

    beforeEach(() => {
      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
        getAccessTokenSilently: jest.fn()
      });
    });

    afterEach(() => {

    })

    it('Header should render on page', async () => {
        const spy = jest.spyOn(API, 'fetchUserRoster')
       render(<Home setSearchList={mock.setSearchList}
        riderList={mock.riderList}
        searchList={mock.searchList}
        booleanObj={mock.booleanObj}
         setBooleanObj={mock.setBooleanObj} />, { wrapper: MemoryRouter })
        await waitFor(()=>expect(spy).toHaveBeenCalled())
      const el = await screen.findByTestId(/header/)
      expect(el).toBeInTheDocument()



    })


    it("should render two lists if user is authenticated", async () => {
        const spy = jest.spyOn(API, 'fetchUserRoster')
       render(<Home setSearchList={mock.setSearchList}
        riderList={mock.riderList}
        searchList={mock.searchList}
        booleanObj={mock.booleanObj}
         setBooleanObj={mock.setBooleanObj} />, { wrapper: MemoryRouter })
        await waitFor(()=>expect(spy).toHaveBeenCalled())
    const el = await screen.findAllByTestId(/list/)
      expect(el).toHaveLength(2)



    })

    // it("should have users name as label for first list", async () => {
    //   render(<Home setSearchList={mock.setSearchList}
    //     riderList={mock.riderList}
    //     searchList={mock.searchList}
    //     booleanObj={mock.booleanObj}
    //     setBooleanObj={mock.setBooleanObj} />, { wrapper: MemoryRouter })
    //   const el = await screen.findByText(user.nickname)
    //   expect(el).toBeInTheDocument()

    // })

    // it("should have pro cycling riders as label for second list", async () => {
    //   render(<Home setSearchList={mock.setSearchList}
    //     riderList={mock.riderList}
    //     searchList={mock.searchList}
    //     booleanObj={mock.booleanObj}
    //     setBooleanObj={mock.setBooleanObj} />, { wrapper: MemoryRouter })
    //   const el = await screen.findByText('pro cycling riders')
    //   expect(el).toBeInTheDocument()

    // })

    // it("should have a search bar", async () => {
    //    render(<Home setSearchList={mock.setSearchList}
    //     riderList={mock.riderList}
    //     searchList={mock.searchList}
    //     booleanObj={mock.booleanObj}
    //     setBooleanObj={mock.setBooleanObj} />, { wrapper: MemoryRouter })
    //   const el = await screen.findByPlaceholderText(/search/)
    //   expect(el).toBeInTheDocument()

    // })
  })

  // describe("User not authenticated", () => {

  //   beforeEach(() => {
  //     useAuth0.mockReturnValue({
  //       isAuthenticated: false,
  //       user,
  //       logout: jest.fn(),
  //       loginWithRedirect: jest.fn(),
  //       getAccessTokenSilently: jest.fn(() => "iamatoken")
  //     });
  //   });

  //   it('should not display lists', async () => {
  //      render(<Home setSearchList={mock.setSearchList}
  //       riderList={mock.riderList}
  //       searchList={mock.searchList}
  //       booleanObj={mock.booleanObj}
  //       setBooleanObj={mock.setBooleanObj} />, { wrapper: MemoryRouter })
  //     const el = await screen.findByText('User not authenticated')
  //     expect(el).toBeInTheDocument()

  //   })
  // })
})
