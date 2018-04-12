import test from 'ava'
import { Nuxt, Builder } from 'nuxt'
import { resolve } from 'path'

// Сохраним экземпляры nuxt и server.
// Мы сможем сбросить их в конце теста.
let nuxt = null

// Инициализируем Nuxt.js и создадим сервер по адресу localhost:4000
test.before('Init Nuxt.js', async t => {
  const rootDir = resolve(__dirname, '..')
  let config = {}
  try { config = require(resolve(rootDir, 'nuxt.config.js')) } catch (e) {}
  config.rootDir = rootDir // папка проекта
  config.dev = false // финальная сборка
  nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  nuxt.listen(4000, 'localhost')
})

// Пример генерации html-кода только для этого теста
test('Route / exits and render HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute('/', context)
  t.true(html.includes('Restore password'))
})

// Остановить сервер и попросить nuxt не отслеживать изменения файлов
test.after('Closing server and nuxt.js', t => {
  nuxt.close()
})
