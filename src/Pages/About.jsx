import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h1 className="text-center mb-4">About Us</h1>
          <p className="text-center mb-4">
            {`JobHunt is more than just a job board - it's a community of job
            seekers, employers, and career experts dedicated to helping you
            succeed.`}
          </p>
          <Image
            src="about-us-image.jpg"
            alt="About Us Image"
            className="img-fluid mb-4"
          />
          <p>
            Our mission is to connect job seekers with their dream jobs and help
            employers find the best talent. We believe that everyone deserves a
            career that brings them fulfillment and happiness.
          </p>
          <p>
            {`
            Our team is comprised of experienced professionals from various
            industries, including HR, recruitment, and career coaching. We're
            passionate about helping people achieve their career goals and
            making a positive impact on the job market.`}
          </p>
          <h2 className="mb-3">Our Values</h2>
          <ul>
            <li>
              <i className="fas fa-check-circle" /> We believe in the power of
              community and collaboration.
            </li>
            <li>
              <i className="fas fa-check-circle" />
              {` We're committed to providing
              high-quality job listings and career resources.`}
            </li>
            <li>
              <i className="fas fa-check-circle" />
              {`We're dedicated to helping
              job seekers achieve their career goals.`}
            </li>
          </ul>
          <p className="text-center mb-4">
            Want to learn more about our team and how we can help you?{" "}
            <Link to="/contact">Get in touch with us!</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
