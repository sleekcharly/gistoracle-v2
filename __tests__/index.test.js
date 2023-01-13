import Home from '../pages/index';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('Gistoracle', () => {
  it('renders the home page', () => {
    render(<Home />);

    expect(screen.getByTestId('root')).toBeInTheDocument();
  });
});
