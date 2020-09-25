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
            <code>signmessage 
               {{d.prepCollateralAddress}}  
               {{d.prepSignMessage}}
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
              ILqOusy....
              </pre>
            </v-subheader>
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Answer"
          outlined
          v-model="v.signAnswer"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
          <v-btn
          :disabled="v.signAnswer.length === 0"
          color="blue-grey"
          class="ma-2 white--text"
          @click="next"
          absolute
          right
          >
          Next
          <v-icon right dark>mdi-arrow-right</v-icon>
        </v-btn>
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
        signAnswer:''
      }
    }),

    methods: {
      next(){
        this.nextf(this.v)
      }
    }
  }
</script>
