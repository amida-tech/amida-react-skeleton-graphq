import React from "react";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faSpinner } from "@fortawesome/free-solid-svg-icons";

// mock facts to be used to generate rating.
const facts = [
  {
    identifier: "identifier-1",
    value: "value-1"
  }
];

const GET_RATING = gql`
  query GetRatings($facts: [Fact]!) {
    rating(facts: $facts) {
      value
    }
  }
`;

const RatingPage: React.FC = () => {
  const { error, data, refetch, loading } = useQuery(GET_RATING, {
    variables: { facts }
  });
  // todo: we can consider using useLazyQuery if we don't want it to query on render
  // const [getRatings, { data, error, loading }] = useLazyQuery(GET_RATING, { variables: { facts } });
  // use refetch in order to call API every time. useQuery will return cached value by default
  // var loading = true
  // var loading = true
  console.log(loading);
  if (error) return <p>{"Error :("}</p>;
  return (
    <div className="rating-page">
      <header
        className={
          loading ? "rating-page__header-disabled" : "rating-page__header"
        }
      >
        {loading ? <FontAwesomeIcon icon={faSpinner} /> : null}
        <button
          className={
            loading ? "rating-page__button-disabled" : "rating-page__button"
          }
          onClick={() => refetch()}
        >
          {"Fetch Rating"}
        </button>
        {loading ? (
          <div className="login-prompt__login-notice">
            <i
              className="fa fa-spinner fa-pulse"
              style={{ marginRight: "0.5rem" }}
            ></i>{" "}
            Logging in…
          </div>
        ) : null}
        <div>{`The rating value is: ${data && data.rating.value}`}</div>
        <div>
          <Link to={"/app"}>{"Go to back to Home Page"}</Link>
        </div>
      </header>
    </div>
  );
};

export default RatingPage;
