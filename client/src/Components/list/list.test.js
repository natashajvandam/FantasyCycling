import { expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom'
import List from './list.js'
import '@testing-library/jest-dom/extend-expect'

jest.mock('../item/item', () => () => <div data-testid="item" />)

const mock = {
emptyRiderList : [],
  riderList: [{
    "id": 72,
    "name": " Politt Nils",
    "price": 23,
    "roster": 8,
    "added_at": "2022-01-24T00:00:00.000Z",
    "team": "BORA - hansgrohe",
    "image": "https://www.procyclingstats.com/images/riders/bp/dd/nils-politt-2022.jpeg",
    "classic_pnts": 1080,
    "gc_pnts": 800,
    "tt_pnts": 906,
    "sprint_pnts": 656,
    "climb_pnts": 390,
    "next_race": " Trofeo Calvia"
  }]
}

describe('List component', () => {
  it('should render no riders riderList is empty', () => {
    const view = render(<List riderList={mock.emptyRiderList}/>, { wrapper: MemoryRouter })

    expect(view.container).toHaveTextContent('no riders...')
  })

  it('should render riders if riderList contains riders', () => {
    const view= render(<List riderList={mock.riderList}/>, { wrapper: MemoryRouter })

      expect(screen.getByTestId(/item/)).toBeInTheDocument(view.container)
  })
})