import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage', () => {
    it('renders the UserWidget and MyPostWidget', () => {
      const { getByTestId } = render(<HomePage />);
  
      // Verify that the UserWidget is rendered
      const userWidget = getByTestId('user-widget');
      expect(userWidget).toBeInTheDocument();
  
      // Verify that the MyPostWidget is rendered
      const myPostWidget = getByTestId('my-post-widget');
      expect(myPostWidget).toBeInTheDocument();
    });
  
    it('renders the PostsWidget when the user is logged in', () => {
      // Mock the user ID and picture path in the Redux store
      const store = {
        user: {
          _id: '123',
          picturePath: 'SocialFrontEnd/socialfrontend/public/assets/linkedin.png',
        },
      };
  
      const { getByTestId } = render(<HomePage />, { store });
  
      // Verify that the PostsWidget is rendered
      const postsWidget = getByTestId('posts-widget');
      expect(postsWidget).toBeInTheDocument();
    });
  });
  