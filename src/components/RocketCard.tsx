import React from "react";
import { FaCheckDouble, FaWindowClose } from "react-icons/fa";
import { Button, Card, Col } from "react-bootstrap";
// import RocketDetails from "./RocketDetails";
import { Link } from "react-router-dom";

const RocketCard = ({ item }: any) => {
  // const [showDetails, setShowDetails] = useState<boolean>(false);
  return (
    <>
      <Col>
        <Card className="bg-secondary text-center pt-2 text-info">
          <Card.Img
            className="mx-auto w-50 h-50"
            variant="top"
            src={item.links.mission_patch}
          />
          <Card.Body>
            <Card.Title className="text-center text-warning fs-3">
              {item.rocket.rocket_name}
            </Card.Title>
            <p className="fs-5">
              Launch Status:
              {item.launch_success ? (
                <FaCheckDouble className="text-success fs-3 mx-2" />
              ) : (
                <FaWindowClose className="text-danger fs-3 mx-2" />
              )}
            </p>
            <p className="fs-5">
              Is Upcoming:{" "}
              {item.upcoming ? (
                <FaCheckDouble className="text-success fs-3 mx-2" />
              ) : (
                <FaWindowClose className="text-danger fs-3 mx-2" />
              )}
            </p>
            <Link to={`/details/${item.flight_number}`}>
              <Button variant="warning">See Details</Button>
            </Link>
          </Card.Body>
          <Card.Footer className="text-center">
            <h6>Launch Date:</h6>
            <p>{item.launch_date_utc}</p>
          </Card.Footer>
        </Card>
      </Col>
      {/* {showDetails && (
				<RocketDetails
					rocketInfo={item}
					showDetails={showDetails}
					setShowDetails={setShowDetails}
				/>
			)} */}
    </>
  );
};

export default RocketCard;
