<template>
  <div id="app">
    <header class="site-header">
      <div class="header-inner">
        <router-link class="brand" to="/" aria-label="StayFinder home"><span class="brand-mark">⌂</span><span>stayfinder</span></router-link>
        <nav class="main-nav" aria-label="Main navigation">
          <router-link to="/" exact>Explore stays</router-link>
          <router-link to="/listings/new">List your place</router-link>
          <router-link to="/bookings">Bookings</router-link>
        </nav>
        <router-link class="host-link" to="/listings/new">Become a host <span>↗</span></router-link>
      </div>
    </header>
    <main class="page-shell"><router-view /></main>
    <footer class="site-footer"><div><strong>stayfinder</strong><span>Find a place that feels like yours.</span></div><p>Demo project for learning Vue, Express and MongoDB.</p></footer>
  </div>
</template>

<script>
export default { name: 'App' };
</script>
