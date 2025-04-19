import React, { useEffect, useState } from 'react';

interface ElevationScrollProps {
  children: React.ReactElement;
  threshold?: number;
}

export const ElevationScroll: React.FC<ElevationScrollProps> = ({
  children,
  threshold = 0,
}) => {
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldElevate = window.scrollY > threshold;
      if (shouldElevate !== elevated) {
        setElevated(shouldElevate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold, elevated]);

  // Clone the child and add shadow class when elevated
  return React.cloneElement(children, {
    className: `${children.props.className || ''} ${
      elevated ? 'shadow-md' : 'shadow-sm'
    }`,
    style: {
      ...children.props.style,
      transition: 'box-shadow 0.3s ease-in-out',
    },
  });
};
