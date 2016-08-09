<template>
  <div class="mdl-layout__drawer mdl-layout--fixed-drawer mdl-layout--no-desktop-drawer-button">
    <img class="mdl-layout-icon" src="/static/logo.png" />
    <nav class="mdl-navigation">
    <template v-for="item in menuItems">
      <a class="mdl-navigation__link" v-link="{ path: item.route, exact: item.exact }">{{ item.name }}</a>
    </template>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuItems: [
        { name: 'Home', route: '/', exact: true },
        { name: 'pajlada', route: '/s/pajlada', exact: false },
        { name: 'About', route: '/about', exact: false }
      ]
    }
  }
}
</script>
