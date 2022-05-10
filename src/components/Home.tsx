import moment from "moment";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchLaunches } from "../features/launch/launchSlice";
import Header from "./Header";
import Loading from "./Loading";
import PagePagination from "./PagePagination";
import PaginationController from "./PaginationController";
import RocketCard from "./RocketCard";
import SearchFilter from "./SearchFilter";

const Home = () => {
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
    <div className="bg-dark text-light position-relative">
      <header className="sticky-top bg-success">
        <Header />
        <SearchFilter
          setSearchText={setSearchText}
          filters={filters}
          setFilters={setFilters}
          renderedItems={renderedItems}
        />
      </header>
      <main className="container py-5">
        {loading ? (
          <Loading />
        ) : error !== "" ? (
          <div>{error}</div>
        ) : (
          <Row xs={1} sm={1} md={4} className="g-4">
            {renderedItems.length ? (
              <>
                {sliceItems.map((item) => {
                  return <RocketCard key={item.flight_number} item={item} />;
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
            <PaginationController setItemsInPage={setItemsInPage} />
            <PagePagination
              handleFirst={handleFirst}
              handleNext={handleNext}
              handlePrev={handlePrev}
              handleLast={handleLast}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default Home;
