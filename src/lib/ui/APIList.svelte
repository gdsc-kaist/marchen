<script lang="ts">
    import Skeleton from "$ui/Skeleton.svelte";
    import {Table, Th, Button, CircularProgress, Icon} from "nunui";
    import Error from "$ui/Error.svelte";
    import api from "$utils/api";
    import {onMount, setContext} from "svelte";
    import {goto} from "$app/navigation";
    import {page} from "$app/stores";
    import {s} from "$utils/transition";
    import {writable} from "svelte/store";

    const _list = setContext('list', writable<any[]>([]))

    export let url = '', endpoint = url, title = '', list = [], custom = false, used = new Set(), key = '_id',
        more = true, line = 10;
    let cursor = $page.url.hash.slice(1) || '', error = null, loaded = false, first = !cursor;
    let lock = false, req = false, end = false;

    function load() {
        return new Promise(resolve => {
            lock = true;
            req = false;
            api(endpoint.replace('$CURSOR$', cursor)).then(res => {
                cursor = res.cursor;
                for (const i of res.list) if (!used.has(i[key])) {
                    list.push(i);
                    used.add(i[key]);
                }
                list = list;
                end = !res.more;
                loaded = true;
                error = null;
                lock = false;
                resolve();
            }).catch(e => {
                error = e;
                loaded = true;
                resolve();
            })
        })
    }

    function reset() {
        first = true;
        list = [];
        req = true;
        cursor = '';
        used.clear();
        goto('#', {noScroll: true});
    }

    onMount(load);
    $: _list.set(list);

    $: !lock && req && load();
    $: titleInfo = title.split(';').map(i => i.split('|')).map(i => [i[0], +i[1] || 1]);
</script>


{#if !first}
    <div class="load">
        <Button transparent on:click={reset} disabled={lock} style="width: calc(100% - 20px);">
            {#if lock}
                <CircularProgress size="16" indeterminate/>
            {:else}
                <Icon icon="expand_less"/>
            {/if}
            처음으로
        </Button>
    </div>
{/if}

{#key titleInfo}
    <Skeleton size='38.89' {line} width='100' margin='38.89' {loaded} first>
        {#if error}
            <Error {error}/>
        {:else if !list?.length && loaded}
            <Error notfound="목록" target="아무것도"/>
        {:else}
            {#if custom}
                {#each list as data, i(data[key])}
                    <slot {data} {i} {s} background={i % 2 ? undefined : 'var(--primary-light1)'} refresh={reset}/>
                {/each}
            {:else}
                <main>
                    <slot name="top"/>
                    <Table style="margin-bottom: -20px;" minWidth="700">
                        <tr>
                            {#each titleInfo as [title, width]}
                                <Th width={width}>{title}</Th>
                            {/each}
                        </tr>
                        {#each list as data, i(data[key])}
                            <tr>
                                <slot {list} {data} {i} {s} background={i % 2 ? undefined : 'var(--primary-light1)'}/>
                            </tr>
                        {/each}
                        {#if !end}
                            {#each {length: 2} as _}
                                <tr>
                                    {#each titleInfo as _}
                                        <td>
                                            <div style="height: 20px;padding: 0">
                                                <div style="background: var(--primary-light3);width: 100%;height:100%;border-radius: 8px"></div>
                                            </div>
                                        </td>
                                    {/each}
                                </tr>
                            {/each}
                        {/if}
                    </Table>
                    {#if !end}
                        <div class="more"></div>
                    {/if}
                </main>
            {/if}
            {#if !end && more}
                {#if more === 'custom'}
                    <slot name="more"/>
                {:else}
                    <div class="load">
                        <Button transparent on:click={() => {
                        goto('#' + cursor, {noScroll: true});
                        req = true;
                    }} disabled={lock} style="width: calc(100% - 20px);">
                            {#if lock}
                                <CircularProgress size="16" indeterminate/>
                            {:else}
                                <Icon icon="expand_more"/>
                            {/if}
                            더 보기
                        </Button>
                    </div>
                {/if}
            {/if}
        {/if}
    </Skeleton>
{/key}


<style lang="scss">
  main {
    position: relative;

    :global {
      tr > * {
        display: table-cell;
        color: var(--on-surface);
        text-decoration: none;
        padding: 10.5px 5px;
        vertical-align: middle;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;

        &:first-child {
          border-radius: 8px 0 0 8px;
        }

        &:last-child {
          border-radius: 0 8px 8px 0;
        }

        & > * {
          margin-right: 6px;
          white-space: initial;
        }

        & > div {
          display: flex;
          align-items: center;

          & > * {
            margin: -4px 6px -4px 0;
          }
        }
      }
    }
  }

  .more {
    position: absolute;
    bottom: 20px;
    left: 0;
    width: 100%;
    height: 80px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, var(--surface) 100%);
  }

  .load :global(.wrapper) {
    background: var(--primary-light2) !important;
    color: var(--on-surface) !important;
  }

  .load :global(.adapter) {
    --rop: 0.4 !important;
  }
</style>
