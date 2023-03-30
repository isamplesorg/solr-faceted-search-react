import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '../src/components/results/pagination';


describe('Pagination Component', () => {
    it('should render an unordered list of class pagination', () => {
        const props = {
            bootstrapCss: true,
            results: {
                numFound: 100
            },
            query: [{
                start: 100,
                rows: 10
            }],
            onChange: ()=>{}
        }
        render(<Pagination {...props} /> )
        fireEvent.click(screen.getByTestId('link'))
        expect(screen.getByRole('list').classList.contains('pagination')).toBe(true);
    });
  });