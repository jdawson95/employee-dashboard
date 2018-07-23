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
          <v-list-tile v-for="item in BugItem" :key="item.title" router :to="item.link" >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn slot="activator" color="primary" dark>Report Bug</v-btn>
      <v-card>
      <v-card-title>
        <span class="headline">Bug Report</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
            <v-text-field label="Email" 
            v-model="email"
            required>
            </v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
                <v-select
                  :items="['Low', 'Medium', 'High']"
                  label="Priority"
                  chips
                  v-model="priority"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="['Mail App']"
                  label="Application"
                  chips
                  v-model="category"
                  required
                ></v-select>
              </v-flex>
        <v-flex xs12>
        <v-textarea
          name="input-7-1"
          label="Bug Description"
          v-model="description"
        ></v-textarea>
        </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="AddBug">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
    :headers="headers"
    :items="bugs"
    class="elevation-1"
    disable-initial-sort=true
    >
    <template slot="items" slot-scope="props">
    <tr @click="props.expanded = !props.expanded">
      <td>{{ props.item.id }}</td>
      <td>{{ props.item.email }}</td>
      <td>{{ props.item.category }}</td>
      <td>{{ props.item.priority }}</td>
    </tr>
    </template>
    <template slot="expand" slot-scope="props">
      <v-card flat>
        <v-card-text>Bug Details: {{ props.item.description }}</v-card-text>
      </v-card>
    </template>
    </v-data-table>
    <div v-if="serverError" class="alert">
      <v-alert class="error"
      :value="true"
      dismissible
      type="error"
    >
    {{ serverError }}
    </v-alert>
    </div>
</Navbar>
</template>

<script>
import Navbar from '@/components/layouts/Navbar';
import axios from 'axios';
import db from '@/firebase/init';


export default {
  name: 'bugs',
  components: {
    Navbar
  },
  data () {
    return {
      email: null,
      category: null,
      priority: null,
      description: null,
      status: 'true',
      dialog: false,
      headers: [
      {
        text: 'Bugs',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      { text: 'E-mail', value: 'email', sortable: false},
      { text: 'Category', value: 'category', sortable: false},
      { text: 'Priority', value: 'priority', sortable: false},

      ],
      bugs: [],
      errors: [],
      BugItem: [
        { icon: 'assignment_late', title: 'Open Bugs', link: '/'},
        { icon: 'assignment_turned_in', title: 'Closed Bugs', link: '/mail'},
      ]
    }
  },
  methods: {
    AddBug(){
      db.collection('bugs').add({
        email: this.email,
        category: this.category,
        priority: this.priority,
        status: this.status,
        description: this.description
      }).then(() => {
      this.dialog = false
      }).catch(err => {
        this.serverError = (err.message);
      })
    }
  },
  created(){
    let ref = db.collection('bugs')

    ref.onSnapshot(snapshot => {
     snapshot.docChanges().forEach(change => {
       if(change.type == 'added'){
         let doc = change.doc
         this.bugs.push({
           id: doc.id,
           email: doc.data().email,
           category: doc.data().category,
           priority: doc.data().priority,
           status: doc.data().status,
           description: doc.data().description
         })
       }
     })
    })
  }
}
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
.space {
  padding-top: 150px;
}
</style>