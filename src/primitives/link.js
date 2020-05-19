import Link from 'next/link';
import styled from 'styled-components';

const isExternalUrl = (url) => {
  const a = document.createElement('a');
  a.href = url;
  const aProperties = a.origin + a.pathname + a.search + a.hash;
  return aProperties.startsWith(url);
};

const Anchor = styled.a`
  cursor: pointer;
  text-decoration: none;
`;

const StyledLink = ({ children, href }) => {
  if (!isExternalUrl(href)) {
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
