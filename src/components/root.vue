<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
    <app-header></app-header>
    <menu></menu>
    <main class="mdl-layout__content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Menu from './menu'
import AppHeader from './header'

export default {
  components: {
    Menu,
    AppHeader
  }
}
</script>

<style>
#app a {
  color: #42b983;
}
.mdl-layout__content {
  padding-left: 15px;
}

.v-link-active {
color: #f0f !important;
}
</style>
