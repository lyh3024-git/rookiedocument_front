<template>
    <div id ="app" style="display:flex;flex-direction:column;">
        <router-view style="text-align: center;margin-top:4px;flex:1;"/>
      <vue-particles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
    </div>
</template>

<style>
    html, body, #app {
        height: 100%;
        min-height: 100%;
        width: 100%;
        margin: 0;
    }
</style>

<script>

    export default {
      name:"App",
        components: {
        },
        data() {
            return {}
        },
        created: function () {
            document.title = this.$route.meta.title || this.$route.meta.pathName
        },
        watch: {
            $route() {
                document.title = this.$route.meta.title || this.$route.meta.pathName
            }
        },
        methods: {}
    };
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: url("./assets/星空.jpg") no-repeat center fixed;
  height:100%;
  width:100%;
  overflow: auto;
  background-size:cover;
}
</style>