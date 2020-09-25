<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <p>Please run this command in your  
            <v-chip
              class="ma-2"
              color="indigo"
              text-color="white"
              small
            >
              wallet
            </v-chip>

            <br/>
            <code>protx register_submit  
               {{d.prepTx}}  
               {{d.signAnswer}}
            </code>
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <p>Answer should be like this:
            <br/>
            <v-subheader>
              <pre>
              9d2e443....
              </pre>
            </v-subheader>
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <p>And, Done!</p>
        <p>To check, you can use this command in your 
          <v-chip
            class="ma-2"
            color="indigo"
            text-color="white"
            small
          >
            server
          </v-chip>

          <code>./kyan-cli masternode status</code>
        </p>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
  export default {
    props: {
      nextf: { type: Function },
      d: Object
    },

    data: () => ({
      v: {
      }
    }),

    methods: {
      next(){
        this.nextf(this.v)
      }
    }
  }
</script>
