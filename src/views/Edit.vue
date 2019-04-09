<template>
  <div class="counter-edit">
    <form class="counter-form" @submit.prevent="onSubmit">
      <div
        class="counter-form-caption"
      >Enter your countdown title and date. Then choose an image from dropdown or enter an image URL</div>
      <div class="form-field">
        <label for="title">Title:</label>
        <input id="title" v-model="title" placeholder="Counter description">
      </div>
      <div class="form-field">
        <label for="datetime">Date:</label>
        <input type="datetime-local" id="datetime" v-model="datetime">
      </div>
      <div class="form-field">
        <label for="imgUrl">Image name:</label>
        <select v-model="imgName">
          <option disabled value>Please select one</option>
          <option v-for="(name, index) in imgNames" :key="index" :value="name">{{ name }}</option>
        </select>
      </div>
      <div class="form-field">
        <label for="imgUrl">Image URL:</label>
        <input type="url" id="imgUrl" v-model="imgUrl">
      </div>
      <div class="button-wrapper">
        <tfc-base-button text="Submit" :type="isValid ? 'positive' : 'disabled'" @click="onSubmit"/>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment, { Moment } from "moment";
import TfcBaseButton from "../components/BaseButton.vue";

@Component({
  components: {
    TfcBaseButton
  }
})
export default class TfcEdit extends Vue {
  id: number = moment()
    .toDate()
    .getTime();
  title: string = "";
  datetime: string = "";
  imgName: string = "";
  imgUrl: string = "";

  mounted() {
    if (this.isEditing) {
      this.id = Number(this.$route.params.id);
      const counter = this.$store.getters.getCounter(this.id);
      this.title = counter.title;
      this.datetime = counter.moment.format("YYYY-MM-DDTHH:mm:ss");
      this.imgName = counter.imgName;
      this.imgUrl = counter.imgUrl;
    }
  }

  onSubmit() {
    if (this.isValid) {
      const counter = {
        id: this.id,
        title: this.title,
        moment: moment(`${this.datetime}`, "YYYY-MM-DDTHH:mm"),
        imgName: this.imgName,
        imgUrl: this.imgUrl
      };
      if (this.isEditing) {
        this.$store.dispatch("editCounter", counter);
      } else {
        this.$store.dispatch("addCounter", counter);
      }
    }
  }

  get isValid() {
    return this.title && this.datetime && (this.imgName || this.imgUrl);
  }

  get isEditing(): boolean {
    return this.$route.path.includes("edit");
  }

  get imgNames(): String[] {
    return this.$store.state.imgNames;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.counter-edit {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.counter-form-caption {
  margin-bottom: 30px;
  text-align: center;
  font-size: 18px;
}

.counter-form {
  display: flex;
  width: 50%;
  flex-direction: column;
  font-size: 22px;
}

.form-field {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.form-field label,
input {
  font-family: $typeface-menus;
  font-size: 22px;
}

label {
  width: 30%;
}

input,
select {
  margin-left: 20px;
  border: none;
  border-bottom: 1px solid $base-dark-grey;
  background-color: #fff0; // transparent
  flex: 1;
}

.button-wrapper {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  text-align: center;
}

@media (max-width: 480px) {
  .counter-form-caption {
    font-size: 16px;
  }

  .counter-form {
    width: 100%;
    font-size: 18px;
  }

  .form-field label,
  input {
    font-size: 18px;
  }
}
</style>