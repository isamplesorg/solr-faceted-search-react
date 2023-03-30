import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchFieldContainer from '../src/components/search-field-container';

describe('SearchField Container', () => {
    it('should render a button to do new search', () => {
        const props = {
            bootstrapCss: true,
            children:[],
            onNewSearch: ()=>{},
        };
        render(<SearchFieldContainer {...props} />);
        // testing events
        expect(screen.getByText("New search")).toBeInTheDocument();
    });

  });