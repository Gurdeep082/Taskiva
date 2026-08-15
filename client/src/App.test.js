import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the AI service assistant on the home page', () => {
  render(<App />);
  expect(screen.getByText(/Taskiva AI/i)).toBeInTheDocument();
});
