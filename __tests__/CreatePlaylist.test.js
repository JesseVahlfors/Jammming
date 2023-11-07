import React from "react";
import {render, screen} from "@testing-library/react";
import CreatePlaylist from "../src/CreatePlaylist";

describe('CreatePlaylist', () => {
    test('renders the component', () => {
        render(<CreatePlaylist />);
        const component = screen.getByTestId('create-playlist');
        expect(component).toBeInTheDocument();
    });
});