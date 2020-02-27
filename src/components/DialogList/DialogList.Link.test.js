describe('GetChat by id', () => {
    it('sums numbers', () => {
        chatData = { chat_id: chatId, topic: Topic, lastmessage: '' };
        localStorage.setItem('messages', '{"0":[{"messageText":"hello","userId":1,"time":"2020-2-13 21:13:43","chatId":0,"contentType":"text","link":"","fileName":""}');
        localStorage.setItem('DialogList', '[{"chat_id":0,"topic":"test","lastmessage":""}]')
        console.log(getChat(0));
        expect(getChat(0)).toEqual('');
        expect(2 + 2).toEqual(4);
    });
});