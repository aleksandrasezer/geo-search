import {geoListReducer, initState, setGeoList, setSearchText, setServerError} from './store'

let startState: typeof initState

beforeEach(() => {
    startState = {
        geoList: [],
        searchText: '',
        serverError: false,
    }
})

const fakeGeoList = [
    {
        geonameid: '123',
        name: 'Appleton',
        latitude: '50.123',
        longitude: '35.123',
    },
    {
        geonameid: '1234',
        name: 'Hire me',
        latitude: '50.1234',
        longitude: '35,1234',
    }
]

test('fakeGeoList should be set', () => {

    const endState = geoListReducer(startState, setGeoList(fakeGeoList))

    expect(endState.geoList.length).toEqual(2)
    expect(endState.geoList[0].name).toBe('Appleton')
    expect(endState.geoList[1].geonameid).toBe('1234')
})

test('correct search text should be set', () => {

    const endState = geoListReducer(startState, setSearchText('hockleton'))

    expect(endState.searchText.length).toEqual(9)
    expect(endState.searchText).toBe('hockleton')
})
test('server error should become true', () => {

    const endState = geoListReducer(startState, setServerError(true))

    expect(endState.serverError).toBeTruthy()
})
