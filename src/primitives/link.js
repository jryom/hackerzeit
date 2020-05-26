import Link from 'next/link';
import styled from 'styled-components';

const isExternalUrl = (url) => {
  if (typeof document === 'undefined') return null;
  const a = document.createElement('a');
  a.href = url;
  return a.hostname !== window.location.hostname;
};

const Anchor = styled.a`
  cursor: pointer;
  text-decoration: none;
`;

const StyledLink = ({ children, href, as }) => {
  if (!isExternalUrl(href)) {
    return (
      <Link as={as} href={href}>
        <Anchor>{children}</Anchor>
      </Link>
    );
  }

  return <Anchor href={href}>{children}</Anchor>;
};

StyledLink.defaultProps = {
  as: null,
};

StyledLink.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};

export default StyledLink;
