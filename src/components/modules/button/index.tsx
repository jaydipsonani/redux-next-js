import classNames from 'classnames';
import router from 'next/router';
import React from 'react';
import Spinner from '../spinner';

interface ButtonProps {
  title: string;
  type?: any;
  color?: string | undefined;
  clickHandler?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  new_tab?: boolean;
  link?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  type = undefined,
  clickHandler,
  disabled = false,
  link,
  loading = false,
}) => {
  return (
    <button
      className={classNames(`commanButton`)}
      type={type}
      disabled={disabled}
      onClick={
        type !== 'submit'
          ? clickHandler
            ? clickHandler
            : () => router.push(link || '')
          : undefined
      }
    >
      <span>{loading ? <Spinner/> : title}</span>
    </button>
  );
};

export default Button;
