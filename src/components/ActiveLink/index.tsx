import React, { Children } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {
  activeClassName: string;
  children: any;
  href: string;
}

const ActiveLink = ({ children, activeClassName, ...props }: Props) => {
  const { asPath } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || '';

  const className =
    asPath === props.href
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};

export default ActiveLink;
