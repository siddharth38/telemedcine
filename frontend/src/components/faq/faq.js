import React, { useState, useEffect } from "react";
import LazyLoad from "react-lazy-load";
import { faq } from './guidelines';

function FAQ() {
  const [faqList, setFaq] = useState([]);

  useEffect(() => {
    setFaq(faq)
  }, []);

  return (
    <div className="FAQ">
      <div className="faq-left">
        <div className="video-holder">
          <LazyLoad offsetVertical={300}>
            <video
              src="/videos/who.mp4"
              controls={true}
              className="faq-video fadeInUp"
              style={{ animationDelay: "0.5s" }}
            />
          </LazyLoad>
          <div>
            <video
              src="/videos/vid1.mp4"
              controls={true}
              className="faq-video fadeInUp"
              style={{ animationDelay: "0.5s" }}
            />
            <video
              src="/videos/vid2.mp4"
              controls={true}
              className="faq-video fadeInUp"
              style={{ animationDelay: "0.5s" }}
            />
          </div>
          <div>
            <video
              src="/videos/vid5.mp4"
              controls={true}
              className="faq-video fadeInUp"
              style={{ animationDelay: "0.5s" }}
            />
            <video
              src="/videos/vid4.mp4"
              controls={true}
              className="faq-video fadeInUp"
              style={{ animationDelay: "0.5s" }}
            />
          </div>
          <div>
            <video
              src="/videos/vid3.mp4"
              controls={true}
              className="faq-video fadeInUp"
              style={{ animationDelay: "0.5s" }}
            />
            <video
              src="/videos/vid6.mp4"
              controls={true}
              className="faq-video fadeInUp"
              style={{ animationDelay: "0.5s" }}
            />
          </div>
        </div>
      </div>
      <div className="faq-right">
        <div className="fadeInUp faq">
          <LazyLoad offsetVertical={200}>
            <img src="/images/mohfw-logo.jpg" className="mohfw-logo" alt={"MOHFW logo"} />
          </LazyLoad>
          <h3>द्वारा जनहित में जारी</h3>
          <h1>सामान्य प्रश्न</h1>
        </div>
        {!faqList.length && <div class="lds-dual-ring" />}
        {faqList.map((faq, index) => {
          return (
            <div
              key={index}
              className="faq fadeInUp"
              style={{ animationDelay: `${Math.min(0.8, 0.5 + index * 0.1)}s` }}
            >
              <h2 className="question">{faq.question}</h2>
              <h2 className="answer">{faq.answer}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FAQ;
