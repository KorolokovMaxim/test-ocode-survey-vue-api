import { createStore } from "vuex";
import { auth } from "./auth.module";
import { survey } from "./survey.module";
import { answers } from "./answers.module";
import {users} from "./user.module";


const store = createStore({
  modules: {
    auth,
    survey,
    answers,
    users
  },
});

export default store;
