import React from 'react';
import { render } from '@testing-library/react';
import UncheckedIcon from '../src/components/icons/unchecked';

describe('Unchecked Icon', () => {
  it('should render the unchecked incon', () => {
    const { container } = render(<UncheckedIcon />);
    const svgEl = container.querySelector("[data-icon='unchecked']");
    expect(svgEl.classList.toString()).toContain("unchecked");
  });

});
