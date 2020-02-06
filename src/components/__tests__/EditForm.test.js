import React from "react";
import EditForm from "../EditForm";
import renderer from "react-test-renderer";
import { testReducer } from "../../reducers/__tests__/index.test";
import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(testReducer);

it("renders the edit form correctly", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <EditForm
          now={new Date("02/04/2020")}
          match={{
            path: "/:id/edit",
            url: "/4/edit",
            isExact: true,
            params: { id: "4" }
          }}
        />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
