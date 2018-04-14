<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 mb-1>
        <h1>Hello {{ username }}!!!</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Coockie from 'js-cookie'

  export default {
    computed: {
      username () {
        return Coockie.get('username')
      }
    }
  }
</script>
