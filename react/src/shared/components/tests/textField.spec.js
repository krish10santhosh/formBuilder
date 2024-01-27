import { fireEvent, render, screen } from '@testing-library/react';
import TextFieldComponent from '../textfield';

test('renders learn react link', () => {
    render(<TextFieldComponent />);
    const linkElement = screen.getByTestId("textField").querySelector('input');
    expect(linkElement).toBeInTheDocument();
    fireEvent.change(linkElement, {target: {value: 'matti'}});
    expect(linkElement.value).toBe('matti')
});
