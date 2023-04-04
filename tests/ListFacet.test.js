import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import ListFacet from '../src/components/list-facet';

describe('ListFacet Component', () => {
    it('should render a list for the given label and buttons when more than 4 values', () => {
        const props = {
            bootstrapCss: true,
            children: [],
            collapse: false,
            facetSort: "",
            facets: ["a", 0,"b",0,"c",0,"d",0,"e",0],
            field: "",
            label: "Material",
            onChange: ()=>{},
            onFacetSortChange: ()=>{},
            onSetCollapse: ()=>{},
            query: {},
            truncateFacetListsAt: 0,
            value: []
        };
     
        render(<ListFacet {...props} />);
        // onclick event to expand the list facet
        fireEvent.click(screen.getByTestId("header"));
        // render the buttons as the facet value length > 4 
        expect(screen.getByText("a-z")).toBeInTheDocument();
    });
  
  });