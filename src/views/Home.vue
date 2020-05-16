<template>
  <div class="home">
    <v-container fluid class="mb-10">
      <div class="mt-2">
        <a
          href="https://forms.gle/CqEeJBCPGQ4qY99B8"
          target="_blank"
          style="text-decoration: none;"
        >
          <v-btn large color="#c5e67a" class="mb-5 grey--text text--darken-4" tile>
            <v-icon left>mdi-message-draw</v-icon>ReviewBook
          </v-btn>
        </a>
      </div>
      <v-row>
        <v-col v-for="recipe in recipes" :key="recipe.id" md="3" sm="6" cols="12">
          <v-card color="#1c2541" class="pa-5 mb-10" min-height="250" flat elevation="15">
            <div
              class="pl-2 pt-4 card-title text-wrap grey--text text--lighten-2 text-capitalize"
            >{{ recipe.title }}</div>
            <v-card-subtitle
              class="px-3 card-cook grey--text text--light-1 pt-1 text-capitalize font-weight-light"
            >{{ recipe.cook }}</v-card-subtitle>
            <div class="mt-5">
              <router-link :to="{ name: 'EditRecipe', params: { recipe_slug: recipe.slug} }">
                <v-btn color="blue darken-1" absolute bottom fab elevation="5">
                  <v-icon color="indigo lighten-4">mdi-pencil</v-icon>
                </v-btn>
              </router-link>
              <v-btn
                style="font-size: 200%;"
                color="#0b132b"
                class="home-delete-button"
                absolute
                bottom
                fab
                elevation="5"
              >
                <v-icon
                  style="font-size: 80%;"
                  @click="deleteRecipe(recipe.id, recipe.uniqueID)"
                  color="indigo lighten-3"
                >mdi-delete</v-icon>
              </v-btn>
              <v-dialog width="600px">
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-on="on"
                    color="success"
                    class="home-view-button"
                    absolute
                    right
                    bottom
                    fab
                    large
                    elevation="5"
                  >
                    <v-icon color="white">mdi-format-list-bulleted-square</v-icon>
                  </v-btn>
                </template>
                <v-card color="grey lighten-1" flat>
                  <div
                    style="font-family: 'Bree Serif', serif; font-size: 250%;"
                    class="px-5 pt-5 text-wrap grey--text text--darken-4 text-capitalize"
                  >{{ recipe.title }}</div>
                  <div
                    style="font-family: 'Roboto Slab', serif; font-size: 120%;"
                    class="px-5 grey--text text--darken-2 text-capitalize font-weight-light"
                  >{{ recipe.cook }}</div>
                  <v-divider class="grey accent-4 my-3"></v-divider>
                  <div class="px-5">
                    <div
                      style="font-family: 'Bree Serif', serif; font-size: 120%;"
                      class="pb-2 text-wrap grey--text text--darken-4"
                    >Recipe in Detail</div>
                    <div
                      style="font-family: 'Merriweather', serif; font-size: 80%;"
                    >{{ recipe.detail }}</div>
                  </div>
                  <v-divider class="grey accent-4 my-3"></v-divider>
                  <div class="px-5 pb-3">
                    <div
                      style="font-family: 'Bree Serif', serif; font-size: 120%;"
                      class="pb-3 text-wrap grey--text text--darken-4"
                    >List of Ingredients</div>
                    <div
                      style="display: inline-block;"
                      v-for="(ing, index) in recipe.ingredients"
                      :key="index"
                    >
                      <v-chip
                        class="mr-2 mb-3 text-capitalize py-5"
                        color="#5bc0be"
                        text-color="white"
                        ripple
                      >
                        <v-avatar left color="#1c2541">{{ index + 1 }}</v-avatar>
                        <span
                          style="font-family: 'Merriweather', serif;"
                          class="black--text text-wrap text-capitalize"
                        >{{ ing }}</span>
                      </v-chip>
                    </div>
                  </div>
                </v-card>
              </v-dialog>
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
  margin-left: 20%;
}

// .home .home-view-button {
//   margin-right: 26%;
// }
</style>
