import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultList from '../src/components/results/list';


describe('ResultList Component', () => {
    it('should render the children inside the result list', () => {
        const props = {
            bootstrapCss: true,
            children: ["test"]
        }
        render(<ResultList {...props} /> )
        expect(screen.getByText("test")).toBeInTheDocument();
    });
  });