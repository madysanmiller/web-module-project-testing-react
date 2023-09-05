import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { userEvent } from '@testing-library/user-event/dist/types/setup';
import Show from './../Show';


const testShow = {
    name: "test show",
    summary: "test summary",
    seasons: [
        {
            id: 0,
            name: "Season 1",
            episodes: []
        },
        {
            id: 1,
            name: "Season 2",
            episodes: []
        },
    ]
};

// test('renders without errors', () => { });

test('renders without errors', () => { 
    render(<Show show={testShow} selectedSeasons={"none"} />);
});

// test('renders Loading component when prop show is null', () => { });

test('renders Loading component when prop show is null', () => { 
    render(<Show show={null} />);
    const loading = screen.queryByTestId('loading-container');
    expect(loading).toBeInTheDocument();
});
// test('renders same number of options seasons are passed in', () => { });

test('renders same number of options seasons are passed in', () => {
    render(<Show show={testShow} selectedSeasons={"none"} />)
    const seasonOptions = screen.queryAllByTextId('season-option');
    expect(seasonOptions).toHaveLength(2);
 });

// test('handleSelect is called when an season is selected', () => { });

test('handleSelect is called when an season is selected', () => {
    const handleSelect =jest.fn(); 
    render(<Show show={testShow} selectedSeasons={"none"}handleSelect={handleSelect}/>);
    const select = screen.getByLabelText(/Select A Season/i);
    userEvent.selectOptions(select, ['1']);

    expect(handleSelect).toBeCalled();
 });

// test('component renders when no seasons are selected and when rerenders with a season passed in', () => { });

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const {rerender} = render(<Show show={testShow} selectedSeasons={"none"} />)
    let episodes = screen.queryByTextId('episode-container');
    expect(episodes).not.toBeInTheDocument();

    rerender(<Show show={testShow} selectedSeason={1} />);
    episodes = screen.queryByTextId('episodes-container');
    expect(episodes).toBeInTheDocument();
 });