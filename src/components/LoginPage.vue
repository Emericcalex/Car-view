<template>
    <div class="container">
    <div class="signup-form">
    <img class="logo-circle"  src="../assets/logo.png" alt="Logo" />
    <h1>Login Page</h1>
   
      
      <input type="email" v-model="email" placeholder="Enter Email" />
      <input type="password" v-model="password" placeholder="Enter Password" />
      <button v-on:click="login" class="button">Sign In</button>
      <router-link to="/SignUp"> Sign Up</router-link>
      </div>
      </div>
</template>

<script>
import axios from 'axios';

export default {
    name:'LoginPage',
    data(){
        return {
            email:'',
            password:''

        }
    },
    methods:{
        
       async login(){
            let result = await axios.get(
                `http://localhost:3001/user?email=${this.email}&password=${this.password}`
            )

             if(result.status == 200 && result.data.length > 0){
            
            localStorage.setItem("user-info", JSON.stringify(result.data[0]));
            this.$router.push({name:'Home'})

        } else{
            alert("Password correct alla myre")
        }
            console.warn(result)
        }
    },
    mounted(){
    let user = localStorage.getItem("user-info");
    if(user){
        this.$router.push({name:'Home'})
    }
  }
    
}
</script>

<style scoped>
/* Container styling for centering */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  font-family: Arial, sans-serif;
}

/* Logo styling */
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

/* SignUp form styling */
.signup-form {
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 15px; /* spacing between inputs */
}

.signup-form input {
  height: 40px;
  padding: 0 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.3s;
}

.signup-form input:focus {
  border-color: #007BFF;
}

/* Button styling */
.button {
  height: 45px;
  background-color: darkblue;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: navy;
}
</style>
