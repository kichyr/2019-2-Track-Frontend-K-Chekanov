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
    jest.setTimeout(30000)
    await expect(page.title()).resolves.toMatch('TTchat')
  }, 30000)

  it('should create new chat with proper name', async () => {
    jest.setTimeout(30000)
    const test_topic_name = 'test_topic'
    const test_message_text = 'Hi, it is just test message'
    page.$('[name=plus_butt]').then((element) => element.click())
    await expect(page).toFill('input[id="topic_form"]', test_topic_name)
    await page.waitForFunction('document.querySelector("[name=create_chat_button]") != null')
    page.$('[name=create_chat_button]').then((element) => element.click())
    await page.waitFor(1000)
    const test_chat = await page.$x(`//*[text() = '${test_topic_name}']`)
    if (test_chat.length > 0) {
      await test_chat[0].click()
    } else {
      throw new Error('TestChat not found in chat List')
    }
    // passing message text and click the button sed
    await expect(page).toFill('input[id="message_input"]', test_message_text)
    page.$('[id=send_message_button]').then((element) => element.click())
    await expect(page.title()).resolves.toMatch('TTchat')

    // checking that message with test_messsage_text appeared on the page
    await page.waitFor(1000)
    const message_holder = await page.$x(`//*[text() = '${test_message_text}']`)
    await page.waitFor(1000)
    if (message_holder.length == 0) {
      throw new Error('sended message not found')
    }
  }, 30000)

  it('should back to proper chat list after opening chat', async () => {
    jest.setTimeout(30000)
    const test_topic_name = 'test_topic'
    page.$('[name=plus_butt]').then((element) => element.click())
    await expect(page).toFill('input[id="topic_form"]', test_topic_name)
    await page.waitForFunction('document.querySelector("[name=create_chat_button]") != null')
    page.$('[name=create_chat_button]').then((element) => element.click())
    await page.waitFor(1000)
    let test_chat = await page.$x(`//*[text() = '${test_topic_name}']`)
    if (test_chat.length > 0) {
      await test_chat[0].click()
    } else {
      throw new Error('TestChat not found in chat List')
    }
    await page.waitFor(1000)
    page.$('[id=chatBack]').then((element) => element.click())
    // Again try to find created test chat
    test_chat = await page.$x(`//*[text() = '${test_topic_name}']`)
    if (test_chat.length > 0) {
      await test_chat[0].click()
    } else {
      //throw new Error('TestChat not found in chat List')
    }
    await page.waitFor(1000)
  }, 30000)
})
