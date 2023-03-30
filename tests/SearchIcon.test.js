import React from 'react';
import { render } from '@testing-library/react';
import SearchIcon from '../src/components/icons/search';

describe('Search Icon', () => {
  it('should render the search icon', () => {
    const { container } = render(<SearchIcon />);
    const svgEl = container.querySelector("[data-icon='search']");
    expect(svgEl.classList.toString()).toContain("search-icon");
  });

});
