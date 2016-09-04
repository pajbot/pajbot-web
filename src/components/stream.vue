<template>
  <div>
    <h2>Stream - {{ $route.params.stream }}</h2>
      <nav class="mdl-navigation">
      <a class="mdl-navigation__link" v-link="{ name: 'stream-home', params: { stream: $route.params.stream }, exact: true }">Home</a>
      &nbsp;&mdash;&nbsp;
      <a class="mdl-navigation__link" v-link="{ name: 'stream-dashboard', params: { stream: $route.params.stream } }">Dashboard</a>
      &nbsp;&mdash;&nbsp;
      <a class="mdl-navigation__link" v-link="{ name: 'stream-clr', params: { stream: $route.params.stream } }">CLR</a>
      </nav>
      <router-view></router-view>
  </div>
</template>
