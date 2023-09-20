<script lang="ts">
    import {onMount, setContext} from 'svelte'
    import {Card, Input} from "nunui";
    import Tiptap from "@seorii/tiptap";
    import {toWebp, handleDrop} from "$utils/image";
    import api from "$utils/api";
    import {writable} from "svelte/store";

    export let body = '', editor = false, upload = 'board', style = '';
    let fullscreen = false, html = false;
    const tiptap = setContext('tiptap', writable(null));

    async function uploadFile(blob: Blob, ext: string, name?: string) {
        const {upload: endpoint, src, id} = await api(`/upload?ext=${ext}&type=${upload}&name=${encodeURIComponent(name || '')}`, {}) as any;
        await fetch(endpoint, {
            method: 'PUT',
            headers: {'Content-Type': blob.type},
            body: blob,
        });
        return {src, id};
    }

    async function imageHandler(file: File) {
        const blob = await toWebp(file);
        return (await uploadFile(blob, 'webp')).src
    }

    function fixRange(editor: any, range: any, split = '/') {
        const {state} = editor.view, {selection, doc} = state
        if (selection.$to.nodeBefore?.text?.includes?.(split)) {
            range.from = range.to
            while (range.from > 0 && doc.textBetween(range.from - 1, range.from) !== split) {
                try {
                    range.from -= 1
                } catch (e) {
                    range.from += 2
                    break
                }
            }
            range.from -= 1
        }
        while (range.to < selection.to && doc.textBetween(range.to, range.to + 1) !== ' ') {
            try {
                range.to += 1
            } catch (e) {
                range.to -= 1
                break
            }
        }
        return range
    }

    setContext('upload', upload);

    onMount(() => {
        setTimeout(() => {
            ((<any>window).__image_uploader = imageHandler)
        }, 100)
    })

    const blocks = []
</script>

<main>
    {#if html}
        <Input multiline fullWidth placeholder="HTML" bind:value={body}/>
    {:else}
        {#if editor}
            <Card outlined style="overflow:visible;">
                <Tiptap bind:ref={$tiptap} bind:body bind:fullscreen {style} editable imageUpload={imageHandler}
                        {blocks}
                        options={{editorProps: {handleDrop}, plugins:[File]}}/>
            </Card>
        {:else}
            <Tiptap bind:ref={$tiptap} bind:body bind:fullscreen {style}
                    options={{editorProps: {handleDrop}, plugins:[File]}}/>
        {/if}
    {/if}
</main>


<style lang="scss">
  main {
    :global {
      iframe, object, embed {
        border-radius: 12px;
      }
    }
  }
</style>