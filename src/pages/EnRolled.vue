<template>
  <div>
    <h2>Enrolled Courses</h2>
    <ul v-if="enrollments.length > 0">
      <li v-for="(enrollment, index) in enrollments" :key="index">
        <h3>{{ enrollment.course_title }}</h3>
        <p>
          <strong>Enrollment Date:</strong> {{ enrollment.enrollment_date }}
        </p>
        <p>
          <strong>Course Description:</strong>
          {{ enrollment.course_description }}
        </p>
        <p><strong>Pricing:</strong> ${{ enrollment.course_pricing }}</p>
        <p><strong>Language:</strong> {{ enrollment.course_language }}</p>
        <p>
          <strong>Proficiency Level:</strong>
          {{ enrollment.course_proficiency_level }}
        </p>
        <p><strong>Instructor:</strong> {{ enrollment.instructor_name }}</p>

        <!-- Check if there are lesson details available -->
        <template v-if="enrollment.lesson_title && enrollment.lesson_content">
          <p><strong>Lesson Title:</strong> {{ enrollment.lesson_title }}</p>
          <p>
            <strong>Lesson Content:</strong> {{ enrollment.lesson_content }}
          </p>
        </template>
        <hr />
      </li>
    </ul>
    <div v-else>
      <p>No enrolled courses available.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      enrollments: [],
    };
  },
  async created() {
    // Retrieve the access token and user_id from localStorage
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("user_id");

    try {
      const response = await axios.get(
        `http://localhost:3000/api/enrollment/getEnroll/${userId}`,
        {
          headers: {
            "x-access-token": accessToken,
          },
        }
      );

      this.enrollments = response.data;
    } catch (error) {
      console.error("Error fetching enrollments", error);
    }
  },
};
</script>
