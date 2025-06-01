<template>
    <div class="nav">
        <a v-on:click="logout" href="#">Logout</a>
    </div>
</template>

<script>

export default {
    name:'HeaderPage',
    methods:{
        logout(){
            localStorage.clear();
            this.$router.push({name:'LoginPage'})

        }
    }
   
}
</script>

<style scoped>

.nav{
    background-color:#333;
    overflow: hidden;
}
.nav a{
    float:left;
    color:#f2f2f2f2;
    padding: 14px 16px;
    text-align: center;
    font-size:17px;
    text-decoration: none;
    margin-right: 5px;
}

.nav a:hover{
    background:#ddd;
    color:#333;
}
</style>
