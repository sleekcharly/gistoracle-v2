// bring in types
import { SET_FEATURED_NAV_CATEGORIES } from "../types/uiTypes";

import axios from "axios";

export const getFeaturedNavCategories = dispatch => {
  axios
    .get("/api/ui/featuredNavCategories")
    .then(res => {
      dispatch({
        type: SET_FEATURED_NAV_CATEGORIES,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
