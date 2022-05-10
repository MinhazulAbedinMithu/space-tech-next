import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Header from "./Header";
import Loading from "./Loading";

const RocketDetails = () => {
  const { flightNumber } = useParams();
  // const [loading, setLoading] = useState<boolean>(false);
  const [flightData, setFlightData] = useState<any>(null);

  const fetchSingleFlight = async (fNumber: string | undefined) => {
    try {
      const res = await axios
        .get(`https://api.spacexdata.com/v3/launches/${fNumber}`)
        .then((response) => response.data);

      setFlightData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleFlight(flightNumber);
  }, [flightNumber]);

  return (
    <Container className="text-light">
      <Header />
      <div className="col-3">
        <Link
          to="/"
          className="text-underline-none btn btn-warning fs-4 d-flex align-items-center justify-content-center w-75"
        >
          <FaHome className="fs-2" />
          <span className="ps-2">Back to Home</span>
        </Link>
      </div>
      {!flightData ? (
        <Loading />
      ) : (
        <Row>
          <Col md={8} sm={12} className="mx-auto">
            <div className="text-center">
              <img
                src={flightData.links.mission_patch_small}
                className="img-fluid"
              />
              <h4>Mission Name: {flightData.mission_name}</h4>
              <h2> {flightData.rocket.rocket_name}</h2>
            </div>
            <div className="text-left">
              {flightData.launch_success ? null : (
                <p>
                  <b>Launch Failure Details: </b>
                  {flightData.launch_failure_details.reason}
                </p>
              )}
              <p>
                <b>Details: </b>
                {flightData.details}
              </p>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default RocketDetails;
