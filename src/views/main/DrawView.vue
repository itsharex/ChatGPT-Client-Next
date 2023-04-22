<script setup lang="ts">
import { chunk } from 'lodash-es'

import { useDrawStore } from '@/store/draw'

const formState = reactive({
  prompt:
    '一只白色的暹罗猫的摄影棚风的的近距离照，它看起来很好奇并且有光从它的耳朵处透过',
  size: '256x256',
  n: 1,
  response_format: 'url'
})
const drawPromptIndex = ref(0)
const currentDrawPrompt = computed(
  () => chunk(DRAW_PROMPT, 2)[drawPromptIndex.value]
)
const handleChangeKeyword = () => {
  const drawPromptChunk = chunk(DRAW_PROMPT, 2)
  const maxIndex = drawPromptChunk.length - 1
  const nextIndex =
    drawPromptIndex.value + 1 > maxIndex ? 0 : drawPromptIndex.value + 1
  drawPromptIndex.value = nextIndex
}

const drawStore = useDrawStore()

const handleDrawImage = () => {
  return
  drawStore.imageDrawAction(formState)
}
</script>

<template>
  <a-scrollbar
    outer-style="flex: 1; overflow: hidden;"
    class="overflow-y-auto h-full p-4 flex flex-col gap-y-2"
  >
    <div class="draw-view">
      <a-alert type="info" class="max-w-max mx-auto rounded-full text-xs">
        <template #icon>
          <icon-exclamation-circle-fill />
        </template>
        根据输入关键词生成~大约需要30s左右时间
      </a-alert>

      <div class="flex items-center gap-x-5">
        <a-typography-text class="h-12 flex items-center" bold>
          关键词示例
        </a-typography-text>
        <a-button type="text" size="mini" @click="handleChangeKeyword">
          <icon-loop />
        </a-button>
      </div>
      <div
        v-for="item in currentDrawPrompt"
        :key="item.tag"
        class="flex items-center gap-x-1 mb-2"
      >
        <mark class="text-xs px-2 py-1"> {{ item.tag }}</mark>
        <a-typography-paragraph type="secondary" copyable class="mb-0">
          {{ item.keywords }}
        </a-typography-paragraph>
      </div>
      <a-input-search
        class="w-full mb-6 mt-4"
        size="large"
        autofocus
        v-model="formState.prompt"
        placeholder="请用中文输入关键词如上，参考形式: 画面主体，细节描述，修饰词"
        search-button
        @search="handleDrawImage"
      >
        <template #button-icon>
          <icon-robot />
        </template>
        <template #button-default>生成</template>
      </a-input-search>

      <a-form
        :model="formState"
        auto-label-width
        label-align="left"
        class="mt-4 p-4 bg-light-300 dark:bg-dark-900 rounded"
      >
        <a-typography-text class="block" bold> 参数设置 </a-typography-text>
        <a-form-item label="图片尺寸" class="mb-2">
          <a-radio-group v-model="formState.size" type="button">
            <a-radio value="256x256">256x256(小图)</a-radio>
            <a-radio value="512x512">512x512(中图)</a-radio>
            <a-radio value="1024x1024">1024x1024(大图)</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="图片数量" class="mb-2">
          <a-radio-group v-model="formState.n" type="button">
            <a-radio v-for="i in 10" :key="i" :value="i"> {{ i }}张 </a-radio>
          </a-radio-group>
        </a-form-item>
        <!-- <a-divider></a-divider>
        <a-form-item label="修饰词参考" class="mb-2" justify="start">
          <a-typography-paragraph type="secondary" class="mb-0 text-sm">
            您可参考或选用下列各类修饰词丰富您的输入文本, 尝试生成更多样的图像,
            更多修饰词可参考 Prompt指南 或自由输入 探索大型作画等多未知能力,
          </a-typography-paragraph>
        </a-form-item>
        <a-form-item label="图像类型" class="mb-2">
          <a-typography-paragraph type="secondary" class="mb-0 text-sm">
            古风、二次元、写实照片、油画、水彩画、油墨画、黑白雕版画、雕塑、3D模型、、手绘草图、炭笔画、极简线条画、浮世绘、电影质感、机械感
          </a-typography-paragraph>
        </a-form-item> -->
      </a-form>
      <div class="h-96"></div>
    </div>
  </a-scrollbar>
</template>

<style scoped lang="less">
.draw-view {
  @apply max-w-4xl w-full mx-auto bg-white dark:bg-dark p-10 rounded-lg shadow-lg;
}
</style>
