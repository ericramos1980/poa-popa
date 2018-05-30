import React from 'react';
import { mount } from 'enzyme';

import Footer from './Footer';

describe('<Footer />', () => {
    it('renders correctly', () => {
        const wrapper = mount(<Footer/>);

        expect(wrapper.find('.footer')).toHaveLength(1);
        expect(wrapper.find('.footer .container')).toHaveLength(1);
        expect(wrapper.find('.footer .container .bottom-copy')).toHaveLength(1);
        expect(wrapper.find('.footer .container .footer-social')).toHaveLength(4);
    });
});
