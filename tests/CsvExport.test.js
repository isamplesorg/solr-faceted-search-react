import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CsvExport from '../src/components/results/csv-export';


describe('CsvExport Component', () => {
    it('should render a button to export csv', () => {
        const props = {
            bootstrapCss: true,
            onClick: ()=>{}
        }
        render(<CsvExport {...props} /> )
        expect(screen.getByText("Export csv")).toBeInTheDocument();
    });
  });