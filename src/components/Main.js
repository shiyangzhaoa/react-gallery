require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';

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

//获取区间随机值
var getRangeRandom = (low,hight) => {
    return Math.random() * ((hight -low) +low);
}

class ImageFigure extends React.Component {
    render() {
        let styleObj = {};

        //如果props属性中指定了这张图片的位置，则使用
        if (this.props.arrange.pos) {
            styleObj = this.props.arrange.pos;
        }


        return (
            <figure className="img-figure" style={styleObj}>
                <img src={this.props.data.imageURL}
                     alt={this.props.data.title}
                />
                <figcaption>
                <h2 className="img-title">{this.props.data.title}</h2>
                </figcaption>
            </figure>
        )
    }
}

class GalleryByReactApp extends React.Component {
	constructor(props){
        super(props);
        this.state = {
            imagsArrangeArr: []
        }
        this.Constant= {
            centerPos: {
                left: 0,
                right: 0
            },
            hPosRange: {
                leftSecX: [0, 0],
                rightSecX: [0, 0],
                y: [0, 0]
            },
            vPosRange: {
                x: [0, 0],
                topY: [0, 0]
            }
        };
    }

    /*
     * 重新布局所有图片
     * @param centerIndex
     */
    rearrange = (centerIndex) => {
        let imagsArrangeArr = this.state.imagsArrangeArr,
            Constant = this.Constant,
            centerPos = Constant.centerPos,
            hPosRange = Constant.hPosRange,
            vPosRange = Constant.vPosRange,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,
            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x,

            imgsArrangeTopArr = [],
            topImgNum = Math.floor(Math.random() * 2),
            topImgSpliceIndex = 0,

        imgsArrangeCenterArr = imagsArrangeArr.splice(centerIndex, 1);

        //首先居中centerIndex的图片
        imgsArrangeCenterArr[0].pos = centerPos;

        //取出要布局上侧的图片的状态信息
        topImgSpliceIndex = Math.ceil(Math.random() * (imagsArrangeArr.length - topImgNum));

        imgsArrangeTopArr = imagsArrangeArr.splice(topImgSpliceIndex, topImgNum);

        //布局位于上侧的图片
        imgsArrangeTopArr.forEach(function(value, index) {
            imgsArrangeTopArr[index] = {
                pos: {
                    top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                    left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                }
            };
        });

        //布局左右两侧的图片
        for (let i =0, j= imagsArrangeArr.length, k = j / 2; i < j; i++) {
            let hPosRangeLORX = null;

            // 前半部分布局左边，右半部份布局右边
            if(i < k) {
                hPosRangeLORX = hPosRangeLeftSecX;
            } else {
                hPosRangeLORX = hPosRangeRightSecX;
            }

            imagsArrangeArr[i].pos = {
                top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
            }
        }

        if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
            imagsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
        }

        imagsArrangeArr.splice(centerIndex, 0 ,imgsArrangeCenterArr[0]);
          
        this.setState({
            imagsArrangeArr: imagsArrangeArr
        });

    }

    componentDidMount() {
        const stageDOM = ReactDOM.findDOMNode(this.refs.stage),
              stageW = stageDOM.scrollWidth,
              stageH = stageDOM.scrollHeight,
              halfStageW = Math.ceil(stageW / 2),
              halfStageH = Math.ceil(stageH / 2);
        
        const imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
              imgW = imgFigureDOM.scrollWidth,
              imgH = imgFigureDOM.scrollHeight,
              halfImgW = Math.ceil(imgW / 2),
              halfImgH = Math.ceil(imgH / 2);

        //计算中心图片left、top
        this.Constant.centerPos = {
            left: halfStageW - halfImgW,
            top: halfStageH - halfImgH

        }

        //左右区域的范围
        this.Constant.hPosRange.leftSecX[0] = -halfImgW;
        this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
        this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
        this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
        this.Constant.hPosRange.y[0] = -halfImgH;
        this.Constant.hPosRange.y[1] = stageH - halfImgH;

        //上侧范围
        this.Constant.vPosRange.topY[0] = -halfImgH;
        this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
        this.Constant.vPosRange.x[0] = halfStageW - imgW;
        this.Constant.vPosRange.x[1] = halfStageW;

        this.rearrange(0);

        console.log(stageW);

    }

  render() {
    let controllerUnits = [],
        imgFigures = [];

    imageDatas.forEach((value, index) => {

        if(!this.state.imagsArrangeArr[index]) {
            this.state.imagsArrangeArr[index] = {
                pos: {
                    left: 0,
                     top: 0
                 }
             }
         }
        imgFigures.push(<ImageFigure data={value} ref={'imgFigure' + index} arrange={this.state.imagsArrangeArr[index]}/>);
    })
    return (
    	<section className="stage" ref="stage">
           <section className="img-sec">
                {imgFigures}
    	   </section>
    	   <nav className="controller-nav">
                {controllerUnits}
    	   </nav>
    	</section>
    );
  }
}

GalleryByReactApp.defaultProps = {
};

export default GalleryByReactApp;
