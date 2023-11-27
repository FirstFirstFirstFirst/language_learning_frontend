<template>
  <q-page class="course-list-page q-pa-md">
    <div v-if="courses.length > 0">
      <h2 class="mb-8 text-lg font-semibold">Course Listing</h2>
      <q-list bordered class="mb-8">
        <q-item
          v-for="course in courses"
          :key="course.course_id"
          class="p-4 course-item transition duration-300 ease-in-out transform hover:shadow-md"
        >
          <q-item-section>
            <q-item-label>
              <h4 class="text-lg mb-4">{{ course.title }}</h4>
              <p class="mb-4">{{ course.description }}</p>
            </q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label class="flex flex-col">
              <div class="mb-2">
                <strong>Language:</strong> {{ course.language }}
              </div>
              <div class="mb-2">
                <strong>Proficiency Level:</strong>
                {{ course.proficiency_level }}
              </div>
              <div class="mb-2">
                <strong>Instructor:</strong> {{ course.instructor_name }}
              </div>
              <div class="text-primary">
                <strong>Pricing:</strong> ${{ course.pricing }}
              </div>
              <!-- Add View Details link -->
              <router-link
                class="text-accent mt-4"
                :to="{
                  name: 'course-detail',
                  params: { id: course.course_id },
                }"
              >
                View Details
              </router-link>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div v-else>
      <q-spinner-square size="80px" color="primary" />
      <div class="mt-4 text-lg">No courses available</div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      courses: [],
    };
  },
  methods: {
    async fetchCourses() {
      try {
        const response = await axios.get("http://localhost:3000/api/courses");
        this.courses = response.data;
      } catch (error) {
        console.error("Error fetching courses", error);
      }
    },
  },
  async created() {
    await this.fetchCourses();
  },
};
</script>
