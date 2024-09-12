import { Anchor } from 'antd';
import React, { useEffect } from 'react';
import './wizard-edit-form-anchor-link.css';

interface AnchorLinkProps {
  href: string;
  title: string;
  id: string;
}

const WizardEditFormAnchorLink: React.FC<AnchorLinkProps> = ({ href, title, id }) => {
  const handleAnchorClick = (e: React.MouseEvent<HTMLElement>, link: { title: React.ReactNode; href: string }) => {
    e.preventDefault();
    const targetId = link.href.slice(1);
    // Update URL without causing a page reload
    window.history.pushState(null, '', `#${targetId}`);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    // Function to scroll to the section based on URL hash
    const scrollToSection = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const targetElement = document.getElementById(hash);
        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 0);
        }
      }
    };

    // Scroll to section on component mount and hash change
    scrollToSection();
    window.addEventListener('hashchange', scrollToSection);

    // Clean up event listener
    return () => {
      window.removeEventListener('hashchange', scrollToSection);
    };
  }, []);

  return (
    <div id={id}>
      <Anchor onClick={handleAnchorClick} affix={false}>
        <Anchor.Link
          replace={true}
          href={href}
          title={
            <>
              <span aria-hidden>{title}</span> <span className="sr-only">{title} section</span>
            </>
          }
        />
      </Anchor>
    </div>
  );
};

export default WizardEditFormAnchorLink;
