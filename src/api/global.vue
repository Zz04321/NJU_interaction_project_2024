<script>
const url = 'http://localhost:8081'
export default {
    url
}

// 获取 token 的辅助函数
export function getToken() {
  // 假设你存储 token 的方式，例如在 localStorage
  return localStorage.getItem('uid');
}
</script>
