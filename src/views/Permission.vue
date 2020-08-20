<template>
    <div id="Permission">
        <i class="el-icon-back" >
            <a @click="re" class="text">返回原界面</a>
            </i>
    </div>
</template>

<script>

    export default {
        components: {
        },
        data() {
            return {}           
            },
        methods: {
            re:function(){
                    this.$router.go(-1)
                }
        }
    };
</script>

<style scoped>
    @font-face {
        font-family: fonttype2;
        src: url(../assets/MaShanZheng-Regular.ttf);
        }
    #Permission{
        background: url("../assets/reject.jpg");
        background-size: 100% 100%;
        height: 100%;
        position: fixed;
        width: 100%
    }

    .test{
        font-family: fonttype2;
        letter-spacing:1%;
    }
    .el-icon-back{
        padding-top: 32%;
        padding-left: 30%;
        font-size: 50px;
        
        
    }
    
</style>