<template>
    <v-app id="inspire">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      absolute
      temporary
    >
      <v-list dense>
          <v-layout
            row
            align-center
          >
          </v-layout>
          <v-list-tile v-for="item in menuItem" :key="item.title" router :to="item.link" >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="blue darken-3"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Dawson Hosting</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon v-on:click.native="logout">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
            <slot/>
    </v-content>
<v-footer class="pa-3">
    <v-spacer></v-spacer>
    <div> Dawson Hosting &copy; {{ new Date().getFullYear() }} Ver. 1.0.0</div>
  </v-footer>
  </v-app>
</template>

<script>
import firebase from 'firebase';

  export default {
    data: () => ({
      isLoggedIn: false,
      currentUser: false,
      dialog: false,
      drawer: false,
      menuItem: [
        { icon: 'dashboard', title: 'Dashboard', link: '/'},
        { icon: 'mail', title: 'Mail App', link: '/mail'},
        { icon: 'bug_report', title: 'Bug Reports', link: '/bug'},
        { icon: 'track_changes', title: 'Track Changes', link: '/change-log'},
      ]
    }),
    props: {
      source: String
    },
    methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    }
  }
};
</script>

<style>
</style>


