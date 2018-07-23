<template>
    <Navbar>
       <div class="change">
    <v-layout row wrap>
    <v-flex md4 offset-md4 justify-space-around v-for="item in cardItem" :key="item.version">
        <v-card>
            <v-card-title primary-title>
                <div>
                    <h2 class="headline mb-o">{{ item.version }} - {{ item.date }}</h2><br>
                        <h3>Added</h3><br>
                    <p>{{ item.added }}</p>
                </div>
            </v-card-title>
        </v-card><br>
    </v-flex>
    </v-layout>
   </div>
    </Navbar>
</template>


<script>
import Navbar from '@/components/layouts/Navbar'

export default {
    data: () => ({
        cardItem: [
            {version: '0.0.1', date: '2018-07-18', added: "- track changes page"},
            {version: '0.0.2', date: '2018-07-19', added: "- updated data structures"}
        ]
    }),
  components: {
    Navbar
  }
};
</script>

<style>
.change {
    padding-top: 20px;
}
</style>
