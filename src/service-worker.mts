import { WebmunkServiceWorkerModule, registerWebmunkModule } from '@bric/webmunk-core/service-worker'

class PageManipulationModule extends WebmunkServiceWorkerModule {
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
