import React from "react";
import Checkbox from "../Checkbox";
import renderer from "react-test-renderer";

it("Renders disabled correctly", () => {
  const tree = renderer
    .create(
      <Checkbox disabled={true}>
        <span>My child</span>
      </Checkbox>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Renders enabled correctly", () => {
  const tree = renderer.create(<Checkbox disabled={false}></Checkbox>).toJSON();
  expect(tree).toMatchSnapshot();
});
