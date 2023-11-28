const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/LogIn.vue") },
      {
        path: "/courses",
        name: "course-listings",
        component: () => import("pages/CourseList.vue"),
      },
      {
        path: "/course/:id",
        name: "course-detail",
        component: () => import("pages/CourseDetail.vue"),
      },
      {
        path: "/signup",
        name: "signup",
        component: () => import("src/pages/SignUp.vue"),
      },
      {
        path: "/token",
        name: "token",
        component: () => import("src/pages/Token.vue"),
      },
      {
        path: "/enrolled",
        name: "enrolled",
        component: () => import("src/pages/EnRolled.vue"),
      },

    ],
  },
  {
    path: "/admin",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/AdminHome.vue") },
      {
        path: "userlist",
        name: "admin-user-list",
        component: () => import("pages/AdminUserlist.vue"),
      },
      {
        path: "enrollmentlist",
        name: "admin-enrollment-list",
        component: () => import("pages/AdminEnrollmentlist.vue"),
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
