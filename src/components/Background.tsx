import React from 'react';

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-dreamdark via-dreamdark/95 to-dreamdark/90" />
      <div className="absolute inset-0 bg-[url('/lovable-uploads/b704c80a-a812-467d-8f19-9e36b1ca66a8.png')] bg-cover bg-center opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-dreampurple/10 via-dreamblue/5 to-transparent" />
    </div>
  );
};

export default Background;