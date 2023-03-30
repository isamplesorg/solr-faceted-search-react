import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SpatialQuery from '../src/components/spatial-query';
import '@testing-library/jest-dom'

describe('SpatialQuery Component', () => {
  it('should render a form for spatial query', () => {
    const props = {
      bootstrapCss: true,
      collapse:false,
      field:"",
      label:"",
      onChange:()=>{},
      onSetCollapse:()=>{}
    }
   
    render(<SpatialQuery {...props} />);
    //testing  events
    fireEvent.submit(screen.getByTestId("form"));
    fireEvent.click(screen.getByTestId("header"));

    const inputNode = screen.getByLabelText("min_lon")
    fireEvent.change(inputNode, {target: { value: "new value", "name": "event name" }});

    expect(screen.getByTestId("form")).toBeInTheDocument();
  });

});