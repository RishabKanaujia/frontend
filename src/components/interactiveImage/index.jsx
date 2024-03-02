import React, { useState, useEffect } from 'react';
import styles from "./style.module.css"

const InteractiveImage = ({src}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientY - innerHeight / 2) / 30;
    const y = -(clientX - innerWidth / 2) / 30;
    setRotation({ x, y });
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); 

  const style = {
    transform: `translateX(${-rotation.y}px) translateY(${-rotation.x}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
  }
  return (
    <div className={styles.imageHolder}
    style={style}>
      <img
        src={src}
        alt='cat'

      />
    </div>
  );
};

export default InteractiveImage;