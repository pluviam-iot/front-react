import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Header from '.';

describe('<Header />', () => {
  it('deve renderizer o header com os links', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('a')).to.have.length(3);
  });
});
