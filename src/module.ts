import { defineNuxtModule, addComponent } from '@nuxt/kit'

export interface CarouselOptions {
  prefix: string
}

export default defineNuxtModule<CarouselOptions>({
  meta: {
    name: 'vue3-carousel-nuxt',
    compatibility: {
      nuxt: '>=3.0.0'
    }
  },
  setup (options, nuxt) {
    const prefix = options.prefix || nuxt.options.carousel?.prefix || '';

    (['Carousel', 'Slide', 'Pagination', 'Navigation'] as string[]).map((c) => ({
      name: `${prefix}${c}`,
      filePath: 'vue3-carousel/dist/carousel',
      export: c
    })).forEach((c) => {
      addComponent(c)
    })

    // Add slider css
    nuxt.options.css.unshift('vue3-carousel/dist/carousel.css')
    nuxt.options.alias = {
      ...nuxt.options.alias,
      'vue3-carousel/dist/carousel': 'vue3-carousel/dist/carousel.es.js',
    }
  }
})

declare module '@nuxt/schema' {
  interface NuxtConfig {
    carousel?: CarouselOptions
  }
  interface NuxtOptions {
    carousel?: CarouselOptions
  }
}