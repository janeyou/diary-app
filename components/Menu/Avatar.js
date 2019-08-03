import React from 'react';
import styled from 'styled-components';

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo:
        'https://p70.tr4.n0.cdn.getcloudapp.com/items/YEu8vPjv/avatar-default.jpg'
    };
  }

  render() {
    return <Image source={{ uri: this.state.photo }} />;
  }
}

export default Avatar;

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
`;
