import React, {Component} from "react"
import Title from "../Title";
import AdidasNike from "../../Images/adidas-nike-back.png";
import Converse from "../../Images/converse-back.png"
import Luxury from "../../Images/luxury-back.png"
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption } from 'reactstrap';



const items = [
  {
     src: AdidasNike,
     altText: 'Image alt Text',
     header: 'Adidas & Nike',
     caption: 'Exclusive products from original brands'
  },
  {
     src: Converse,
     altText: 'Image alt Text',
     header: 'Converse',
     caption: 'Ensure your cryptoitems'
  },
  {
     src: Luxury,
     //caption: 'Content here'
  }
];

export default class Home extends Component {
  constructor(props) {
  super(props);
  this.state = {
    activeIndex: 0,
  };

  this.next = this.next.bind(this);
  this.previous = this.previous.bind(this);
  this.goToIndex = this.goToIndex.bind(this);
  this.onExiting = this.onExiting.bind(this);
  this.onExited = this.onExited.bind(this);

  }


  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : 
    this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : 
    this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {

    const { activeIndex } = this.state;
    const slides = items.map((item) => {

    return (
      <CarouselItem
        className="my-Carousel"
        tag="div"
        onExiting={this.onExiting}
        onExited={this.onExited}
        key={item.src}
      >

        <div className='custom-tag'>
          <div className='ImgCont' align="center">
            <img width='80%' src={item.src} alt={item.altText}/>
          </div>
          <div>
            <CarouselCaption captionHeader={item.header}  captionText={item.caption} />
          </div>
        </div>
      </CarouselItem>
      );
    });

    return (
      <div>
        <Title name="Welcome to" title="CryptoStockZ"/>
        <Carousel className='trustedMechCarousel' activeIndex={activeIndex} next={this.next} previous={this.previous}>
          <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
      </div>
    );
  }
}