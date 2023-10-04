<script lang='ts' context='module'>
    const loadedImages = new Map();
</script>

<script lang='ts'>
    import {tweened} from 'svelte/motion';
    import {browser} from '$app/environment';
    import {onMount} from "svelte";

    export let src: any, noFade = false,
        contain = false,
        original = false,
        height = '100%',
        width = '100%',
        blur = 0,
        zoom = 1, fade = !noFade, dark = false, inline = false;

    const _blur = tweened(blur, {duration: 200});
    $: $_blur = blur;

    let loadedStyle = '', show = 0, mounted = false;

    $: if (src && mounted) {
        loadedStyle = '';
        const srcSet = Array.isArray(src) ? src : [src];
        (async () => {
            for (const src of srcSet) {
                try {
                    if (!loadedImages.has(src)) {
                        await fetch(src, {credentials: 'include'}).then(res => {
                            if (!res.ok) throw new Error('Failed to load image');
                            return res.blob();
                        }).then(blob => {
                            const img = new Image();
                            img.src = URL.createObjectURL(blob);
                            const url = URL.createObjectURL(blob);
                            loadedStyle = 'url(' + url + ')';
                            loadedImages.set(src, {url, width: img.naturalWidth, height: img.naturalHeight});
                            if (height === 'auto') height = img.naturalHeight + 'px';
                            if (width === 'auto') width = img.naturalWidth + 'px';
                            show = 1;
                            setTimeout(() => {
                                show = 2;
                            }, 200);
                        });
                    } else {
                        loadedStyle = 'url(' + loadedImages.get(src)?.url + ')';
                        if (height === 'auto') height = loadedImages.get(src)?.height + 'px';
                        if (width === 'auto') width = loadedImages.get(src)?.width + 'px';
                        show = 1;
                        setTimeout(() => {
                            show = 2;
                        }, 200);
                    }
                    break;
                } catch (e) {

                }
            }
        })();
    }

    if (browser) onMount(() => mounted = true);
</script>

<style lang='scss'>
  .image {
    background-size: cover !important;
    background-position: center;
    background-repeat: no-repeat;
    background-image: var(--src);
    width: 100%;
    overflow: hidden;
    transition: filter 0.2s ease-in-out;

    &.fade {
      animation: show 0.6s ease-in-out;
    }

    :global(.dark) &:not(.original) {
      filter: brightness(0.55) contrast(1.3);
    }

    &.inline {
      display: inline-block;
    }

    .preloader {
      width: 40%;
      height: 100%;
      position: relative;
      background: linear-gradient(
                      to right,
                      #00000000 0%,
                      #00000011 33%,
                      #00000011 66%,
                      #00000000 100%
      );

      :global(.dark) &, &.dark {
        background: linear-gradient(
                        to right,
                        #ffffff00 0%,
                        #ffffff11 33%,
                        #ffffff11 66%,
                        #ffffff00 100%
        );
      }

      animation: preload 1.2s ease-in-out infinite;

      &.transparent {
        opacity: 0;
      }

      &.hide {
        display: none;
      }
    }
  }

  .contain {
    background-size: contain !important;
  }

  @keyframes show {
    from {
      opacity: 0;
      transform: scale(var(--zoom));
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes preload {
    0% {
      left: -40%;
    }
    70% {
      left: 100%;
    }
    100% {
      left: 100%;
    }
  }
</style>

{#key loadedStyle}
    <div class:image={1} style:--src={loadedStyle} style:height style:width style:--zoom={zoom} class:fade on:click
         style:filter={$_blur > 0 ? `blur(${$_blur}px)` : ''} class:contain class:original {...$$restProps}
         class:inline>
        <div class='preloader' class:dark class:transparent={show === 1} class:hide={show === 2}></div>
    </div>
{/key}
