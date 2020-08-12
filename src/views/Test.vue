<template>
    <div class="test">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                 active-text-color="none">

            <el-menu-item index="1" class="nav">
                <img src="image/logo.png" alt=""></el-menu-item>
            <el-menu-item index="2" class="nav">个人中心
                <i class="el-icon-user"></i>
            </el-menu-item>

            <el-menu-item index="3" class="nav">消息中心
                <i class="el-icon-s-promotion"></i>
            </el-menu-item>
            <el-menu-item index="4" class="nav">
                <el-button type="info" icon="el-icon-search" plain class="el-searchbutton" size="small">搜索</el-button>

            </el-menu-item>
            <el-menu-item index="5" class="nav">
                <el-input placeholder="搜索文档" v-model="input" clearable></el-input>

            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "Test"
    }
</script>

<style scoped>

</style>