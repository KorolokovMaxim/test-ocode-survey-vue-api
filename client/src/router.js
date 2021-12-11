import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
// lazy-loaded
const Profile = () => import("./components/Profile.vue")
const BoardAdmin = () => import("./components/admin/BoardAdmin.vue")
const AdminSurvey = () => import("./components/admin/Survey.vue");
const AdminQuestion = () => import("./components/admin/Question")
const BoardUser = () => import("./components/user/BoardUser.vue");
const SurveysCompleted = () => import("./components/user/SurveysCompleted.vue");
const SurveyCompleted = () => import("./components/user/SurveyCompleted.vue");
const UserSurvey = () => import("./components/user/Survey.vue");
const UsersAdminBoard = () => import("./components/admin/Users.vue")
const AdminUser = () => import("./components/admin/User")
const CompletedUserSurvey = () => import("./components/admin/CompletedUserSurvey.vue")
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/admin",
    name: "admin",
    // lazy-loaded
    component: BoardAdmin,
  },
  {
    path: "/admin/survey/:id",
    name: "admin-survey",
    component: AdminSurvey,
  },
  {
    path: "/admin/users",
    name: "admin-all-user",
    component: UsersAdminBoard
  },
  {
    path: "/admin/users/:id",
    name: "admin-user",
    component: AdminUser
  },
  {
    path: "/admin/users/:userId/:surveyId",
    name: "completed-user-survey",
    component: CompletedUserSurvey
  },
  {
    path: "/admin/question/:survey/:id",
    name: "admin-question",
    component: AdminQuestion
  },
  {
    path: "/user",
    name: "user",
    // lazy-loaded
    component: BoardUser,
  },
  {
    path: "/user/surveys/completed",
    name: "surveys-completed",
    component: SurveysCompleted,
  },
  {
    path: "/user/survey/:survey/completed",
    name: "survey-completed",
    component: SurveyCompleted,
  },
  {
    path: "/user/survey/:id",
    name: "user-survey",
    component: UserSurvey,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;