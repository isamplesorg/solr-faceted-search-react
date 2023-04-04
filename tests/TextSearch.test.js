import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import TextSearch from '../src/components/text-search';

describe('TextSearch Component', () => {
    it('should render a text search with its label', () => {
        const props = {
            bootstrapCss: true,
            collapse: false,
            field: "",
            label: "Testing",
            onChange: ()=>{},
            onSetCollapse:()=>{}
        };
        render(<TextSearch {...props} />);
        // testing events
        fireEvent.click(screen.getByRole("button"));
        fireEvent.click(screen.getByTestId("header"));
        // should render the passed label as a header in the component
        expect(screen.getByText("Testing")).toBeInTheDocument();
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

  });