<template>
    <div>回收站</div>
</template>

<script>
    export default {
        name: "Trash",
                components: {},
        data() {
            return {
                isLogin: false,
                userinfo: {
                    id: "",
                    username: "",
                    email: "",

                },
                Files: [
                    {
                        fileid: "1",
                        filename: "文档A",
                        createtime: "2020.1.1",
                        updatetime: "2020.2.2",
                    },
                    {
                        fileid: "2",
                        filename: "文档B",
                        createtime: "2020.1.1",
                        updatetime: "2020.2.2",
                    },

                ]
            };
        },
        created() {
            //此为创建页面时自动进行的
            if (window.sessionStorage.getItem('token')) {
                this.isLogin = true;
                this.getUserInfo();
                this.getDeleteDoc();
            } else {
                this.isLogin = false;
            }
        },
        watch: {},
        methods: {
            toIndex() {
                this.$router.push({path: '/'});
            },
            toEditor() {
                this.$router.push({path: '/editor'});
            },
            toPmsg() {
                this.$router.push({path: '/pmsg'});
            },
            toRecent() {
                this.$router.push({path: '/recent'});
            },
            toFavour() {
                this.$router.push({path: '/favour'});
            },
            toMydoc() {
                this.$router.push({path: '/mydoc'});
            },
            getUserInfo() {
                //从后端获取用户信息
            },
            getDeleteDoc() {
                //获取用户删除的文档列表
            }
        },
    }
</script>

<style scoped>

</style>