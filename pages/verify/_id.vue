<template>
    <v-container>
        <v-layout row>
            <v-flex xs8 offset-xs2>
                <alert
                    @dismissed="onDismissed"
                    :text="'Ошибка! Не верный ключ проверки ' + id"
                    :key="Math.random().toString(10).substr(2, 6)"
                ></alert>
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
    computed: {
      id () {
        this.$store.dispatch('verifyEmail', {
          key: this.$route.params.id
        })

        return this.$route.params.id
      },
      error () {
        return this.$store.getters.error
      }
    },
    methods: {
      onDismissed () {
        this.$store.dispatch('clearError')
        this.$router.push('/')
      }
    }
  }
</script>