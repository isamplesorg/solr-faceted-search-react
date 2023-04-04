import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import SortMenu from '../src/components/sort-menu';

describe('SortMenu Component', () => {
    it('should render a button to sort the results', () => {
        const props = {
            bootstrapCss: true,
            sortFields:[{
                value:{
                    label:"test"
                }
            }],
            onChange: ()=>{},
        };
        render(<SortMenu {...props} />);
        // testing events
        fireEvent.click(screen.getByTestId("toggle-button"));
        expect(screen.getByText("asc")).toBeInTheDocument();
    });

  });