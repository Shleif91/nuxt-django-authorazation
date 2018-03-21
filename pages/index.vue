<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 mb-1 v-for="order in orders" :key="order.id">
        <nuxt-link to="/inspire">
          <v-card>
            <v-card-title class="headline primary--text">
              <h4>{{ order.title }}</h4>
            </v-card-title>
            <v-card-text>
              <v-chip color="primary" text-color="white">
                <b>{{ order.cityFrom }} - {{ order.cityWhere }}</b>
              </v-chip>
              <v-chip color="primary" text-color="white">
                <b>Груз: {{ order.cargo }}</b>
              </v-chip>
              <v-chip color="primary" text-color="white">
                <b>Заказчик: {{ order.cargo }}</b>
              </v-chip>
            </v-card-text>
            <v-card-actions>
              <v-btn flat nuxt to="/inspire" class="primary--text">Подробнее</v-btn>
            </v-card-actions>
          </v-card>
        </nuxt-link>
      </v-flex>
      <v-flex xs-12>
        <div class="text-xs-center">
          <v-pagination :length="totalPages" v-model="page" :total-visible="7"></v-pagination>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        page: 1,
        perPage: 5
      }
    },
    computed: {
      orders () {
        return this.$store.getters.orders
      },
      totalPages () {
        return this.$store.getters.totalPages
      }
    }
  }
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  .headline:hover {
    text-decoration: underline;
  }
</style>