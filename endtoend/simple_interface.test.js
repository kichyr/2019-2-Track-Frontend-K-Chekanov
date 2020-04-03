import 'regenerator-runtime/runtime'

describe('e2e tests', () => {
  beforeEach(async () => {
    await page.goto(
      'localhost:3000',
      {
        waitUntil: 'networkidle0',
      },
      30000,
    )
  }, 30000)

  it('should be titled "TTchat"', async () => {
    await expect(page.title()).resolves.toMatch('TTchat')
  }, 30000)

  it('should create new chat with proper name', async () => {
    const test_topic_name = 'test_topic'
    const test_message_text = 'Hi, it is just test message'
    await page.waitFor(`[name=plus_butt]`)
    await page.click('[name=plus_butt]')
    await expect(page).toFill('input[id="topic_form"]', test_topic_name)
    await page.waitForFunction('document.querySelector("[name=create_chat_button]") != null')
    await page.click('[name=create_chat_button]')
    await page.click(`div[role = 'button']`)
    // passing message text and click the button sed
    await expect(page).toFill('input[id="message_input"]', test_message_text)
    await page.click('[id=send_message_button]')
  }, 30000)

  it('should back to proper chat list after opening chat', async () => {
    const test_topic_name = 'test_topic'
    const test_message_text = 'Hi, it is just test message'

    await page.waitFor(`[name=plus_butt]`)
    await page.click('[name=plus_butt]')
    await expect(page).toFill('input[id="topic_form"]', test_topic_name)
    await page.waitForFunction('document.querySelector("[name=create_chat_button]") != null')
    await page.click('[name=create_chat_button]')
    await page.click(`div[role = 'button']`)
    await page.waitFor(`[id=chatBack]`)
    await page.click(`[id=chatBack]`)
  }, 30000)
})
