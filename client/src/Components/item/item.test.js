import { expect, test } from '@jest/globals';
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom'
import Item from './item.js'

jest.mock('../../Services/apiService.js', () => ({
      addRider: () => ({ Result: { type: 'cors', url: 'http://localhost:3005/team/add/8/97', redirected: false, status: 204, ok: true } })
}))

const mock = {
user : {
    "nickname": "john",
    "name": "john@john.com",
    "picture": "https://s.gravatar.com/avatar/d31075d1a7e79e7cf3e2825899ece470?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjo.png",
    "updated_at": "2022-01-20T17:22:21.314Z",
    "email": "john@john.com",
    "email_verified": false,
    "sub": "auth0|61e99a4d008d72006f49917b"
},
    rider : {
    "id": 97,
    "name": " Madouas Valentin",
    "price": 11,
    "roster": null,

    "team": "Groupama - FDJ",
    "image": "https://www.procyclingstats.com/images/riders/bp/df/valentin-madouas-2022.jpeg",
    "classic_pnts": 1248,
    "gc_pnts": 552,
    "tt_pnts": 64,
    "sprint_pnts": 365,
    "climb_pnts": 844,
    "next_race": " Tour des Alpes Maritimes et du Var"
},
addToRoster : () => {
    return { type: 'cors', url: 'http://localhost:3005/team/add/8/97', redirected: false, status: 204, ok: true}
  },
   removeFromRoster : ()=>{},
    mine : false,
   userData : {
    "id": 8,
    "nickname": "john",
    "email": "john@john.com",
    "score": 500,
    "money": 500
},
   booleanObj : {

    "97": false
    },
  setBooleanObj: () => {
    console.log('im here')
    console.log(mock.booleanObj["97"])
    if (mock.booleanObj["97"] === false) {
      mock.booleanObj["97"] = true
      console.log(mock.booleanObj["97"])
    } else {
      mock.booleanObj["97"] = false}

    }
}

describe('Pro list items:', () => {

  beforeEach(() => {
    mock.booleanObj["97"] = false
  })

  it('should have a buy button', () => {
    const view = render(<Item className="button_rider" user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={false} userData={mock.userData}
      booleanObj={mock.booleanObj}
      setBooleanObj={mock.setBooleanObj}
    />, { wrapper: MemoryRouter });

    expect(screen.getByRole('button', { name: "buy" })).toBeInTheDocument(view.container)
  })

  it('should have a price', () => {
    const view = render(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={false} userData={mock.userData}
      booleanObj={mock.booleanObj}
      setBooleanObj={mock.setBooleanObj}
    />, { wrapper: MemoryRouter });

    expect(view.container).toHaveTextContent(`${mock.rider.price}`)
  })

  it('should have riders name', () => {
    const view = render(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={false} userData={mock.userData}
      booleanObj={mock.booleanObj}
      setBooleanObj={mock.setBooleanObj}
    />, { wrapper: MemoryRouter });

    expect(view.container).toHaveTextContent(`${mock.rider.name}`)
  })

  it('buy Button should be disappear if rider is purchased', async () => {
    const {rerender} = render(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={false} userData={mock.userData}
      booleanObj={mock.booleanObj}
      setBooleanObj={mock.setBooleanObj}
    />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByRole('button', { name: "buy" }))
    rerender(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={false} userData={mock.userData}
      booleanObj={mock.booleanObj}
        setBooleanObj={mock.setBooleanObj}
    />, { wrapper: MemoryRouter });
    //await waitForElementToBeRemoved(()=>screen.queryByRole('button', { name: "buy" }))
    expect(screen.queryByRole('button', { name: "buy" })).not.toBeInTheDocument()
  })

  it('should not have a price if rider is purchased', async () => {
    const { rerender } = render(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={false} userData={mock.userData}
      booleanObj={mock.booleanObj}
      setBooleanObj={mock.setBooleanObj}
    />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByRole('button', { name: "buy" }))
    rerender(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={false} userData={mock.userData}
      booleanObj={mock.booleanObj}
        setBooleanObj={mock.setBooleanObj}
        />, { wrapper: MemoryRouter });
    expect(screen.queryByText(`${mock.rider.price}`)).not.toBeInTheDocument()
  })

  it('should have a team name', () => {
     const view = render(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={false} userData={mock.userData}
      booleanObj={mock.booleanObj}
      setBooleanObj={mock.setBooleanObj}
    />, { wrapper: MemoryRouter });

    expect(view.container).toHaveTextContent(`${mock.rider.team}`)
  })

  it('should have a show more button if not expanded', () => {
     const view = render(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={false} userData={mock.userData}
      booleanObj={mock.booleanObj}
      setBooleanObj={mock.setBooleanObj}
    />, { wrapper: MemoryRouter });

    expect(screen.getByRole('button', {name:"show more"})).toBeInTheDocument(view.container)
  })

  it('should have a show less button if expanded', () => {

    const view = render(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={false} userData={mock.userData}
      booleanObj={mock.booleanObj}
      setBooleanObj={mock.setBooleanObj}
    />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByRole('button', {name:"show more"}))
    expect(screen.getByRole('button', {name:"show less"})).toBeInTheDocument(view.container)
  })


})