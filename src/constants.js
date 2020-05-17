export const MESSAGE_TYPE = {
  QUESTION: 1,
  TALK: 2,
}

export const RANDOM_POST_TITLE = [
  'こんな話題はどう？',
  '話題に詰まったらここから',
  'ここから選んで投げかけてみる？'
]

export const RANDOM_FIRST_MESSAGE = [
  {
    messageType: MESSAGE_TYPE.QUESTION,
    body: '土日何してる？'
  },
  {
    messageType: MESSAGE_TYPE.QUESTION,
    body: '最近あった良いこと教えて'
  },
  {
    messageType: MESSAGE_TYPE.QUESTION,
    body: 'ハマってることは？'
  },
]

export const MAX_MESSAGE_BODY_COUNT = 100;
