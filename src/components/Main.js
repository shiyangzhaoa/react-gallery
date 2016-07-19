require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let yeomanImage = require('../data/imageData.json');
for(var i = 0, l=yeomanImage.length; i<l; i++){
	yeomanImage[i].url = "../images/" + yeomanImage[i].fileName;
}

class AppComponent extends React.Component {
	constructor(props){
        super(props);
        this.state = {
            value: 3434
        };
    }
    changeValue(e) {
    	this.setState({
    		value:e.target.value
    	});
	}
  render() {
    return (
    	<section className="stage">{yeomanImage.map(function(item) {
    		return <img src={item.url} />
    	})}
    	<section className="img-sec">
    	</section>
    	<nav className="controller-nav">
    	</nav>
    	</section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
