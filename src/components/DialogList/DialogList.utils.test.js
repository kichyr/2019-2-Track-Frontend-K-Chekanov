import { getChat } from './DialogList'

describe('GetChat by id', () => {
  it('sums numbers', () => {
    const chatData = { chat_id: '0', topic: 'test', lastmessage: '' }
    localStorage.setItem(
      'messages',
      `{
                "0": [{
                    "messageText": "hello",
                    "userId": 1,
                    "time": "2020-2-13 21:13:43",
                    "chatId": 0,
                    "contentType": "text",
                    "link": "",
                    "fileName": ""
                }]
            }`,
    )
    localStorage.setItem(
      'DialogList',
      `[{
            "chat_id": 0,
            "topic": "test",
            "lastmessage": ""
        }]`,
    )
    expect(getChat(0)).toEqual({
      chatId: 0,
      messages: [
        {
          chatId: 0,
          contentType: 'text',
          fileName: '',
          link: '',
          messageText: 'hello',
          time: '2020-2-13 21:13:43',
          userId: 1,
        },
      ],
      topic: 'test',
    })
  })
})
