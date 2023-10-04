<script lang="ts">
    import ImageLoader from "$ui/ImageLoader.svelte";
    import {staticUrl} from "$utils/api";

    export let error: any = null, target = '아무것도', notfound = '', description = '', info = null;

    function errorInfo() {
        if (info) return info;
        if (error.code === 401) return '로그인이 필요해요.';
        if (error.code === 403) return '권한이 없어요.';
        return '오류가 발생했어요.';
    }

    function errorImage() {
        if (error.code === 401) return 'signin';
        if (error.code === 403) return 'error';
        return 'error';
    }

    $: title = error ? errorInfo() : `이 ${notfound}에 아직 ${target} 없어요.`;
    $: image = error ? errorImage() : 'notfound';
    $: !description && (description = error ? '계속 문제가 생기면 기능 제안 또는 메일로 알려주세요.' : '썰렁하네요.');
</script>

<ImageLoader src="{staticUrl}/{image}.svg" contain height="300px"/>
<h1 style="text-align: center;margin-top: 40px;">{title}</h1>
{#if error}
    <h5 style="text-align: center">{error.toString()}</h5>
{/if}
<h3 style="text-align: center">{description}</h3>
