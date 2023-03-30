import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Result from '../src/components/results/result';


describe('Result Component', () => {
    it('should render the result with the passed label', () => {
        const props = {
            bootstrapCss: true,
            doc: {},
            fields: [{
                field:"test",
                label:"label",
                hidden: false
            }],
            onSelect: ()=>{}
        }
        render(<Result {...props} /> )
        expect(screen.getByText("label")).toBeInTheDocument();
    });
    

  });