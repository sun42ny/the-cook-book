<template>
  <div class="addRecipe mt-10">
    <v-row justify="center">
      <v-col md="6" sm="8" cols="11">
        <v-card class="px-10 py-8 mb-10" color="grey lighten-2" elevation="10">
          <div class="text-center header font-weight-light">ADD RECIPE</div>
          <v-divider width="400" class="mx-auto mb-10" color="#0b132b"></v-divider>
          <v-form>
            <v-text-field
              class="mt-3"
              counter="20"
              v-model="uniqueID"
              name="uniqueID"
              color="success"
              outlined
              label="Unique ID"
              append-icon="mdi-account-check"
              hint="This ID will help you edit your Recipe in future, Remember It!"
            ></v-text-field>
            <v-text-field
              class="mt-3"
              counter="20"
              v-model="title"
              name="title"
              color="success"
              outlined
              label="Title"
              append-icon="mdi-food"
              hint="Be Careful! You can't edit once you submit the form."
            ></v-text-field>
            <v-text-field
              class="mt-3"
              counter="20"
              v-model="cook"
              name="cook"
              color="success"
              outlined
              label="Chef"
              append-icon="mdi-chef-hat"
            ></v-text-field>
            <v-text-field
              v-for="(ingredient, index) in ingredients"
              :key="index"
              class="mt-3"
              counter="20"
              v-model="ingredients[index]"
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
              v-model="detail"
              name="detail"
              color="success"
              outlined
              label="Recipe Detail"
              auto-grow
              clearable
            ></v-textarea>
            <p v-if="feedback" class="red--text text--darken-4 py-1">* {{ feedback }}</p>
            <div class="mt-4">
              <v-btn @click.prevent="check" color="#5bc0be" elevation="5" large>Submit</v-btn>
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
import slugify from 'slugify'

export default {
  name: 'AddRecipe',

  data () {
    return {
      uniqueID: null,
      title: null,
      cook: null,
      detail: null,
      ingredients: [],
      slug: null,
      another: null,
      feedback: null
    }
  },

  methods: {
    check () {
      let value = 'New'
      db.collection('recipes')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (doc.data().title === this.title) {
              alert(
                'Sorry! Title Already Taken! I am sure you can come up with something New and Interesting'
              )
              value = 'Taken'
            }
          })
          if (value === 'New') this.submit()
        })
    },

    submit () {
      if (
        this.uniqueID &&
        this.detail &&
        this.title &&
        this.cook &&
        (this.ingredients.length >= 1 || this.another)
      ) {
        if (this.another) {
          this.ingredients.push(this.another)
          this.another = null
        }
        this.feedback = null
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        db.collection('recipes')
          .add({
            uniqueID: this.uniqueID,
            title: this.title,
            cook: this.cook,
            slug: this.slug,
            detail: this.detail,
            ingredients: this.ingredients
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
      this.uniqueID = null
      this.title = null
      this.cook = null
      this.ingredients = []
      this.another = null
      this.feedback = null
      this.detail = null
    },

    addIng () {
      if (this.another) {
        this.ingredients.push(this.another)
        this.another = null
        this.feedback = ''
      } else {
        this.feedback = 'Please Put a Valid Ingredient'
      }
    },

    deleteIng (ing) {
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient !== ing
      })
    }
  }
}
</script>

<style lang="scss">
.addRecipe .header {
  font-family: "Bree Serif", serif;
  font-size: 300%;
  color: #0b132b;
}
</style>
