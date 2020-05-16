<template>
  <div class="navbar">
    <v-app-bar tile height="120" color="#0b132b" dark>
      <router-link class="textdecor-none" :to="{ name: 'Home' }">
        <v-img class="mx-2" src="../assets/logo.png" max-height="110" max-width="110" contain></v-img>
      </router-link>
      <router-link class="textdecor-none" :to="{ name: 'Home' }">
        <v-toolbar-title
          class="font-weight-bold ml-2 grey--text text--lighten-4 text-wrap pt-6"
          :class="{'navbar-title-xs': $vuetify.breakpoint.xs}"
        >The Cook Book</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <router-link class="textdecor-none" :to="{ name: 'AddRecipe' }">
        <v-btn color="#f45b69" class="mr-10" x-large absolute bottom right fab elevation="5">
          <v-icon color="white">mdi-plus</v-icon>
        </v-btn>
      </router-link>
    </v-app-bar>
  </div>
</template>

<style lang="scss">
.navbar .v-toolbar__title {
  font-family: "Delius Swash Caps", cursive;
  font-size: 300%;
  cursor: pointer;
}

.navbar .textdecor-none {
  text-decoration: none;
}

.navbar .navbar-title-xs {
  font-size: 180%;
  margin-top: -20%;
}
</style>
