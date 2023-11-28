<template>
  <div class="course-detail-page">
    <div v-if="course">
      <h2 class="text-h3 q-mb-md">{{ course.title }}</h2>
      <p class="text-body1 q-mb-md">{{ course.description }}</p>
      <p class="text-subtitle2 q-mb-md">Syllabus: {{ course.syllabus }}</p>
      <p class="text-subtitle2 q-mb-md">Price: ${{ course.pricing }}</p>

      <h3 class="text-h5 q-mb-md">Lesson Plans</h3>
      <ul class="q-pl-md">
        <li
          v-for="lessonPlan in course.lessonPlans"
          :key="lessonPlan.id"
          class="text-body2 q-mb-xs"
        >
          {{ lessonPlan.title }}
        </li>
      </ul>

      <h3 class="text-h5 q-mb-md">Sample Lessons</h3>
      <ul class="q-pl-md">
        <li
          v-for="lesson in course.sampleLessons"
          :key="lesson.id"
          class="text-body2 q-mb-xs"
        >
          {{ lesson.title }}
        </li>
      </ul>

      <q-btn
        v-if="shouldShowEnrollButton"
        @click="enroll"
        color="primary"
        label="Enroll"
        icon="school"
        class="q-mt-md"
        size="md"
      />

      <router-link to="/courses" class="text-subtitle1 q-mt-md"
        >Back to Course List</router-link
      >
    </div>
    <div v-else>
      <q-spinner-square size="80px" color="primary" />
      <p class="text-h6 q-mt-md">Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      course: null,
      isEnrolled: false,
      accessToken: null,
      userId: null,
      courseId: null,
    };
  },
  computed: {
    shouldShowEnrollButton() {
      return !this.isEnrolled;
    },
  },
  mounted() {
    this.courseId = this.$route.params.id;

    this.accessToken = localStorage.getItem("accessToken");
    this.userId = localStorage.getItem("user_id");

    axios
      .get(`http://localhost:3000/api/courses/${this.courseId}`)
      .then((response) => {
        this.course = response.data;
      })
      .catch((error) => {
        console.error("Error fetching course details:", error);
      });

    this.checkEnrollmentStatus();
  },
  methods: {
    checkEnrollmentStatus() {
      axios
        .get(
          `http://localhost:3000/api/enrollment/check/${this.userId}/${this.courseId}`,
          {
            headers: {
              "x-access-token": this.accessToken,
            },
          }
        )
        .then((response) => {
          this.isEnrolled = response.data.isEnrolled;
        })
        .catch((error) => {
          console.error("Error checking enrollment status:", error);
        });
    },
    enroll() {
      // Use userId and courseId to make the enrollment request
      const enrollmentData = {
        user_id: this.userId,
        course_id: this.courseId,
      };

      axios
        .post("http://localhost:3000/api/enrollment/", enrollmentData)
        .then((response) => {
          console.log("Enrollment successful:", response.data);
          this.isEnrolled = true;
        })
        .catch((error) => {
          console.error("Error enrolling:", error);
        });
    },
  },
};
</script>

<style scoped></style>
