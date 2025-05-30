<template>
    
  <div>
    <img class="logo-circle"  src="../assets/logo.png" alt="Logo" />
    <HeaderPage/>
    <h1>Home Page</h1>
    <input
  v-model="searchQuery"
  type="text"
  placeholder="Search by color, manufacturer, engine..."
  style="padding: 8px; margin-bottom: 20px; width: 300px; display: block; margin-left: auto; margin-right: auto;"
/>


    <!-- Car List -->
    <div style="display: flex; flex-wrap: wrap; gap: 16px; justify-content: center;">
>
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
  components:{
    HeaderPage
  },
  data() {
    return {
      cars: [],
      searchQuery: ''
    };
  },
  computed: {
    filteredCars() {
      // Convert to lowercase for case-insensitive search
      const query = this.searchQuery.toLowerCase();

      return this.cars.filter(car => {
        return (
          car.color.toLowerCase().includes(query) ||
          car.manufacturer_name.toLowerCase().includes(query) ||
          car.model_name.toLowerCase().includes(query) ||
          car.engine_specs.toLowerCase().includes(query) ||
          car.engine_type.toLowerCase().includes(query)
        );
      });
    }
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: SignUp });
    }

    // Load cars from your local JSON server (adjust URL as needed)
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
/* no changes */
</style>
