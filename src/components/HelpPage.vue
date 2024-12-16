<template>
  <div class="help-docs-page">
    <h1>帮助与文档</h1>
    <p>欢迎使用看世界摄影平台</p>
    <p>
      感谢您选择看世界摄影平台！本平台致力于为摄影爱好者提供一个便捷、丰富的交流与创作空间。
    </p>
    <hr />

    <!-- 功能指南 -->
    <section>
      <h2>功能指南</h2>
      <h3>1. 注册与登录</h3>
      <ul>
        <li><strong>注册</strong><br />点击首页右上角的头像，或者点击主页的加入我们即可进入到注册页面，填写邮箱、密码等信息完成注册。</li>
        <li><strong>登录</strong><br />已注册用户可通过“登录”按钮输入邮箱和密码进入平台。</li>
        <li><strong>编辑个人信息</strong><br />已登录用户可通过右上角头像按钮进入个人信息编辑页面。</li>
      </ul>

      <h3>2. 社区互动</h3>
      <ul>
        <li><strong>加入社区</strong><br />浏览社区页面，点击右上角“加入社区”按钮参与。</li>
        <li><strong>上传照片</strong><br />在社区个人页面点击“上传照片”，选择本地文件上。</li>
        <li><strong>点赞照片</strong><br />浏览社区中的照片，点击“点赞”图标，为您喜欢的作品点赞支持。</li>
      </ul>

      <h3>3. 图片展</h3>
      <ul>
        <li><strong>上传图片展作品</strong><br />点击“图片展”页面右上角的“上传”按钮，选择作品并填写标题与说明。</li>
        <li><strong>点赞图片展作品</strong><br />浏览图片展中的内容，点击“点赞”图标支持喜欢的作品。</li>
        <li><strong>下载作品</strong><br />右键图片展页面中的图片，将喜爱的作品保存至本地。</li>
      </ul>

      <h3>4. 活动参与</h3>
      <ul>
        <li><strong>查看活动信息</strong><br />在“活动”页面浏览当前进行的摄影比赛、展览等活动详情。</li>
        <li><strong>报名活动</strong><br />点击活动页面的“报名”按钮，填写报名信息提交申请。</li>
      </ul>
    </section>

    <hr />

    <!-- 常见问题 -->
    <section>
      <h2>常见问题 (FAQ)</h2>
      <ol>
        <li><strong>忘记密码怎么办？</strong><br />在登录页面点击“忘记密码”，输入注册邮箱并按照指引重置密码。</li>
        <li><strong>照片上传有限制吗？</strong><br />上传的照片需为JPEG或PNG格式，大小不得超过500KB。</li>
        <li><strong>如何加入社区？</strong><br />进入社区页面，点击右上角加入社区。</li>
      </ol>
    </section>

    <hr />

    <!-- 技术支持 -->
    <section>
      <h2>技术支持</h2>
      <p>如遇任何问题，请通过以下方式联系我们：</p>
      <ul>
        <li><strong>邮箱</strong>: 1934030082@qq.com</li>
        <li><strong>客服电话</strong>: 13234314917</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.help-docs-page {
  margin: 20px auto;
  max-width: 800px;
  line-height: 1.6;
}

.help-docs-page h1,
.help-docs-page h2 {
  color: #333;
}

.help-docs-page h2 {
  margin-top: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
}

.help-docs-page ul,
.help-docs-page ol {
  padding-left: 20px;
}

.help-docs-page ul li,
.help-docs-page ol li {
  margin-bottom: 10px;
}

.help-docs-page hr {
  margin: 20px 0;
  border: none;
  border-top: 1px solid #ddd;
}
</style>
