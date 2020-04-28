import Link from 'next/link';
import styled from 'styled-components';

const isRelativeUrl = (url) => {
  const link = document.createElement('a');
  link.href = url;
  return link.origin + link.pathname + link.search + link.hash === url;
};

const Anchor = styled.a`
  cursor: pointer;
  text-decoration: none;
`;

const StyledLink = ({ children, href }) => {
  if (isRelativeUrl(href)) {
    return (
      <Link href={href}>
        <Anchor>{children}</Anchor>
      </Link>
    );
  }

  return <Anchor href={href}>{children}</Anchor>;
};

StyledLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};

export default StyledLink;
