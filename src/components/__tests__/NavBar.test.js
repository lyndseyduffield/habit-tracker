import React from "react";
import NavBar from "../NavBar";
import renderer from "react-test-renderer";
import { StaticRouter } from "react-router";
import { testReducer } from "../../reducers/__tests__/index.test";
import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(testReducer);

it("renders the navbar correctly", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <StaticRouter>
          <NavBar location={{ pathname: "/" }} />
        </StaticRouter>
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
