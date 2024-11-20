<script>
const url = 'http://localhost:8081'
export default {
    url
}

// 获取 token 的辅助函数
export function getToken() {
  return localStorage.getItem('uid');
}
</script>
