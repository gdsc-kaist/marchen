<script lang="ts">
    import Head from "$lib/Head.svelte";
    import Tab from "$lib/Tab.svelte";
</script>


<Head title="예약 메뉴" size={200} img="https://i.imgur.com/ko0FTro.jpg"/>
<Tab tabs={[{icon: 'history', title: '현황', link: '/rental'}, {icon: 'pan_tool_alt', title: '대여', link: '/rental/rent'}]}/>
<slot/>