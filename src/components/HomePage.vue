<template>
  <div>
    <HeaderPage />
    <img class="logo-circle" src="../assets/logo.png" alt="Logo" />

    <h1>Hello {{ name }}, if you are at the right place</h1>
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search by color, manufacturer, engine..."
      style="
        padding: 16px;
        margin-bottom: 24px;
        width: 320px;
        display: block;
        margin-left: auto;
        margin-right: auto;
        border: 3px solid #0077b6;
        border-radius: 12px;
        background-color: #f1faff;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        font-family: 'Segoe UI', sans-serif;
        color: #023e8a;
      "
    />

    <!-- Car List -->
    <div style="display: flex; flex-wrap: wrap; gap: 16px; justify-content: center;">
      <div
        v-for="(car, index) in filteredCars"
        :key="index"
        style="border: 1px solid #ccc; border-radius: 8px; padding: 16px; width: 300px;"
      >
        <img
          :src="car.image_url"
          :alt="car.model_name"
          style="width: 100%; height: auto; object-fit: cover; border-radius: 4px;"
        />
        <h2>{{ car.manufacturer_name }} {{ car.model_name }}</h2>
        <p>Manufacturer: {{ car.manufacturer_name }}</p>
        <p>Engine: {{ car.engine_specs }} {{ car.engine_type }}</p>
        <p>Color: {{ car.color }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import SignUp from './SignUp.vue';
import HeaderPage from './HeaderPage.vue';

export default {
  name: 'HomePage',
  components: {
    HeaderPage
  },
  data() {
    return {
      name: '',
      cars: [],
      searchQuery: ''
    };
  },
  computed: {
    filteredCars() {
      const keywords = this.searchQuery.toLowerCase().split(' ').filter(Boolean);

      return this.cars.filter(car => {
        const combinedData = `
          ${car.color}
          ${car.manufacturer_name}
          ${car.model_name}
          ${car.engine_specs}
          ${car.engine_type}
        `.toLowerCase();

        return keywords.every(word => combinedData.includes(word));
      });
    }
  },
  mounted() {
    const user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: SignUp });
    } else {
      this.name = JSON.parse(user).name;
    }

    fetch("http://localhost:3001/cars")
      .then(res => res.json())
      .then(data => {
        this.cars = data;
      });
  }
};
</script>

<style scoped>
.logo-circle {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: contain;
  border: 2px solid #ddd;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.logo-circle:hover {
  transform: scale(1.05);
}
</style>
