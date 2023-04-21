<script setup lang="ts" :inheritAttrs="false"></script>

<template>
  <a-scrollbar
    outer-style="flex: 1; overflow: hidden;"
    class="overflow-y-auto h-full p-4 flex flex-col gap-y-2"
  >
    <div class="home-logo__wrapper">
      <img class="logo" src="@/assets/openai.svg" alt="1024 智能 AI" />
      <h1 class="title">1024 智能 AI</h1>
    </div>
    <div class="feature-grid xl:max-w-6xl max-w-11/12">
      <article class="feature dark:bg-dark">
        <a-button class="icon bg-gray-200 dark:bg-dark-900">🤖</a-button>
        <h2 class="title">智能问答</h2>
        <p class="details">
          对您提出的问题进行回答，根据问题的语义和上下文提供最准确的答案
        </p>
      </article>
      <article class="feature dark:bg-dark">
        <a-button class="icon bg-gray-200 dark:bg-dark-900">🌐</a-button>
        <h2 class="title">自动翻译</h2>
        <p class="details">
          对您输入的内容进行翻译，将其翻译成指定语言，方便跨语言交流。
        </p>
      </article>
      <article class="feature dark:bg-dark">
        <a-button class="icon bg-gray-200 dark:bg-dark-900">💡</a-button>
        <h2 class="title">文案生成</h2>
        <p class="details">
          根据您的需求，自动生成符合行业标准的广告文案、营销文案等，提高您的创意和效率。
        </p>
      </article>
      <article class="feature dark:bg-dark">
        <a-button class="icon bg-gray-200 dark:bg-dark-900">📝</a-button>
        <h2 class="title">智能写作</h2>
        <p class="details">
          根据您提供的主题和要求，自动生成高质量的文章、作文、论文等内容，方便您的写作和创作。
        </p>
      </article>
      <article class="feature dark:bg-dark">
        <a-button class="icon bg-gray-200 dark:bg-dark-900">🔍</a-button>
        <h2 class="title">自动摘要</h2>
        <p class="details">
          自动提取文章的关键信息和摘要，帮助您快速了解文章内容。
        </p>
      </article>
      <article class="feature dark:bg-dark">
        <a-button class="icon bg-gray-200 dark:bg-dark-900">✏️</a-button>
        <h2 class="title">自动纠错</h2>
        <p class="details">
          根据您输入的内容进行语法和拼写纠错，提高文本质量和可读性。
        </p>
      </article>
    </div>
    <div class="flex items-center justify-center mt-6 gap-x-6">
      <a-button
        type="primary"
        shape="round"
        @click="$router.push({ name: 'Chat' })"
      >
        开启GPT互动
      </a-button>
      <!-- <a-button
        type="outline"
        shape="round"
        @click="$router.push({ name: 'Tools' })"
      >
        AI实用工具箱
      </a-button> -->
    </div>
  </a-scrollbar>
</template>

<style lang="less" scoped>
.home-logo__wrapper {
  @apply hidden flex-col lg:flex items-center justify-center text-primary  pt-2 lg:pt-4 lg:pt-10;
  .logo {
    @apply w-6 lg:w-10 h-6 lg:h-10;
  }

  .title {
    @apply text-base lg:text-xl;
  }
}
.feature-grid {
  @apply grid grid-cols-2 lg:grid-cols-3 w-full mx-auto gap-2 lg:gap-6  pt-2 lg:pt-4;
  .feature {
    @apply p-2 lg:p-4 rounded-md;
    background-color: var(--color-secondary);
    .icon {
      @apply text-sm h-6 w-6 lg:h-10 lg:w-10 lg:text-xl p-0 rounded-md;
    }
    .title {
      @apply text-sm lg:text-base dark:text-gray-300;
    }
    .details {
      @apply text-xs lg:text-sm  dark:text-gray-500;
    }
  }
}
</style>
