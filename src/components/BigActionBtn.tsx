import React from 'react'

interface BigActionBtnProps {
  title: string;
  width?: string; // Add width prop
  titleProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

const BigActionBtn: React.FC<BigActionBtnProps> = ({ title, width, titleProps }) => {
  return (
    <button className={`bg-red-400 text-white py-2 rounded ${width}`} {...titleProps}>
      {title}
    </button>
  )
}

export default BigActionBtn
