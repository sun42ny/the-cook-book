<template>
  <div class="home pa-5">
    <v-container class="pt-6 mb-10">
      <v-row>
        <v-col v-for="recipe in recipes" :key="recipe.id" md="4" sm="6" cols="12">
          <v-card color="#1c2541" class="pa-5 my-3" flat elevation="15">
            <div
              class="pl-2 pt-4 card-title text-wrap grey--text text--lighten-2 text-capitalize"
            >{{ recipe.title }}</div>
            <v-card-subtitle
              class="px-3 card-cook grey--text text--light-1 pt-1 text-capitalize font-weight-light"
            >{{ recipe.cook }}</v-card-subtitle>
            <div class="pb-3">
              <div
                style="display: inline-block;"
                v-for="(ing, index) in recipe.ingredients"
                :key="index"
              >
                <v-chip
                  class="ma-2 text-capitalize py-5"
                  color="#5bc0be"
                  text-color="white"
                  max-width="100px"
                  ripple
                >
                  <v-avatar left color="#1c2541">{{ index + 1 }}</v-avatar>
                  <span class="theCookBook-chips black--text text-capitalize">{{ ing }}</span>
                </v-chip>
              </div>
            </div>
            <div class="mt-5">
              <router-link :to="{ name: 'EditRecipe', params: { recipe_slug: recipe.slug} }">
                <v-btn color="#f45b69" large absolute bottom right fab elevation="5">
                  <v-icon color="white">mdi-pencil</v-icon>
                </v-btn>
              </router-link>
                <v-btn
                  color="#0b132b"
                  class="home-delete-button"
                  absolute
                  right
                  bottom
                  fab
                  elevation="5"
                >
                  <v-icon @click="deleteRecipe(recipe.id, recipe.uniqueID)" color="white">mdi-delete</v-icon>
                </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import db from '../firebase/init'

export default {
  name: 'Home',
  data () {
    return {
      recipes: []
    }
  },

  methods: {
    deleteRecipe (id, uniqueID) {
      const user = prompt('Please enter your unique id')
      if (user === uniqueID) {
        db.collection('recipes')
          .doc(id)
          .delete()
          .then(() => {
            this.recipes = this.recipes.filter(recipe => {
              return recipe.id !== id
            })
          })
        alert('So Sad! We Just Lost a good Recipe')
      } else {
        alert(
          'Sorry!! This is not your Recipe. Maybe you are mistaken. Try again!'
        )
        this.$router.push({ name: 'Home' })
      }

      // Admin Access //
      // db.collection('recipes')
      //   .doc(id)
      //   .delete()
      //   .then(() => {
      //     this.recipes = this.recipes.filter(recipe => {
      //       // eslint-disable-next-line eqeqeq
      //       return recipe.id != id
      //     })
      //   })
      // this.$router.push({ name: 'Home' })
      // Admin Access //
    }
  },

  created () {
    db.collection('recipes')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const recipe = doc.data()
          recipe.id = doc.id
          this.recipes.push(recipe)
        })
      })
  }
}
</script>

<style lang="scss">
.home .card-title {
  font-family: "Bree Serif", serif;
  font-size: 200%;
}

.home .card-cook {
  font-family: "Roboto Slab", serif;
  font-size: 120%;
}

.home .theCookBook-chips {
  font-family: "Merriweather", serif;
}

.home .home-delete-button {
  margin-right: 25%;
}

// .home .home-chips-xs {
//   padding: 15% 5%;
// }
</style>
