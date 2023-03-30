import React from 'react';
import { render } from '@testing-library/react';
import CheckedIcon from '../src/components/icons/checked';

describe('Checked Icon', () => {
  it('should render the checked icon', () => {
    const { container } = render(<CheckedIcon title="test" />);
    const svgEl = container.querySelector("[data-icon='checked']");
    expect(svgEl.classList.toString()).toContain("checked");
  });

});
