<template>
  <div class="m-4">
    <div class="row">
      <div class="col-4 border-top shadow pl-3 pr-3">
        <h4 class="pt-3">Create Skill</h4>
        <form>
          <div class="form-group">
            <label for="exampleFormControlInput1">Skill Name</label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Skill Name"
              v-model="skillName"
            />
            <span class="error text-danger" v-if="errors && errors.skillName">{{
              errors.skillName
            }}</span>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Description</label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Description"
              v-model="description"
            />
          </div>
        </form>
        <button class="btn btn-primary" @click="handleCreate">Create</button>
      </div>

      <!----------------------------------Skills listing ----------------------------------->

      <div
        class="col-8 border-left border-top shadow pl-3 ml-auto table-responsive"
      >
        <h4 class="pt-3 pb-3">Skills</h4>
        <list-component
          :dataKeys="dataKeys"
          :dataValues="skills"
          :listOf="'skills'"
        />
      </div>
    </div>
    <loader-component :isLoading="isLoading" />
  </div>
</template>

<script>
import LoaderComponent from "@/components/LoaderComponent.vue";
import { mapState } from "vuex";
import { ALPHABET_REGEX, validate } from "../utils/validations";
import ListComponent from "@/components/ListComponent.vue";

export default {
  components: { LoaderComponent, ListComponent },
  name: "HomeView",
  computed: {
    ...mapState(["timezones", "apiSuccess", "skills"]),
  },
  data() {
    return {
      isLoading: false,
      skillName: "",
      description: "",
      errors: null,
      dataKeys: ["Skill name", "Description"],
    };
  },
  methods: {
    validateFields() {
      const errors = {};

      if (!validate(this.skillName, ALPHABET_REGEX))
        errors.skillName = "Please enter skill name";

      return errors;
    },
    async handleCreate() {
      this.errors = this.validateFields();
      if (Object.keys(this.errors).length > 0) {
        this.$toast.error("Name is required.", {
          type: "error",
          position: "top-right",
          duration: 2000,
        });
      } else {
        let payload = {
          name: this.skillName,
          description: this.description,
          category_id: 1,
        };
        this.isLoading = true;
        await this.$store.dispatch("createSkill", payload);
        this.isLoading = false;
        if (this.apiSuccess) {
          this.$toast.success("Skill Created Successfully!");
          this.skillName = "";
          this.description = "";
          await this.$store.dispatch("fetchSkills");
        }
      }
    },
  },
  async mounted() {
    this.isLoading = true;
    await this.$store.dispatch("fetchSkills");
    this.isLoading = false;
  },
};
</script>
<style lang="scss" scoped>
.error {
  font-size: 0.8em;
}
</style>
