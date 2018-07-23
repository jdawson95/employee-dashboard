<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Dawson Hosting - Employee Dashboard</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="email"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-on:click.native="login" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
                <div v-if="serverError" class="alert">
      <v-alert class="error"
      :value="true"
      dismissible
      type="error"
    >
    {{ serverError }}
    </v-alert>
    </div>
  </v-app>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'login',
  data: function() {
    return {
      email: '',
      password: '',
      serverError: ''
    };
  },
  methods: {
    login: function(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.$router.push({
              name: 'Home'
            });
          },
          err => {
            this.serverError = (err.message);
          }
        );
      e.preventDefault();
    }
  }
};
</script>

<style>
.alert {
    position:relative;
}
.error {
    position:absolute;
    bottom:0;
    right:0;
}
</style>
