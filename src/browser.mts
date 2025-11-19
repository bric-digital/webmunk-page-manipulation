import $ from 'jquery'

import { WebmunkConfiguration } from '@bric/webmunk-core/extension'

import { WebmunkClientModule, registerWebmunkModule } from '@bric/webmunk-core/browser'

    // "page_manipulation": {
    //     "url_redirects": [{
    //         "url_filter": "|https://www.google.com/search*udm=50",
    //         "destination": "restricted.html"
    //     }, {
    //         "url_filter": "||gemini.google.com",
    //         "destination": "restricted.html"
    //     }, {
    //         "url_filter": "||chatgpt.com",
    //         "destination": "restricted.html"
    //     }],
    //     "page_elements": [{
    //         "base_url": "https://www.google.com/search",
    //         "actions": [{
    //             "action": "hide",
    //             "selector": "span.text('AI Mode')"
    //         }]
    //     }]
    // }


class PageManipulationModule extends WebmunkClientModule {
  configuration: any

  constructor() {
    super()
  }

  setup() {
    console.log(`Setting up PageManipulationModule...`)

    chrome.runtime.sendMessage({
        'messageType': 'fetchConfiguration',
      }).then((response:{ [name: string]: any; }) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        const configuration = response as WebmunkConfiguration

        console.log('configuration')
        console.log(configuration)

        this.configuration = configuration['page_manipulation']

        this.applyConfiguration()
      })
  }

  applyConfiguration() {
    if ([null, undefined].includes(this.configuration)) {
      return
    }

    for (const elementRule of this.configuration['page_elements']) {
      var baseUrl = elementRule['base_url']

      if (baseUrl === undefined || window.location.href.toLowerCase().startsWith(baseUrl.toLowerCase())) {
        // Apply rule

        for (const action of elementRule.actions) {
          $(action.selector).each((index, element) => {
            if (action.action === 'hide') {
              const oldValue = $(element).css('display')

              if (oldValue !== undefined) {
                $(element).attr('data-webmunk-prior-css-display', oldValue)
              }

              $(element).css('display', 'none')
            } else if (action.action == 'show') {
              const originalValue = $(element).attr('data-webmunk-prior-css-display')

              if (originalValue !== undefined) {
                $(element).css('display', originalValue)
                $(element).removeAttr('data-webmunk-prior-css-display')
              } else {
                $(element).css('display', '')
              }
            }
          })
        }
      }
    }
  }
}

const plugin = new PageManipulationModule()

registerWebmunkModule(plugin)

export default plugin
