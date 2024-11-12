<template>
    <div id="templatemo_events" class="container_wapper">
        <div class="container-fluid">
            <h1>Events</h1>
            <div @click="toExhibition1" class="col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-0">
                <div class="event_box_wap event_animate_left">
                    <div class="event_box_img">
                        <img src="../../static/assets/images/templatemo_event_01.jpg" class="img-responsive" alt="南京大学" />
                    </div>
                    <div class="event_box_caption">
                        <h1>第一届南京大学摄影展</h1>
                        <p><span class="glyphicon glyphicon-map-marker"></span> 南京 &nbsp;&nbsp; </p>
                        <p>第一届南京大学摄影展旨在展示校园内外的精彩瞬间，鼓励学生和教职工通过摄影表达对生活的热爱与思考。展览汇集了来自不同专业和背景的摄影作品，涵盖自然风光、人文景观、校园生活等主题。</p>
                    </div>
                </div>
            </div>
            <div @click="toExhibition3" class="col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-0">
                <div class="event_box_wap event_animate_right">
                    <div class="event_box_img">
                        <img src="../../static/assets/images/templatemo_event_02.jpg" class="img-responsive" alt="中国之美" />
                    </div>
                    <div class="event_box_caption">
                        <h1>2024发现中国之美</h1>
                        <p><span class="glyphicon glyphicon-map-marker"></span> 上海 &nbsp;&nbsp; </p>
                        <p>“2024发现中国之美”是一项旨在展现中国丰富文化和自然景观的活动。通过摄影、绘画、音乐和文学等多种艺术形式，我们邀请来自全国各地的艺术家和爱好者，共同探索和记录中国的独特魅力。</p>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
            <div @click="toExhibition2" class="col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-0">
                <div class="event_box_wap event_animate_left">
                    <div class="event_box_img">
                        <img src="../../static/assets/images/templatemo_event_03.jpg" class="img-responsive" alt="人气摄影师" />
                    </div>
                    <div class="event_box_caption">
                        <h1>2024最人气摄影师评选</h1>
                        <p><span class="glyphicon glyphicon-map-marker"></span> 武汉 &nbsp;&nbsp; </p>
                        <p>2024最人气摄影师评选旨在表彰和推广优秀的摄影师，展示他们在艺术创作和社会影响方面的杰出贡献。活动通过网络投票和专家评审相结合的方式，评选出在各个领域表现突出的摄影师。</p>
                    </div>
                </div>
            </div>
            <div @click="toExhibition4" class="col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-0">
                <div class="event_box_wap event_animate_right">
                    <div class="event_box_img">
                        <img src="../../static/assets/images/templatemo_event_04.jpg" class="img-responsive" alt="交流会" />
                    </div>
                    <div class="event_box_caption">
                        <h1>摄影心得交流会</h1>
                        <p><span class="glyphicon glyphicon-map-marker"></span> 南京大学 &nbsp;&nbsp; </p>
                        <p>南京大学摄影心得交流会旨在为摄影爱好者提供一个互动分享的平台，促进彼此之间的经验交流与学习。在会上，参与者将分享自己在摄影创作中的体会、技巧和灵感等</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    methods: {
        toExhibition1: function() {
            localStorage.setItem("now", 1)
            this.$router.push('/Exhibition1')
            window.scrollTo(0,0);
        },
        toExhibition2: function() {
            localStorage.setItem("now", 2)
            this.$router.push('/Exhibition2')
            window.scrollTo(0,0);
        },
        toExhibition3: function() {
            localStorage.setItem("now", 3)
            this.$router.push('/Exhibition3')
            window.scrollTo(0,0);
        },
        toExhibition4: function() {
            localStorage.setItem("now", 4)
            this.$router.push('/Exhibition4')
            window.scrollTo(0,0);
        }
    }
}
</script>
