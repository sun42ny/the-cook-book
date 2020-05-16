<template>
  <div v-if="recipe" class="editRecipe">
    <v-row justify="center">
      <v-col md="6" sm="8" cols="11">
        <v-card class="pa-8 my-10" color="grey lighten-2" elevation="10">
          <div class="text-center header font-weight-light">EDIT RECIPE</div>
          <v-divider width="400" class="mx-auto mb-10" color="#0b132b"></v-divider>
          <v-form>
            <v-text-field
              class="mt-3"
              counter="20"
              v-model="recipe.uniqueID"
              name="uniqueID"
              color="success"
              outlined
              label="Unique ID"
              append-icon="mdi-account-check"
              hint="This ID will help you edit your Recipe in future, Remember It!"
            ></v-text-field>
            <!-- <v-text-field
              class="mt-3"
              counter="20"
              v-model="recipe.title"
              name="title"
              color="success"
              outlined
              label="Title"
              append-icon="mdi-food"
            ></v-text-field>-->
            <v-text-field
              class="mt-3"
              counter="20"
              v-model="recipe.cook"
              name="cook"
              color="success"
              outlined
              label="Chef"
              append-icon="mdi-chef-hat"
            ></v-text-field>
            <v-text-field
              v-for="(ingredient, index) in recipe.ingredients"
              :key="index"
              class="mt-3"
              counter="20"
              v-model="recipe.ingredients[index]"
              name="ingredient"
              color="success"
              outlined
              :label="'Ingredient ' + (index + 1)"
              append-icon="mdi-delete"
              @click:append="deleteIng(ingredient)"
            ></v-text-field>
            <v-text-field
              class="mt-3"
              counter="20"
              v-model="another"
              name="add-ingredient"
              color="success"
              outlined
              label="Add Ingredient"
              append-icon="mdi-plus"
              @click:append="addIng"
              hint="Press + to Add more Ingredients"
            ></v-text-field>
            <v-textarea
              class="mt-3"
              v-model="recipe.detail"
              name="detail"
              color="success"
              outlined
              label="Recipe Detail"
              auto-grow
              clearable
            ></v-textarea>
            <p v-if="feedback" class="red--text text--darken-4 py-1">* {{ feedback }}</p>
            <div class="mt-4">
              <v-btn @click.prevent="update" color="#5bc0be" elevation="5" large>Update</v-btn>
              <v-btn
                @click.prevent="reset"
                class="float-right"
                color="#f45b69"
                elevation="5"
                large
              >Reset</v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import db from '../firebase/init'
// import slugify from 'slugify'

export default {
  name: 'EditRecipe',
  data () {
    return {
      recipe: null,
      feedback: null,
      another: null
    }
  },

  methods: {
    // check () {
    //   let value = 'New'
    //   db.collection('recipes')
    //     .get()
    //     .then(snapshot => {
    //       snapshot.forEach(doc => {
    //         if (doc.data().title === this.recipe.title) {
    //           alert(
    //             'Sorry! Title Already Taken! I am sure you can come up with something New and Interesting'
    //           )
    //           value = 'Taken'
    //         }
    //       })
    //       if (value === 'New') this.update()
    //     })
    // },

    update () {
      if (
        this.recipe.uniqueID &&
        // this.recipe.title &&
        this.recipe.detail &&
        this.recipe.cook &&
        (this.recipe.ingredients.length >= 1 || this.another)
      ) {
        if (this.another) {
          this.recipe.ingredients.push(this.another)
          this.another = null
        }
        this.feedback = null
        // this.recipe.slug = slugify(this.recipe.title, {
        //   replacement: '-',
        //   remove: /[$*_+~.()'"!\-:@]/g,
        //   lower: true
        // })
        db.collection('recipes')
          .doc(this.recipe.id)
          .update({
            uniqueID: this.recipe.uniqueID,
            // title: this.recipe.title,
            cook: this.recipe.cook,
            detail: this.recipe.detail,
            slug: this.recipe.slug,
            ingredients: this.recipe.ingredients
          })
          .then(() => {
            this.$router.push({ name: 'Home' })
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.feedback = 'Uh-ho!! You missed some fields to fill'
      }
    },

    reset () {
      this.recipe.uniqueID = null
      this.recipe.title = null
      this.recipe.cook = null
      this.recipe.ingredients = []
      this.another = null
      this.feedback = null
      this.recipe.detail = null
    },

    addIng () {
      if (this.another) {
        this.recipe.ingredients.push(this.another)
        this.another = null
        this.feedback = ''
      } else {
        this.feedback = 'Please Put a Valid Ingredient'
      }
    },

    deleteIng (ing) {
      this.recipe.ingredients = this.recipe.ingredients.filter(ingredient => {
        return ingredient !== ing
      })
    }
  },

  created () {
    const ref = db
      .collection('recipes')
      .where('slug', '==', this.$route.params.recipe_slug)
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.recipe = doc.data()

        const user = prompt('Please enter your unique id')
        if (user === this.recipe.uniqueID) {
          alert('Hi ' + this.recipe.cook + '! Welcome to your Recipe.')
          this.recipe.id = doc.id
        } else {
          alert(
            'Sorry!! This is not your Recipe. Maybe you are mistaken. Try again!'
          )
          this.$router.push({ name: 'Home' })
        }
      })
    })
  }
}
</script>

<style lang="scss">
.editRecipe .header {
  font-family: "Bree Serif", serif;
  font-size: 300%;
  color: #0b132b;
}
</style>
