import { expect } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom'
import Item from './item.js'
 import '@testing-library/jest-dom/extend-expect'

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
    if (mock.booleanObj[mock.rider.id] === false) {
      mock.booleanObj[mock.rider.id] = true
    } else {
      mock.booleanObj[mock.rider.id] = false}

    }
}

describe('Pro cycling rider list items:', () => {
  describe('Standard view', () => {

    beforeEach(() => {
      mock.booleanObj["97"] = false
    })

    it('should have a buy button', () => {
      const view = render(<Item  user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={false} userData={mock.userData}
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

      expect(view.container).toHaveTextContent(`€ ${mock.rider.price}`)
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
      await fireEvent.click(screen.getByRole('button', { name: "buy" }))
      rerender(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={false} userData={mock.userData}
        booleanObj={mock.booleanObj}
          setBooleanObj={mock.setBooleanObj}
      />, { wrapper: MemoryRouter });
      expect(screen.queryByRole('button', { name: "buy" })).not.toBeInTheDocument()
    })

    it('should not have a price if rider is purchased', async () => {
      const { rerender } = render(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={false} userData={mock.userData}
        booleanObj={mock.booleanObj}
        setBooleanObj={mock.setBooleanObj}
      />, { wrapper: MemoryRouter });
      await fireEvent.click(screen.getByRole('button', { name: "buy" }))
      rerender(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={false} userData={mock.userData}
        booleanObj={mock.booleanObj}
          setBooleanObj={mock.setBooleanObj}
          />, { wrapper: MemoryRouter });
      expect(screen.queryByText(`€ ${mock.rider.price}`)).not.toBeInTheDocument()
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
  })

  describe('Expanded view', () => {
    it('should have a show less button if expanded', () => {

      const view = render(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={false} userData={mock.userData}
        booleanObj={mock.booleanObj}
        setBooleanObj={mock.setBooleanObj}
      />, { wrapper: MemoryRouter });
      fireEvent.click(screen.getByRole('button', {name:"show more"}))
      expect(screen.getByRole('button', {name:"show less"})).toBeInTheDocument(view.container)
    })
     it('should show one day points in overview if expanded', () => {

    const view = render(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={false} userData={mock.userData}
      booleanObj={mock.booleanObj}
      setBooleanObj={mock.setBooleanObj}
    />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByRole('button', {name:"show more"}))
    expect(screen.getByText(`One-day Race Pnts:`)).toBeInTheDocument(view.container)
    expect(screen.getByText(mock.rider.classic_pnts)).toBeInTheDocument(view.container)
  })

  it('should show GC points in overview if expanded', () => {

    const view = render(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={false} userData={mock.userData}
      booleanObj={mock.booleanObj}
      setBooleanObj={mock.setBooleanObj}
    />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByRole('button', {name:"show more"}))
    expect(screen.getByText(`GC Pnts:`)).toBeInTheDocument(view.container)
    expect(screen.getByText(mock.rider.gc_pnts)).toBeInTheDocument(view.container)
  })

  it('should show time trial points in overview if expanded', () => {

    const view = render(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={false} userData={mock.userData}
      booleanObj={mock.booleanObj}
      setBooleanObj={mock.setBooleanObj}
    />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByRole('button', {name:"show more"}))
    expect(screen.getByText(`Time Trial Pnts:`)).toBeInTheDocument(view.container)
    expect(screen.getByText(mock.rider.tt_pnts)).toBeInTheDocument(view.container)
  })
  it('should show climbing points in overview if expanded', () => {

    const view = render(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={false} userData={mock.userData}
      booleanObj={mock.booleanObj}
      setBooleanObj={mock.setBooleanObj}
    />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByRole('button', {name:"show more"}))
    expect(screen.getByText(`Climbing Pnts:`)).toBeInTheDocument(view.container)
    expect(screen.getByText(mock.rider.climb_pnts)).toBeInTheDocument(view.container)
  })
  it('should show sprint points in overview if expanded', () => {

    const view = render(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={false} userData={mock.userData}
      booleanObj={mock.booleanObj}
      setBooleanObj={mock.setBooleanObj}
    />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByRole('button', {name:"show more"}))
    expect(screen.getByText(`Sprint Pnts:`)).toBeInTheDocument(view.container)
    expect(screen.getByText(mock.rider.sprint_pnts)).toBeInTheDocument(view.container)
  })

  it('should show next race if expanded', () => {

    const view = render(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={false} userData={mock.userData}
      booleanObj={mock.booleanObj}
      setBooleanObj={mock.setBooleanObj}
    />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByRole('button', {name:"show more"}))
    expect(screen.getByText(`next race:${mock.rider.next_race}`)).toBeInTheDocument(view.container)
  })
  })



})

describe('User rider list items:', () => {

  describe('front view', () => {

    it('should contain the riders image', () => {
    const view = render(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={true} userData={mock.userData}
        booleanObj={mock.booleanObj}
        setBooleanObj={mock.setBooleanObj}
    />, { wrapper: MemoryRouter });

      expect(screen.getByRole('img')).toBeInTheDocument(view.container)
    })

     it('should have riders name and team', () => {
      const view = render(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={true} userData={mock.userData}
        booleanObj={mock.booleanObj}
        setBooleanObj={mock.setBooleanObj}
      />, { wrapper: MemoryRouter });

       expect(view.container).toHaveTextContent(mock.rider.name, mock.rider.team)

     })

    it('should have sell button with price', () => {
      const view = render(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={true} userData={mock.userData}
        booleanObj={mock.booleanObj}
        setBooleanObj={mock.setBooleanObj}
      />, { wrapper: MemoryRouter });

      expect(screen.getByRole('button', {name: `sell: € ${mock.rider.price}`})).toBeInTheDocument(view.container)
    })

    it('should have info button', () => {
      const view = render(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={true} userData={mock.userData}
        booleanObj={mock.booleanObj}
        setBooleanObj={mock.setBooleanObj}
      />, { wrapper: MemoryRouter });

      expect(screen.getByRole('button', {name:"i"})).toBeInTheDocument(view.container)
    })

    it('Clicking back info should take you back to the back view', () => {
    const view = render(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={true} userData={mock.userData}
      booleanObj={mock.booleanObj}
      setBooleanObj={mock.setBooleanObj}
    />, { wrapper: MemoryRouter });
      fireEvent.click(screen.getByRole('button', {name:"i"}))
    expect(screen.getByRole('button', {name: "back"})).toBeInTheDocument(view.container)
  })

  })

  describe('Back view', () => {
    it('should show one day points', () => {

    const view = render(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={true} userData={mock.userData}
      booleanObj={mock.booleanObj}
      setBooleanObj={mock.setBooleanObj}
    />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByRole('button', {name:"i"}))
    expect(screen.getByText(`One-day Race Pnts:`)).toBeInTheDocument(view.container)
    expect(screen.getByText(mock.rider.classic_pnts)).toBeInTheDocument(view.container)
  })

  it('should show GC points', () => {

    const view = render(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={true} userData={mock.userData}
      booleanObj={mock.booleanObj}
      setBooleanObj={mock.setBooleanObj}
    />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByRole('button', {name:"i"}))
    expect(screen.getByText(`GC Pnts:`)).toBeInTheDocument(view.container)
    expect(screen.getByText(mock.rider.gc_pnts)).toBeInTheDocument(view.container)
  })

  it('should show time trial points', () => {

    const view = render(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={true} userData={mock.userData}
      booleanObj={mock.booleanObj}
      setBooleanObj={mock.setBooleanObj}
    />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByRole('button', {name:"i"}))
    expect(screen.getByText(`Time Trial Pnts:`)).toBeInTheDocument(view.container)
    expect(screen.getByText(mock.rider.tt_pnts)).toBeInTheDocument(view.container)
  })
  it('should show climbing points in overview if expanded', () => {

    const view = render(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={true} userData={mock.userData}
      booleanObj={mock.booleanObj}
      setBooleanObj={mock.setBooleanObj}
    />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByRole('button', {name:"i"}))
    expect(screen.getByText(`Climbing Pnts:`)).toBeInTheDocument(view.container)
    expect(screen.getByText(mock.rider.climb_pnts)).toBeInTheDocument(view.container)
  })
  it('should show sprint points', () => {

    const view = render(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={true} userData={mock.userData}
      booleanObj={mock.booleanObj}
      setBooleanObj={mock.setBooleanObj}
    />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByRole('button', {name:"i"}))
    expect(screen.getByText(`Sprint Pnts:`)).toBeInTheDocument(view.container)
    expect(screen.getByText(mock.rider.sprint_pnts)).toBeInTheDocument(view.container)
  })

    it('should show next race', () => {

    const view = render(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={true} userData={mock.userData}
      booleanObj={mock.booleanObj}
      setBooleanObj={mock.setBooleanObj}
    />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByRole('button', {name:"i"}))
    expect(screen.getByText(`next race:${mock.rider.next_race}`)).toBeInTheDocument(view.container)
    })

    it('should have a back button', () => {
    const view = render(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={true} userData={mock.userData}
      booleanObj={mock.booleanObj}
      setBooleanObj={mock.setBooleanObj}
    />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByRole('button', {name:"i"}))
    expect(screen.getByRole('button', {name:'back'})).toBeInTheDocument(view.container)
    })

    it('Clicking back button should take you back to front view', () => {
    const view = render(<Item user={mock.user} rider={mock.rider} addToRoster={mock.addToRoster} removeFromRoster={mock.removeFromRoster} mine={true} userData={mock.userData}
      booleanObj={mock.booleanObj}
      setBooleanObj={mock.setBooleanObj}
    />, { wrapper: MemoryRouter });
      fireEvent.click(screen.getByRole('button', {name:"i"}))
    fireEvent.click(screen.getByRole('button', {name:"back"}))
    expect(screen.getByRole('button', {name: "i"})).toBeInTheDocument(view.container)
  })
  })
})