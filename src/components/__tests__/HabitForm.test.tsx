import React from "react";
import HabitForm from "../HabitForm";
import renderer from "react-test-renderer";
import { testReducer } from "../../reducers/__tests__/index.test";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Route, RouteComponentProps, StaticRouter } from "react-router-dom";

const store = createStore(testReducer);

const now = new Date("02/04/2020");

it("renders the form in edit mode correctly", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <StaticRouter>
          <Route
            render={(props: RouteComponentProps) => (
              <HabitForm {...props} now={now} id={0} />
            )}
          />
        </StaticRouter>
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
