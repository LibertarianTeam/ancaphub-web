import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
    background: ${(props) => (props.variant === 'outlined' ? 'transparent' : props.theme.palette[props.color])};
    cursor: pointer;
    display: flex;
    align-items:center;
    justify-content:center;
    color: ${(props) => (props.variant === 'outlined' ? `${props.color ? props.theme.palette[props.color] : props.theme.palette.border}` : props.theme.palette.text.contrast)};
    border-radius: 4px;
    font-size: .875rem;
    text-align: center;
    padding: ${(props) => (props.size === 'small' ? '8px' : '12px')};
    transition: background-color .2s ease-in-out,color .2s ease-in-out,border-color .2s ease-in-out,box-shadow .2s ease-in-out;
    border: none;
    outline: none;
    width: ${(props) => (props.fullwidth ? '100%' : 'inherit')};
    border: ${(props) => (props.variant === 'outlined' ? `1px solid ${props.color ? props.theme.palette[props.color] : props.theme.palette.border}` : 'none')};
    transition: filter 0.3s;
    &:hover {
        filter: brightness(90%);
    }

    svg {
      fill: ${(props) => (props.variant === 'outlined' ? `${props.color ? props.theme.palette[props.color] : props.theme.palette.border}` : props.theme.palette.text.contrast)};
      margin-right:8px;
    }
`;

Button.propTypes = {
  variant: PropTypes.oneOf(['outlined', 'contained', 'filled']),
  size: PropTypes.oneOf(['small', 'normal']),
  fullwidth: PropTypes.bool,
};

Button.defaultProps = {
  variant: 'filled',
  size: 'normal',
  fullWidth: false,
};

export default Button;
