
    window.reactComponents = {};

    window.vueComponents = {};

  
      import React from "react";

      import ReactDOM from "react-dom";


      import ReactWrapper from '../node_modules/better-docs/lib/react-wrapper.js';

      window.React = React;

      window.ReactDOM = ReactDOM;

      window.ReactWrapper = ReactWrapper;

    
    import './styles/reset.css';

    import './styles/iframe.css';

  import Component0 from '../pages/index.js';
reactComponents['Home'] = Component0;

import Component1 from '../pages/new.js';
reactComponents['New'] = Component1;

import Component2 from '../pages/data/[id]/index.js';
reactComponents['OneData'] = Component2;