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
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
