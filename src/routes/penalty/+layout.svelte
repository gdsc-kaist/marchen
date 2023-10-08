<script lang="ts">
    import Head from "$lib/Head.svelte";
    import Tab from "$lib/Tab.svelte";
</script>

<Head title="경고"
      img="https://images.unsplash.com/photo-1586201687415-f89f8bd2ab38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"/>
<Tab tabs={[{icon: 'info', title: '개요', link: '/penalty'}, {icon: 'thumb_down', title: '부여', link: '/penalty/apply'}]}/>
<slot/>