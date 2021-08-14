// bring in reducer types
import { SET_FEATURED_NAV_CATEGORIES } from "../types/uiTypes";

const initialState = {
  featuredNavCategories: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_FEATURED_NAV_CATEGORIES:
      return {
        ...state,
        featuredNavCategories: action.payload
      };

    default:
      return state;
  }
}
