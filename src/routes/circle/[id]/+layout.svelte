<script lang="ts">
    import Tab from "$lib/Tab.svelte";
    import Head from "$lib/Head.svelte";
    import Provider from "$lib/Provider.svelte";

    export let data;
    $: url = '/circle/' + data.id;
</script>

<Head title="동아리 총람/상세" size="200"
      img="https://images.unsplash.com/photo-1518095695691-352141ca6c0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3027&q=80"/>

<Tab tabs={[{icon: 'info', title: '개요', link: url}, {icon: 'stadium', title: '활동 내역', link: url + '/activity'}, {icon: 'playing_cards', title: '경고', link: url + '/penalty'}, {icon: 'edit', title: '편집', link: url + '/edit'}]}/>

<Provider circle={data.id} let:data>
    <slot/>
</Provider>