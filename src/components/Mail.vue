<template>
<Navbar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      permanent
      clipped
      class="grey lighten-4"
      app
    >
      <v-list dense 
      class="grey lighten-4"
      >
          <v-layout
            row
            align-center
          >
          </v-layout>
          <div class="layout column pa-3">
          <v-btn large block color="blue" dark> + GRAB EMAIL</v-btn>
          <v-dialog v-model="dialog" persistent max-width="800px">
          <v-btn slot="activator" large block color="red" dark> + COMPOSE EMAIL</v-btn>
                <v-card>
      <v-card-title>
        <span class="headline">Compose Email</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
            <v-text-field label="TO" 
            v-model="to"
            required>
            </v-text-field>
            </v-flex>
            <v-flex xs12>
            <v-text-field label="CC" 
            v-model="cc">
            </v-text-field>
            </v-flex>
        <v-flex xs12>
        <v-textarea
          name="input-7-1"
          label="Message "
          v-model="message"
        ></v-textarea>
        </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="AddBug">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
          </div>
          <v-divider></v-divider>
          <v-list-tile v-for="item in MailItem" :key="item.title" router :to="item.link" >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    </Navbar>
</template>

<script>
import Navbar from '@/components/layouts/Navbar'

export default {
  name: 'bugs',
  components: {
    Navbar
  },
  data () {
    return {
      dialog: false,
      MailItem:  [
        {title: 'Email', icon: 'email'},
        {title: 'In-progress', icon: 'whatshot'},
        {title: 'Sent', icon: 'send'},
        

      ]
    }
  }
};
</script>

<style>
</style>
