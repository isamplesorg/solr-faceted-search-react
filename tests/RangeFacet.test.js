import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { RangeFacet } from '../src/components/range-facet';


describe('RangeFacet Component', () => {
    it('should render a range facet with its label', () => {
        const props = {
            bootstrapCss: true,
            collapse: false,
            facets: ["a", 0,"b",0,"c",0,"d",0,"e",0],
            field: "",
            label: "Testing",
            onChange: ()=>{},
            onSetCollapse: ()=>{},
            value: []
        };
        render(<RangeFacet {...props} />);
        // should render the passed label as a header in the component
        expect(screen.getByText("Testing")).toBeInTheDocument();
    });

  });