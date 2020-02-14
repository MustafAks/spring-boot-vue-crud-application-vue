<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Hayatta iki şeye dikkat edeceksin.
      1.Yolda yürürken kavşaklara.
      2.Yüzüne gülüp arkandan iş çeviren yavşaklara.<br>
      check out the
      <a href="https://yavşakList.com" target="_blank" rel="noopener">Yavşak Listesi</a>.
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
