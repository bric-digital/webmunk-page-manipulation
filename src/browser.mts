import { WebmunkClientModule, registerWebmunkModule } from '@bric/webmunk-core/browser'

class PageManipulationModule extends WebmunkClientModule {
  constructor() {
    super()
  }

  setup() {
    console.log(`Setting up PageManipulationModule...`)

  }
}

const plugin = new PageManipulationModule()

registerWebmunkModule(plugin)

export default plugin
