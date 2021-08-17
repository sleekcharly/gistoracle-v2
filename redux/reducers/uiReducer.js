// bring in reducer types
import {
  SET_FEATURED_NAV_CATEGORIES,
  DARK_MODE_ON,
  DARK_MODE_OFF,
} from "../types/uiTypes";
import Cookies from "js-cookie";

const initialState = {
  featuredNavCategories: [],
  darkMode: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FEATURED_NAV_CATEGORIES:
      return {
        ...state,
        featuredNavCategories: action.payload,
      };
    case DARK_MODE_ON:
      return { ...state, darkMode: true };
    case DARK_MODE_OFF:
      return { ...state, darkMode: false };

    default:
      return state;
  }
}
