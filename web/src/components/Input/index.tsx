import React from 'react';

import { Container } from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<import('react-icons').IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ icon: Icon, ...props }) => {
  return (
    <Container>
      {Icon && <Icon size={20} />}
      <input {...props} />
    </Container>
  );
};

export default Input;
