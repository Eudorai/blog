<template>
    <!-- 分页器 -->
    <div class="pagination">
        <!-- pager-count指页码按钮的数量，当总页数超过该值时会折叠，文档规定其应是大于等于5且小于等于21的奇数，默认值是7 -->
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currPage"
                :page-sizes="[10, 15, 20]"
                :page-size="pageSize"
                layout="total, prev, pager, next, sizes, jumper"
                :pager-count="5"
                background
                :total="list.length">
        </el-pagination>

    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props: {
            list: {
                type: Array,
            }
        },
        data() {
            return {
                pageSize: 10,   //每页数据条数
                currPage: 1     //页码
            }
        },
        methods: {
            handleSizeChange(val) {
                this.$emit('sizeChange',val);
            },
            handleCurrentChange(val) {
                this.$emit('currentChange',val);
            },
        }
    }
</script>

<style scoped>
    .pagination >>> .el-pager .number, .pagination >>> .el-icon-more,.pagination >>> .btn-next, .pagination >>> .btn-prev {
        min-width: 30px;
        border: 1px solid #D9D9D9;
        background: #FFFFFF;
        padding: 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: normal;
    }

</style>
