import React from "react";
import Navbar from "./HomePage Components/Navbar";
import Hero from "./HomePage Components/Hero";
import Card from "./HomePage Components/Card";
import Footer from "./HomePage Components/Footer";
import Stats from "./HomePage Components/Stats";
import Uico from "./HomePage Components/uicomponents";
import Slider from "./HomePage Components/Sliderpg";
import Vision from "./HomePage Components/Vision";

import card1 from "/ai-technology.png";
import card2 from "/law.png";
import card3 from "/data-analysis.png";
import vision from "/vision.png";
import mission from "/mission.png";

const HomePage = () => {
  const cards = [
    {
      title: "AI Integration",
      info: "Explore the power of AI in modern systems for efficiency and automation.",
    },
    {
      title: "Legal Tech",
      info: "Understand how AI is transforming the legal landscape through analysis.",
    },
    {
      title: "Data Insights",
      info: "Unlock critical insights from complex datasets with ease.",
    },
  ];

  const stats = [

      {
        img: "/pending-tasks.png",
        name: "Cases Pending",
        value: "There are 4.7 Million cases pending.",
        percentage: "which is very concerning",
      },
      {
        img: "/judge-chair.png",
        name: "Judges per Population",
        value: "The ratio is about 21 judges per million people",
        percentage: "50%",
      },
      {
        img: "/case-file.png",
        name: "Case Disposal Time",
        value: "Case disposal time takes about 5 to 7 years",
        percentage: "50%",
      },
      {
        img: "/management.png",
        name: "Case Management",
        value: "The Case Management Systems are highly Improper",
        percentage: "50%",
      },
  
  ];

  const visionData = {
    title: "Our Vision",
    info: "Empowering students and professionals through AI-driven mentorship and collaboration.",
  };

  const missionData = {
    title: "Our Mission",
    info: "To bridge the gap between learners and industry experts using cutting-edge technology.",
  };

  const footerData = {
    title: "Contact Us",
    mail: "support@example.com",
    no: "+91-9876543210",
  };

  return (
    <div>
      <div className="container relative mx-auto px-5 md:px-10 w-full">
        <Navbar
          title="/new-logo.svg"
          navitem1="Home"
          navLink1="/"
          navitem2="About"
          navLink2="#"
          navitem3="Services"
          navLink3="#"
          navitem4="Contact"
          navLink4="#"
          navitem5="timepass"
          navLink5="#"
          button="Sign In"
          buttonLink="/btn"
        />
        <section className="relative">
          <div className="absolute w-full bg-gradient-to-r from-grad1 via-grad1 to-grad1 opacity-50 blur-2xl animate-pulse"></div>
          <Hero />
        </section>
      </div>

      {/* Stats section moved outside container for full width */}
      <section className="md:p-10 bg-blue-600 text-white w-full">
        <div className="grid grid-cols-1 place-items-center gap-3">
          <div className="flex flex-col gap-5 py-6">
            <h1 className="text-center text-3xl md:text-4xl font-bold font-playfair">
              Empowering Through Innovation
            </h1>
            <h3 className="text-center lg:text-2xl md:text-xl text-gray-100 md:px-10">
              We connect learners with industry experts and mentors using
              artificial intelligence to guide, grow, and innovate together.
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 mx-6 gap-5 mt-5">
            {stats.map((stat, index) => (
              <Stats
                key={index}
                img={stat.img}
                name={stat.name}
                value={stat.value}
                percentage={stat.percentage}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Continue with container for other sections */}
      <div className="container relative mx-auto px-5 md:px-10 w-full">
        <div className="flex flex-col px-3">
          <Slider />
        </div>
        </div>

        <section className="grid md:grid-cols-2 bg-blue-600  gap-x-5 mx-auto items-center place-items-center mt-2">
         <Vision
  img="/vision.png"
  title="Our Vision"
  info="To revolutionize the legal industry by leveraging AI to deliver transparent, efficient, and accessible legal solutions."
/>

<Vision
  img="/mission.png"
  title="Our Mission"
  info="To empower individuals and organizations with intuitive, AI-driven tools that simplify complex legal processes."
  reverse // This will flip the layout for the 'diagonal' effect
/>

        </section>
              <div className="container relative mx-auto px-5 md:px-10 w-full">
        <section className="py-12 md:py-16 px-4 md:px-10 bg-white">
          <div className="max-w-7xl mx-auto">

              <h2 className="text-3xl md:text-4xl font-bold mb-5 text-center font-playfair ">Frequently Asked Questions</h2>
            
            <div className="">
             <Card />
            </div>
          </div>
        </section>


      </div>

      <footer className="p-10  mt-10 shadow bg-blue-700">
        <Footer title={footerData.title} mail={footerData.mail} no={footerData.no} />
      </footer>
    </div>
  );
};

export default HomePage;