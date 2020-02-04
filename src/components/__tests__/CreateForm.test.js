import React from "react";
import CreateForm from "../CreateForm";
import renderer from "react-test-renderer";
import { testReducer } from "../../reducers/__tests__/index.test";
import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(testReducer);

it("renders the create form correctly", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <CreateForm />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
