<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm8 offset-sm2>
        <alert
          @dismissed="onDismissed"
          :text="message"
          v-for="message in errors.token"
          :key="Math.random().toString(10).substr(2, 6)"
        ></alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm8 offset-sm2>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onRestorePasswordConfirm">
                <v-layout row>
                  <v-flex xs-12>
                    <v-text-field
                      name="password"
                      label="New password"
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
                      label="Confirm new password"
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
                      Save
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
        password: '',
        confirmPassword: '',
        errors: {
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
      uid () {
        return this.$route.params.uid
      },
      token () {
        return this.$route.params.token
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    watch: {
      error (values) {
        if (values !== null) {
          console.log(values.response.data)
          for (let value in values.response.data) {
            if (value === 'new_password1') {
              this.errors.password = values.response.data[value]
            } else if (value === 'new_password2') {
              this.errors.confirmPassword = values.response.data[value]
            } else {
              this.errors[value] = values.response.data[value]
            }
          }
        }
      }
    },
    methods: {
      onRestorePasswordConfirm () {
        this.$store.dispatch('restorePasswordConfirm', {
          uid: this.uid,
          token: this.token,
          new_password1: this.password,
          new_password2: this.confirmPassword
        })
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>
