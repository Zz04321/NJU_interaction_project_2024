<script>
export default {
  url: 'http://localhost:8081',
  getToken() {
    return localStorage.getItem('uid');
  }
}
</script>
