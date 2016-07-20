require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let imageDatas = require('../data/imageData.json');

// 利用自执行函数， 将图片转换为URL路径信息
imageDatas = ((imageDatasArr) =>{
	for (var i = 0, j = imageDatasArr.length; i < j; i++) {
		var singleImageData = imageDatasArr[i];

		singleImageData.imageURL = require('../images/' + singleImageData.fileName);

		imageDatasArr[i] = singleImageData;
	} 

	return imageDatasArr;
})(imageDatas);

class GalleryByReactApp extends React.Component {
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
    	<section className="stage">
            <section className="img-sec">
    	   </section>
    	   <nav className="controller-nav">
    	   </nav>
    	</section>
    );
  }
}

GalleryByReactApp.defaultProps = {
};

export default GalleryByReactApp;
