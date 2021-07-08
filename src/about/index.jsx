import React, { useState } from 'react';
import ReactDom from 'react-dom';
import './index.css';

/* 关于页面组件 */
const About = () => {
  const [Dynamic, setDynamic] = useState();
  const loadComponent = () => {
    const lazyComponent = React.lazy(() => import('./dynamic.jsx'));
    setDynamic(lazyComponent);
  };
  return (
    <div className="about-container">
      <React.Suspense fallback>
        {Dynamic ? <Dynamic /> : null}
      </React.Suspense>
      <span>字体文件测试,样式好像不太对</span>
      <button id="btn" onClick={loadComponent}>
        这是第几次
      </button>
    </div>
  );
};

ReactDom.render(<About />, document.getElementById('root'));

export default About;
