<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm8 offset-sm2>
        <alert
          @dismissed="onDismissed"
          :text="message"
          v-for="message in errors.non_field_errors"
          :key="Math.random().toString(10).substr(2, 6)"
        ></alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm8 offset-sm2>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignin">
                <v-layout row>
                  <v-flex xs-12>
                    <v-text-field
                      name="username"
                      label="Login"
                      id="username"
                      v-model="username"
                      type="Test"
                      :rules="[rules.required]"
                      :error="errors.username.length > 0"
                      :error-messages="errors.username"
                      @focus="errors.username = []"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs-12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      :rules="[rules.required]"
                      :error="errors.password.length > 0"
                      :error-messages="errors.password"
                      @focus="errors.password = []"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs-12>
                    <v-btn type="submit" class="primary" :disabled="loading" :loading="loading">
                      Sign in
                      <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs6 mt-2>
                    <router-link to="/restore-password">Restore password</router-link>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Alert from '@/components/Shared/Alerts/Error'

  export default {
    components: {
      Alert
    },
    data () {
      return {
        username: '',
        password: '',
        errors: {
          username: [],
          password: [],
          non_field_errors: []
        },
        rules: {
          required: (value) => !!value || 'Required.'
        }
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      },
      error (values) {
        console.log(values)
        if (values !== null) {
          for (let value in values.response.data) {
            this.errors[value] = values.response.data[value]
          }
        }
      }
    },
    methods: {
      onSignin () {
        this.$store.dispatch('signUserIn', {
          username: this.username,
          password: this.password
        })
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>