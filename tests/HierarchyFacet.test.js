import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HierarchyFacet from '../src/components/hierarchy-facet';
import '@testing-library/jest-dom'

describe('HierarchyFacet Component', () => {
    it('should collapse by click events and render a header', () => {
        const props = {
            bootstrapCss: true,
            children: [],
            collapse: false,
            facetSort: "",
            facets: [],
            field: "",
            label: "Material",
            onChange: ()=>{},
            onFacetSortChange: ()=>{},
            onSetCollapse: ()=>{},
            query: {},
            truncateFacetListsAt: 0,
            value: []
        };
     
        render(<HierarchyFacet {...props} />);
        // onclick events to expand the tree 
        fireEvent.click(screen.getByRole("heading", {level:5}))
        fireEvent.click(screen.getByTestId("switch"));
        // after expanding the tree should see a header 
        expect(screen.getByRole("heading", {level:6})).toBeInTheDocument();
    });

    it('should render the context label as a header', ()=>{
        const props = {
            bootstrapCss: true,
            children: [],
            collapse: false,
            facetSort: "",
            facets: [],
            field: "",
            label: "Context",
            onChange: ()=>{},
            onFacetSortChange: ()=>{},
            onSetCollapse: ()=>{},
            query: {},
            truncateFacetListsAt: 0,
            value: []
        };
        render(<HierarchyFacet {...props} />);
        expect(screen.getByText("Context")).toBeInTheDocument();

    })

    it('should render the specimen label as a header', ()=>{
        const props = {
            bootstrapCss: true,
            children: [],
            collapse: false,
            facetSort: "",
            facets: [],
            field: "",
            label: "Specimen",
            onChange: ()=>{},
            onFacetSortChange: ()=>{},
            onSetCollapse: ()=>{},
            query: {},
            truncateFacetListsAt: 0,
            value: []
        };
        render(<HierarchyFacet {...props} />);
        expect(screen.getByText("Specimen")).toBeInTheDocument();

    })

  
  });