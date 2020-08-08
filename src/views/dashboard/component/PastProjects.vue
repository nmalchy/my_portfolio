<!-- eslint-disable -->
<template>
  <v-container
    id="icons"
    fluid
    tag="section"
  >
    <v-row>
      <v-col cols="12">
        <base-material-card color="green">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Projects
            </div>

            <div class="subtitle-1 font-weight-light">
               Proudly showcased below are five of my personal projects, built using the online code editor <a class="subtitle-1 font-weight-light" href='codepen.io'>CodePen.io</a>, and two websites I built using the content management system WordPress.
            </div>
          </template>

          <v-row
            align="center"
            justify="center"
          >
            <v-col
              v-for="icon in icons"
              :key="icon"
              class="ma-2"
            >
              <v-tooltip
                content-class="top"
                top
              >
                <template v-slot:activator="{ attrs, on }">
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ icon }}
                  </v-icon>
                </template>
                <span>{{ icon }}</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </base-material-card>
      </v-col>

      <v-col
        class="mx-auto"
        cols="auto"
      >
      <v-card class="pa-10">
         <v-row>
         <v-col cols="4"> 
         <v-card class="pa-10">
            <a href="https://codepen.io/canadiancoder95/full/yLyRPpR" target="_blank"><v-img class="image-container" src="../../../assets/image(1).png" alt='project_link_1'/></a>
            <br>
            <h3>ReactJS Pomodoro Clock</h3>
            <p>A timer application that let's you set a timer for your work/study session, and a separate timer for your break session afterwards, transition between sessions is signaled with an alarm. Built with React.</p>
         </v-card>
         </v-col>
         <v-col cols="4">
         <v-card height="495" class="pa-10">
            <a href="https://codepen.io/canadiancoder95/full/OJPZwoY" target="_blank"><v-img class="image-container" src="../../../assets/image(2).png" alt='project_link_3'/></a>
            <br><br/>
            <h3>ReactJS Calculator</h3>
            <p>A basic calculator built with React and Bootstrap</p>
         </v-card>
         </v-col>
         <v-col cols="4">
         <v-card class="pa-10">
            <a href="https://codepen.io/canadiancoder95/full/JjoaeRP" target="_blank"><v-img contain class="image-container" src="../../../assets/image(4).png"  alt='project_link_4'/></a>
            <br><br/>
            <h3>Random Quote Generator</h3>
            <p>A random quote generator that allows you to tweet the quote! Quote's are pulled from an API with jQuery/AJAX, built with Javascript/HTML/CSS.</p>
         </v-card>
         </v-col>
         </v-row>
         <v-row>
         <v-col cols="4"> 
         <v-card height="454" class="pa-10">
            <a href="https://codepen.io/canadiancoder95/full/gObvRPJ" target="_blank"><v-img class="image-container" src="../../../assets/image(3).png" alt='project_link_2'/></a>
            <br><br/>
            <h3>ReactJS Drum Machine</h3>
            <p>A simple drum machine application with the sounds of a basic drum kit, equipped with an on/off button and volume adjust. Built with React.</p>
         </v-card>
         </v-col>
         <v-col cols="4">
         <v-card height="454" class="pa-10">
            <a href="https://codepen.io/canadiancoder95/full/KKwqjoE" target="_blank"><v-img class="image-container" src="../../../assets/image(5).png" alt='project_link_5'/></a>
            <br><br/>
            <h3>ReactJS Markdown Text Previewer</h3>
            <p>A markdown text previewer built with React</p>
         </v-card>
         </v-col>
         <v-col cols="4">
            <base-material-card height="454" color="green">
            <template v-slot:heading>
               <div class="display-2 font-weight-light">
               WordPress Experience
               </div>
            </template>

            <v-row
               align="center"
               justify="center"
            ><v-container>
               <v-list>
               <v-list-item two-line>
                  <v-list-item-content>
                  <v-list-item-title><a href="https://www.thehealthcreationlab.com/" target="_blank">www.thehealthcreationlab.com</a></v-list-item-title>
                  <p>A website I built for an old work buddy who was starting his own naturpathic clinic and needed a website.</p>
                  </v-list-item-content>
               </v-list-item>
               <v-list-item two-line>
                  <v-list-item-content>
                  <v-list-item-title><a href="https://www.proteinisgood.com/" target="_blank">www.proteinisgood.com</a></v-list-item-title>
                  <p>My own personal blog all about protein.</p>
                  </v-list-item-content>
               </v-list-item>
               </v-list>
            </v-container>
            </v-row>
         </base-material-card>
         </v-col>
         </v-row>
      </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardIcons',

    data: () => ({
      items: [],
    }),
  }
</script>

<style scoped>
/* eslint-disable */
   .image-container {
      width: 400px;
      height: 250px;
      border-radius: 10px;
      outline: 0;
      transform: scale(1.05);
      transition: 500ms ease-out;
      outline: none;
   }
   .image-container:hover {
      transform: scale(1.1);
      transition: 300ms ease-in;
      outline: none;
   }
</style>
