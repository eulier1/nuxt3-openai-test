<template>
    <div class="bg-white">
  
      <div class="relative isolate px-6 pt-14 lg:px-8">
        <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
        </div>
        <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div class="text-center">
            <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Summarize text effortlessly using Nuxt 3 and OpenAI API</h1>
            <p class="mt-6 text-lg leading-8 text-gray-600">Add a url below</p>
            <div class="mt-3 flex items-center justify-center gap-x-6">
                <div class="relative mt-2 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span class="text-gray-500 sm:text-sm">🌐</span>
                    </div>
                    <input v-model="url" type="text" name="price" id="price" class="block w-full rounded-md border-0 py-1.5 pl-9 pr-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="URL" />
                </div>
            </div>
            <p class="mt-6 text-lg leading-8 text-gray-600">Amount of words</p>
            <div class="mt-3 flex items-center justify-center gap-x-6">
                <div class="relative mt-2 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span class="text-gray-500 sm:text-sm">📝</span>
                    </div>
                    <input v-model="words" type="number" name="price" id="price" class="block w-full rounded-md border-0 py-1.5 pl-9 pr-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Summarize a text in 50 words" />
                </div>
            </div>
            <p class="mt-6 text-lg leading-8 text-gray-600">Topics (separate it using comma)</p>
            <div class="mt-3 flex items-center justify-center gap-x-6">
                <div class="relative mt-2 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span class="text-gray-500 sm:text-sm">🤔</span>
                    </div>
                    <input v-model="topics" type="text" name="price" id="price" class="block w-full rounded-md border-0 py-1.5 pl-9 pr-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="price, industry, main idea" />
                </div>
            </div>
            <div class="flex justify-center mt-6 mb-6">
                <button @click="submit()" class=" rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Summarize</button>
            </div>
            {{ promptResult }}
          </div>

        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useOpenAIStore } from "../stores/openai"
  import { storeToRefs } from "pinia";
  
  const url = ref("")
  const words = ref("")
  const topics = ref("")
  const openaAIStore = useOpenAIStore()
  const { promptResult } = storeToRefs(openaAIStore)

  function submit(){
    console.log('submit')
    openaAIStore.summarizing({
        url: url.value,
        words: words.value,
        topics: topics.value
    })
  }

  </script>

  