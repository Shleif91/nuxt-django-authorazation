<template>
  <v-app>
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped" class="primary" dark>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
        class="hidden-sm-and-down"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-for="(item, i) in topMenuItems"
        :key="i"
        :to="item.to"
        class="primary"
        round
      >
        <v-icon left>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content class="grey lighten-3">
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
  import * as firebase from 'firebase'

  export default {
    data () {
      return {
        clipped: true,
        drawer: true,
        items: [
          { icon: 'apps', title: 'Orders', to: '/' },
          { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'CargDel'
      }
    },
    computed: {
      topMenuItems () {
        let items = []
        if (this.isGuest) {
          items = [
            { icon: 'account_circle', title: 'Signup', to: '/signup' },
            { icon: 'input', title: 'Signin', to: '/signin' }
          ]
        }

        return items
      },
      isGuest () {
        return this.$store.getters.user === null || this.$store.getters.user === undefined
      }
    },
    created () {
      if (!firebase.apps.length) {
        firebase.initializeApp({
          apiKey: 'AIzaSyAkL1TtuenwTRjZHncEKWMgYZ-To2IrsF4',
          authDomain: 'testfirebase-99821.firebaseapp.com',
          databaseURL: 'https://testfirebase-99821.firebaseio.com',
          projectId: 'testfirebase-99821',
          storageBucket: 'testfirebase-99821.appspot.com'
        })
      }
    }
  }
</script>
