import { decodeState, reduce } from "../../store/reducers";
import testState from "./testState.json";
import moment from "moment";

// Use to create mock stores for testing purposes. Use:
//
// ```js
// const store = createStore(testReducer)
// ...
// <Provider store={store}><MyTestConnectedComponent /></Provider>
// ```
export function testReducer(state = decodedState, action) {
  return reduce(state, action);
}

const decodedState = {
  initialized: true,
  currentUser: "lyndseyduffield",
  userStates: {
    lyndseyduffield: {
      lastId: 0,
      habits: {
        0: {
          title: "go to the gym",
          goal: "lose some weight",
          accountabilityPartner: { name: "bob smith", email: "bob@gmail.com" },
          startDate: moment(
            "2020-01-28T08:00:00.000Z",
            moment.ISO_8601
          ).startOf("day"),
          endDate: moment("2020-02-01T08:00:00.000Z", moment.ISO_8601).startOf(
            "day"
          ),
          streak: [true, false, false, false, false],
        },
      },
    },
  },
};

it("decodes the `state` from local storage", () => {
  expect(decodeState(testState)).toEqual(decodedState);
});
