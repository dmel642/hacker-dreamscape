import React from 'react';

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-dreamdark via-dreamdark/95 to-dreamdark/90" />
      <div className="absolute inset-0 bg-[url('/lovable-uploads/d7209daa-bfc3-4c3f-bc85-a3035f78bc0b.png')] bg-cover bg-center opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-dreampurple/10 via-dreamblue/5 to-transparent" />
    </div>
  );
};

export default Background;