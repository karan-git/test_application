<template>
  <div class="m-4">
    <div class="row">
      <div class="col-4 border-top shadow pl-3 pr-3 mb-4">
        <h4 class="pt-3">Create User</h4>
        <form>
          <div class="form-group">
            <label for="exampleFormControlInput1">First name</label>
            <input
              type="text"
              class="form-control"
              placeholder="First name"
              v-model="firstName"
            />
            <span class="error text-danger" v-if="errors && errors.firstName">{{
              errors.firstName
            }}</span>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Last name</label>
            <input
              type="text"
              class="form-control"
              placeholder="Last name"
              v-model="lastName"
            />
            <span class="error text-danger" v-if="errors && errors.lastName">{{
              errors.lastName
            }}</span>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Phone</label>
            <input
              type="text"
              class="form-control"
              placeholder="Phone"
              v-model="phone"
            />
            <span class="error text-danger" v-if="errors && errors.phone">{{
              errors.phone
            }}</span>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Login Id</label>
            <input
              type="text"
              class="form-control"
              placeholder="Unique login id"
              v-model="loginId"
            />
            <span class="error text-danger" v-if="errors && errors.loginId">{{
              errors.loginId
            }}</span>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Password</label>
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              v-model="password"
            />
            <span class="error text-danger" v-if="errors && errors.password">{{
              errors.password
            }}</span>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Role</label>
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              v-model="role"
            >
              <option value="" selected disabled>Select Role</option>
              <option value="caller">Caller</option>
              <option value="administrative">Administrative</option>
            </select>
            <span class="error text-danger" v-if="errors && errors.role">{{
              errors.role
            }}</span>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect2">Timezone</label>
            <select class="form-control" v-model="timezone">
              <option value="" selected disabled>Select Timezone</option>
              <option
                :value="timezone"
                v-for="(timezone, i) in timezones"
                :key="i"
              >
                {{ timezone }}
              </option>
            </select>
            <span class="error text-danger" v-if="errors && errors.timezone">{{
              errors.timezone
            }}</span>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect2"
              >Skills (For select multiple press CTRL + CLICK)</label
            >
            <select class="form-control" multiple v-model="selectedSkills">
              <option value="" selected disabled>Select Skills</option>
              <option :value="skill.id" v-for="(skill, i) in skills" :key="i">
                {{ skill.name }}
              </option>
            </select>
            <span
              class="error text-danger"
              v-if="errors && errors.selectedSkills"
              >{{ errors.selectedSkills }}</span
            >
          </div>
        </form>
        <button class="btn btn-primary mt-2" @click="handleCreate">
          Create
        </button>
      </div>

      <!----------------------------------User listing ----------------------------------->

      <div
        class="col-8 border-left border-top shadow pl-3 ml-auto table-responsive"
      >
        <h4 class="pt-3 pb-3">Users</h4>
        <list-component
          :dataKeys="dataKeys"
          :dataValues="filteredUsers"
          :listOf="'users'"
          @deleteUser="handleDeleteUser"
        />
      </div>
    </div>
    <loader-component :isLoading="isLoading" />
  </div>
</template>

<script>
import LoaderComponent from "@/components/LoaderComponent.vue";
import { mapState } from "vuex";
import {
  ALPHABET_REGEX,
  EMAIL_REGEX,
  MOBILE_REGEX,
  validate,
} from "../utils/validations";
import ListComponent from "@/components/ListComponent.vue";

export default {
  components: { LoaderComponent, ListComponent },
  name: "HomeView",
  computed: {
    ...mapState(["timezones", "apiSuccess", "users", "skills"]),
    filteredUsers() {
      return this.users && this.users.length > 0
        ? this.users.filter((n) => n.is_active)
        : this.users;
    },
  },
  data() {
    return {
      isLoading: false,
      firstName: "",
      lastName: "",
      loginId: "",
      password: "",
      phone: "",
      role: "",
      timezone: "",
      dataKeys: ["First name", "Last name", "Login id", "Role", "Skills"],

      selectedSkills: [],
      // skills: ["Java", "C"],
      errors: null,
    };
  },
  methods: {
    validateFields() {
      const errors = {};

      if (!validate(this.firstName, ALPHABET_REGEX))
        errors.firstName = "Please enter first name";

      if (!validate(this.lastName, ALPHABET_REGEX))
        errors.lastName = "Please enter last name";

      if (!validate(this.phone, MOBILE_REGEX))
        errors.phone = "Please enter a valid phone number";

      if (!validate(this.loginId, EMAIL_REGEX))
        errors.loginId = "Please enter a valid email id";

      if (this.password == "") errors.password = "Please enter password";

      if (this.role == "") errors.role = "Please select role";

      if (this.timezone == "") errors.timezone = "Please select timezone";

      if (this.selectedSkills.length == 0)
        errors.selectedSkills = "Please select skills";

      return errors;
    },
    async handleCreate() {
      this.errors = this.validateFields();
      if (Object.keys(this.errors).length > 0) {
        this.$toast.error("Please complete all the fields.", {
          type: "error",
          position: "top-right",
          duration: 2000,
        });
      } else {
        // let extension = Math.floor(Math.random() * (999 - 100 + 1) + 100);
        let payload = {
          first_name: this.firstName,
          last_name: this.lastName,
          login_id: this.loginId,
          password: this.password,
          role: this.role,
          timezone: this.timezone,
          user_skills: this.selectedSkills,
          location: "Default",
          phone: this.phone,
        };
        console.log(payload);
        this.isLoading = true;
        await this.$store.dispatch("createUser", payload);
        this.isLoading = false;
        if (this.apiSuccess) {
          this.$toast.success("User Created Successfully!");
          this.firstName = "";
          this.lastName = "";
          this.loginId = "";
          this.password = "";
          this.role = "";
          this.timezone = "";
          this.selectedSkills = [];
          this.phone = "";
          this.isLoading = true;
          await this.$store.dispatch("fetchUsers");
          this.isLoading = false;
        }
      }
    },

    async handleDeleteUser(payload) {
      this.isLoading = true;
      await this.$store.dispatch("deleteUserById", payload);
      this.isLoading = false;
      if (this.apiSuccess) {
        this.$toast.success("Successfully Deleted!");
        setTimeout(async () => {
          this.isLoading = true;
          await this.$store.dispatch("fetchUsers");
          this.isLoading = false;
        }, 1500);
      }
    },
  },
  async mounted() {
    this.isLoading = true;
    await this.$store.dispatch("fetchTimeZone");
    await this.$store.dispatch("fetchUsers");
    this.isLoading = false;
    await this.$store.dispatch("fetchSkills");
  },
};
</script>
<style lang="scss" scoped>
.error {
  font-size: 0.8em;
}
form {
  height: 70vh;
  overflow-y: scroll;
  padding-right: 0.5em;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(168, 168, 168);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(138, 138, 138);
}
</style>
