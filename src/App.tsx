import { useEffect, useState } from "react";
import { Button, Card, Row, Col, Pagination } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchLaunches } from "./features/launch/launchSlice";
import moment from "moment";
import { FaCheckDouble, FaWindowClose } from "react-icons/fa";

function App() {
  const launch = useAppSelector((state) => state.launch);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchLaunches());
  }, [dispatch]);
  const { launches, loading, error } = launch;

  //Search Functionalities:
  const [searchText, setSearchText] = useState<string>("");
  const searchItems = launches.filter((item) =>
    item.rocket.rocket_name.toLowerCase().includes(searchText)
  );
  let renderedItems = searchText ? searchItems : launches;

  //Filtering Functionalities:
  const [filters, setFilters] = useState({
    launchDate: "",
    launchStatus: "",
    isUpcoming: "",
  });

  //Filter by Date:::
  const filterByLastDate = (items: any, numOfType: number, dateType: any) => {
    const today = new Date();
    const startOfPrevType = moment(today)
      .subtract(numOfType, dateType)
      .startOf(dateType)
      .format("LLLL");
    const endOfPrevType = moment(today)
      .subtract(numOfType, dateType)
      .endOf(dateType)
      .format("LLLL");

    const filteredData = items.filter((item: any) =>
      moment(item.launch_date_utc).isBetween(startOfPrevType, endOfPrevType)
    );
    return filteredData;
  };

  //Filter by Launch Status:::
  const filterByLaunchStatus = (items: any, status: boolean | null) => {
    const filteredData = items.filter((item: any) => {
      return item.launch_success === status;
    });

    return filteredData;
  };

  //Filter by Launch Upcoming:::
  const filteredByUpcoming = (items: any, status: boolean) => {
    const filteredData = items.filter((item: any) => {
      return item.upcoming === status;
    });

    return filteredData;
  };

  renderedItems =
    filters.launchDate === "last-week"
      ? filterByLastDate(renderedItems, 1, "week")
      : filters.launchDate === "last-month"
      ? filterByLastDate(renderedItems, 1, "month")
      : filters.launchDate === "last-year"
      ? filterByLastDate(renderedItems, 1, "year")
      : filters.launchDate === "last-5-year"
      ? filterByLastDate(renderedItems, 5, "year")
      : renderedItems;

  renderedItems =
    filters.launchStatus === "true"
      ? filterByLaunchStatus(renderedItems, true)
      : filters.launchStatus === "false"
      ? filterByLaunchStatus(renderedItems, null)
      : renderedItems;

  renderedItems =
    filters.isUpcoming === "true"
      ? filteredByUpcoming(renderedItems, true)
      : filters.isUpcoming === "false"
      ? filteredByUpcoming(renderedItems, false)
      : renderedItems;

  //Pagination Func:::
  const [itemsInPage, setItemsInPage] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages: number = Math.ceil(renderedItems.length / itemsInPage);
  const sliceItems = renderedItems.slice(
    itemsInPage * (currentPage - 1),
    itemsInPage * currentPage
  );
  const handleNext = () => {
    const activePage = currentPage < totalPages ? currentPage + 1 : totalPages;
    setCurrentPage(activePage);
    window.scrollTo(0, 0);
  };
  const handlePrev = () => {
    const activePage = currentPage > 1 ? currentPage - 1 : 1;
    setCurrentPage(activePage);
    window.scrollTo(0, 0);
  };
  const handleFirst = () => {
    setCurrentPage(1);
    window.scrollTo(0, 0);
  };
  const handleLast = () => {
    setCurrentPage(totalPages);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-dark text-light">
      <header className="sticky-top bg-success">
        <div className="container pb-3 pt-1 text-center">
          <a
            href="/"
            className="fs-1 text-decoration-none d-block text-warning fw-bold border-bottom border-2 border-warning pb-2 mb-3"
          >
            Space TechNext
          </a>
          <div className="row g-3">
            <h4 className="mt-3">Search and Select Filtering...</h4>
            <div className="col-md-3 col-12">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search by Rocket Name"
                className="form-control py-2 fs-5"
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className="col-md-9 col-12 d-flex flex-column flex-md-row">
              <select
                className="form-select form-select-lg"
                aria-label=".form-select-lg example"
                onChange={(e) =>
                  setFilters({ ...filters, launchDate: e.target.value })
                }
              >
                <option selected>Launch Date</option>
                <option value="last-week">Last Week</option>
                <option value="last-month">Last Month</option>
                <option value="last-year">Last Year</option>
                <option value="last-5-year">Last 5 Year</option>
              </select>
              <select
                className="form-select form-select-lg mx-md-3 my-2 my-md-0"
                aria-label=".form-select-lg example"
                onChange={(e) =>
                  setFilters({ ...filters, launchStatus: e.target.value })
                }
              >
                <option selected>Launch Status</option>
                <option value="true">Success</option>
                <option value="false">Failure</option>
              </select>
              <select
                className="form-select form-select-lg"
                aria-label=".form-select-lg example"
                onChange={(e) =>
                  setFilters({ ...filters, isUpcoming: e.target.value })
                }
              >
                <option selected>Is Upcoming</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <h5>
              Total Rendered Items:{" "}
              <span
                className={`px-3 py-2 rounded-pill fs-3 ${
                  renderedItems.length > 0
                    ? "bg-info text-light"
                    : "bg-danger text-warning"
                }`}
              >
                {renderedItems.length}
              </span>
            </h5>
          </div>
        </div>
      </header>
      <main className="container py-5">
        {loading ? (
          <div className="gx-2 d-flex align-items-center justify-content-center">
            <div className="spinner-grow text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-warning mx-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error !== "" ? (
          <div>{error}</div>
        ) : (
          <Row xs={1} sm={1} md={4} className="g-4">
            {renderedItems.length ? (
              <>
                {sliceItems.map((item, index) => {
                  return (
                    <Col key={index}>
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
                          <Button variant="warning">See Details</Button>
                        </Card.Body>
                        <Card.Footer className="text-center">
                          <h6>Launch Date:</h6>
                          <p>{item.launch_date_utc}</p>
                        </Card.Footer>
                      </Card>
                    </Col>
                  );
                })}
              </>
            ) : (
              <div className="col-12 mx-auto w-100">
                <h2 className="text-center">
                  Search Result Not Found. Please search again
                </h2>
              </div>
            )}
          </Row>
        )}
        {sliceItems.length > 0 ? (
          <div className="d-flex align-items-center justify-content-between flex-column flex-md-row ">
            <div>
              <span>How many items in a page: </span>
              <select
                className="p-md-2 fs-md-5"
                aria-label=".form-select-lg"
                onChange={(e) => setItemsInPage(Number(e.target.value))}
              >
                <option value="4">4</option>
                <option value="8" selected>
                  8
                </option>
                <option value="10">10</option>
                <option value="12">12</option>
                <option value="16">16</option>
              </select>
            </div>
            <Pagination className="fs-md-5 pt-3">
              <Pagination.First onClick={handleFirst}>1</Pagination.First>
              <Pagination.Prev onClick={handlePrev}>Prev</Pagination.Prev>
              <Pagination.Item active>{currentPage}</Pagination.Item>
              <Pagination.Next onClick={handleNext}>Next</Pagination.Next>
              <Pagination.Last onClick={handleLast}>
                {totalPages}
              </Pagination.Last>
            </Pagination>
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default App;
