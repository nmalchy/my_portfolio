<!-- eslint-disable -->
<template>
   <v-row
   align="center"
   justify="center"
   >
      <v-col cols="12" class="pa-10">
         <base-material-card
            color="green"
         >
            <template v-slot:heading>
            <div class="display-2 font-weight-light">
               Get in touch
            </div>

            <div class="subtitle-1 font-weight-light">
               Contact me through one of the avenues below and I promise I will provide a hasty response!
            </div>
            </template>
               <div>
                  <div>
                     <section>
                         <v-list flat>
                           <v-list-item-group v-model="model" color="indigo">
                           <v-list-item
                              v-for="(item, i) in items"
                              :key="i"
                              :href=item.link target="_blank"
                           >
                              <v-list-item-icon>
                                 <v-icon v-text="item.icon"></v-icon>
                              </v-list-item-icon>

                              <v-list-item-content>
                                 <v-list-item-title v-text="item.text"></v-list-item-title>
                              </v-list-item-content>
                           </v-list-item>
                           </v-list-item-group>
                        </v-list>
                     </section>
                  </div>
               </div>
         </base-material-card>
      </v-col>
   </v-row>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          icon: 'mdi-phone',
          text: '(604) 445-9561',
        },
        {
          icon: 'mdi-email',
          text: 'noahmalchy@gmail.com',
          link: 'mailto: noahmalchy@gmail.com',
        },
        {
          icon: 'mdi-github',
          text: 'https://github.com/nmalchy',
          link: 'https://github.com/nmalchy',
        },
      ],
      model: 1,
    }),
  }
</script>

<style lang="scss">
  .tim-note {
    bottom: 10px;
    color: #c0c1c2;
    display: block;
    font-weight: 400;
    font-size: 13px;
    line-height: 13px;
    left: 0;
    margin-left: 20px;
    width: 260px;
  }
</style>
