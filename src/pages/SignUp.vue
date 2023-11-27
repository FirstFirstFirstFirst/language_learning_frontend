<template>
  <q-page class="flex flex-center">
    <q-card dark bordered class="bg-grey-2 my-card q-px-md p-py-md">
      <div>
        <h2 style="color: black; font-weight: 50">Sign up</h2>
      </div>
      <q-card-section>
        <q-form @submit.prevent="signUp">
          <div>
            <q-input v-model="username" type="text" label="Username" />
          </div>
          <div>
            <q-input v-model="email" label="Email"> </q-input>
          </div>
          <div>
            <q-input v-model="password" label="Password"> </q-input>
          </div>
          <div>
            <q-input v-model="firstname" label="First Name"> </q-input>
          </div>
          <div>
            <q-input v-model="lastname" label="Last Name"> </q-input>
          </div>
          <div>
            <q-btn
              label="Sign up"
              type="submit"
              color="primary"
              style="width: 100%"
            />
          </div>
          <div>
            <text-caption style="color: black"
              >Registered?
              <a href="/">Login here</a>
            </text-caption>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";
import { Notify } from "quasar";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      role: "",
    };
  },
  methods: {
    signUp() {
      const apiUrl = "http://localhost:3000/api/auth/signup";

      axios
        .post(apiUrl, {
          username: this.username,
          email: this.email,
          password: this.password,
          firstname: this.firstname,
          lastname: this.lastname,
          role: "user",
        })
        .then((response) => {
          console.log("Response:", response.data);

          // Set user_id, role, and accessToken in local storage
          localStorage.setItem("user_id", response.data.id);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("accessToken", response.data.accessToken);

          Notify.create({
            type: "positive",
            message: "Registration successful!",
          });

          this.$router.push("/courses");
        })
        .catch((error) => {
          console.error("Error during sign-up:", error);

          Notify.create({
            type: "negative",
            message: "Registration failed. Please try again.",
          });
        });
    },
  },
};
</script>
