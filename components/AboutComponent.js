import React from "react";
import Image from "next/image";
import { Facebook, Twitter } from "@material-ui/icons";

function AboutComponent() {
  return (
    <div className="mt-10 p-2 min-h-[100vh]">
      {/* gistoracle logo */}
      <div className="relative w-[140px] h-[70px] md:w-[150px] md:h-[80px] lg:w-[170px] lg:h-[90px] mr-auto ml-auto mb-7 md:mb-10">
        <Image
          src="/images/gistoracle_logo.png"
          alt="Gist oracle logo"
          layout="fill"
          quality="100"
        />
      </div>

      {/* header */}
      <header className="text-center mb-8">
        <p
          className="text-xl md:text-2xl lg:text-4xl font-semibold text-gray-700"
          component="h1"
        >
          Welcome to Gistoracle
        </p>
        <p className="text-base md:text-lg lg:text-xl text-gray-700">
          Africa's online community
        </p>
      </header>

      {/* body of about page */}
      {/* origin */}
      <section className="max-w-[720px] mr-auto ml-auto text-center mb-5">
        <p className="text-gray-700">
          Gistoracle started as a blog in 2012 - gistoracle.blogspot.com. That
          little blog is now transformed to a forum today as{" "}
          <span className="text-[#800000]">
            <a href="/" style={{ textDecoration: "none" }}>
              gistoracle.com
            </a>
          </span>
          .
        </p>
      </section>

      {/* description */}
      <section className="max-w-[720px] mr-auto ml-auto text-center mb-8">
        <p className="text-gray-700">
          Gistoracle serves you endless discussions, articles, news and many
          more from a wide variety of communities we call shrines. If you're a
          sports fan, someone looking to catch the latest news and stories, or
          you just want to know why jellof rice is so popular, there is a shrine
          for you.
        </p>
      </section>

      {/* mail section */}
      <section className="text-center mb-5">
        <p className="text-gray-700">For General Enquiries</p>
        <p className="text-gray-700">Email: gistoracle@gmail.com</p>
      </section>

      {/* social secion */}
      <section className=" flex items-center space-x-4 justify-center">
        <a
          href="https://web.facebook.com/gistoracle"
          target="_blank"
          rel="noreferrer"
        >
          <span className="text-blue-800">
            <Facebook fontSize="large" />
          </span>
        </a>

        <a
          href="https://twitter.com/gistoracle"
          target="_blank"
          rel="noreferrer"
        >
          <span className="text-blue-800">
            <Twitter fontSize="large" />
          </span>
        </a>
      </section>
    </div>
  );
}

export default AboutComponent;
