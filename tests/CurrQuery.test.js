import React from 'react';
import { render, screen } from '@testing-library/react';
import CurrentQuery from '../src/components/current-query/index.js';

describe('CurrentQuery Component', () => {
  it('should render unordered list of search fields', () => {
    const props = {
      bootstrapCss: true,
      query:{
          searchFields:[]
      },
      onChange: ()=>{},
  };
    render(<CurrentQuery {...props} />);
  });

});