<template>
  <div class="overflow">
    <q-page class="course-list-page q-pa-md">
      <div class="mb-4">
        <q-input
          v-model="searchQuery"
          filled
          standout
          placeholder="Search by title, language, level, or instructor"
          @input="filterCourses"
        />
      </div>

      <div v-if="filteredCourses.length > 0">
        <h2 class="mb-8 text-lg font-semibold">Course Listing</h2>
        <q-list bordered class="mb-8">
          <q-item
            v-for="course in filteredCourses"
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
                <div class="mb-2 inline-block" style="width: 250px">
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
        <router-link to="/enrolled">My enrolled</router-link>
      </div>
      <div v-else>
        <q-spinner-square size="80px" color="primary" />
        <div class="mt-4 text-lg">No courses available</div>
      </div>
    </q-page>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      courses: [],
      searchQuery: "",
    };
  },
  computed: {
    filteredCourses() {
      const query = this.searchQuery.toLowerCase();
      return this.courses.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.language.toLowerCase().includes(query) ||
          course.proficiency_level.toLowerCase().includes(query) ||
          course.instructor_name.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    async fetchCourses() {
      try {
        const response = await axios.get("http://localhost:3000/api/courses");
        this.courses = response.data;
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching courses", error);
      }
    },
    filterCourses() {
      // You can add additional logic here if needed
    },
  },
  async created() {
    await this.fetchCourses();
  },
};
</script>
