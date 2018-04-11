<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm8 offset-sm2>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignup">
                <v-layout row>
                  <v-flex xs-12>
                    <v-text-field
                      name="username"
                      label="Login"
                      id="username"
                      v-model="username"
                      type="string"
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
                      name="email"
                      label="Email"
                      id="email"
                      v-model="email"
                      type="email"
                      :rules="[rules.required]"
                      :error="errors.email.length > 0"
                      :error-messages="errors.email"
                      @focus="errors.email = []"
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
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[rules.required, rules.comparePasswords]"
                      :error="errors.confirmPassword.length > 0"
                      :error-messages="errors.confirmPassword"
                      @focus="errors.confirmPassword = []"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs-12>
                    <v-btn type="submit" class="primary" :disabled="loading" :loading="loading">
                      Sign up
                      <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </v-btn>
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
  import Alert from '@/components/Shared/Alert'

  export default {
    components: {
      Alert
    },
    data () {
      return {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: {
          username: [],
          email: [],
          password: [],
          confirmPassword: []
        },
        rules: {
          required: (value) => !!value || 'Required.',
          comparePasswords: (value) => value === this.password || 'Passwords do not match.'
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
        if (values !== null) {
          for (let value in values.response.data) {
            if (value === 'password1') {
              this.errors.password = values.response.data[value]
            } else if (value === 'password2') {
              this.errors.confirmPassword = values.response.data[value]
            } else {
              this.errors[value] = values.response.data[value]
            }
          }
        }
      }
    },
    methods: {
      onSignup () {
        this.$store.dispatch('signUserUp', {
          username: this.username,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        })
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>
