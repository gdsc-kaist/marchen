<script lang='ts'>
    export let size = 18, line = 1, width, loaded = false, margin = 5, first = false;
    let hide = loaded, _hide = hide;

    $: _line = +(line) || 10;

    $: {
        if (loaded) {
            setTimeout(() => hide = true, 620);
        } else hide = false;
    }
</script>

<div class='container --skeleton' style:min-height="{loaded ? 0 : (size + margin) * line}px">
    {#if !hide}
        <div class='content preload' class:hide={loaded}>
            {#each {length: _line} as _, i}
                <div class={i || first ? 'skeleton' : 'line'} style:--sh="{size}px"
                     style:--sw="{width||(line>1?(i===line-1?40:Math.random()*15+85):100)}%">
                    <div class='preloader'></div>
                </div>
                <div class="line" style:--sh="{margin}px"
                     style:--sw="{width||(line>1?(i===line-1?40:Math.random()*15+85):100)}%"></div>
            {/each}
        </div>
    {/if}
    {#key _line}
        <div class="content" class:hide={!loaded}>
            <slot/>
        </div>
    {/key}
</div>

<style lang='scss'>
  .hide {
    opacity: 0 !important;
  }

  .container {
    position: relative;
    display: grid;
    grid-template-columns: 100%;
    width: 100%;
  }

  .preload {
    position: absolute;
    pointer-events: none;
    user-select: none;
  }

  .content {
    transition: opacity 0.6s ease-in-out;
    grid-row-start: 1;
    grid-column-start: 1;
    opacity: 1;
    width: 100%;
  }

  .line {
    width: var(--sw);
    height: var(--sh);
    overflow: hidden;
    border-radius: 12px;
  }

  .skeleton {
    background: var(--primary-light1);
    width: var(--sw);
    height: var(--sh);
    overflow: hidden;
    border-radius: 12px;

    .preloader {
      width: 40%;
      height: 100%;
      position: relative;
      background: linear-gradient(to right, var(--primary-light2) 0%, var(--primary-light3) 33%, var(--primary-light3) 66%, var(--primary-light2) 100%);

      left: 0;
      animation: preload 1.2s ease-in-out infinite;

      &.transparent {
        opacity: 0;
      }

      &.hide {
        display: none;
      }
    }
  }

  @keyframes preload {
    0% {
      transform: translateX(-100%);
    }
    70% {
      transform: translateX(250%);
    }
    100% {
      transform: translateX(250%);
    }
  }
</style>
