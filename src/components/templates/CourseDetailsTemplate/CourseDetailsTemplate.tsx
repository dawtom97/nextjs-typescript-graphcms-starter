import React from 'react';
import Footer from '../../common/Footer/Footer';
import { Navbar } from '../../common/Navbar/Navbar';
import { CourseDetailsProps } from './CourseDetailsTemplate.types';
import * as Styled from './styles';

const CourseDetailsTemplate = ({ children }: CourseDetailsProps) => {
  return (
    <Styled.Wrapper>
      <Navbar />
      {/* <Styled.Banner banner={bannerColors}/> */}
      <Styled.Content>{children}</Styled.Content>
      <Footer/>
    </Styled.Wrapper>
  );
};

export default CourseDetailsTemplate