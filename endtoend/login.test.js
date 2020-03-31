import 'regenerator-runtime/runtime'

describe('Google', () => {
  beforeAll(async () => {
    await page.goto('localhost:3000', {
      waitUntil: 'networkidle0',
    })
  })

  it('should be titled "TTchat"', async () => {
    await expect(page.title()).resolves.toMatch('TTchat')
  }, 30000)

  it('should create new chat with proper name', async () => {
    const test_topic_name = 'test_topic'
    page.$('[name=plus_butt]').then((element) => element.click())
    await expect(page).toFill('input[id="topic_form"]', test_topic_name)
    await page.waitForFunction('document.querySelector("[name=create_chat_button]") != null')
    page.$('[name=create_chat_button]').then((element) => element.click())
    await page.waitFor(4000)
    const test_chat = await page.$x(`//*[text() = '${test_topic_name}']`)
    if (test_chat.length > 0) {
      await test_chat[0].click()
    } else {
      throw new Error('Link not found')
    }
    await page.waitFor(4000)
  }, 30000)
})
