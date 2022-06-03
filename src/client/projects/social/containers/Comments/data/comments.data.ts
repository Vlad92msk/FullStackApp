export const COMMENTS = [
  {
    commentId: '1', // Id комментария
    appealToEntityId: 6465, //к чему отноосится (ID фото например или UD видео)
    appealToCommentId: null, // к какому комментарию этот ответ (когда отвечаем на комментарии)
    appealToAnswerId: null, // к какому ответу этот ответ (когда отвечаем на ответы)
    userId: 2, // Потзователь который коммент оставил
    userName: 'Пользователь 2',
    appealToUserId: null, // Какому пользователю адресован комментарий
    appealToUserName: null, // Какому пользователю адресован комментарий
    date: 'июль 02, 2022', // Когда создан комментарий
    userIdsLikes: [1, 3123, 543], // Пользователи которые лайкнули
    userIdsDislikes: [1, 3123, 543], // Пользователи которые диз-лайкнули
    description: 'Комментарий',
  },
  {
    commentId: '1-1', // Id комментария
    appealToEntityId: 6465, //к чему отноосится (ID фото например или UD видео)
    appealToCommentId: '1', // к какому комментарию этот ответ (когда отвечаем на комментарии)
    appealToAnswerId: null, // к какому ответу этот ответ (когда отвечаем на ответы)
    userId: 3, // Потзователь который коммент оставил
    userName: 'Пользователь 3',
    appealToUserId: 2, // Какому пользователю адресован комментарий
    appealToUserName: 'Пользователь 2', // Какому пользователю адресован комментарий
    date: 'июль 02, 2022', // Когда создан комментарий
    userIdsLikes: [1, 3123, 543], // Пользователи которые лайкнули
    userIdsDislikes: [1, 3123, 543], // Пользователи которые диз-лайкнули
    description: 'Ты не прав!',
  },
  {
    commentId: '1-2', // Id комментария
    appealToEntityId: 6465, //к чему отноосится (ID фото например или UD видео)
    appealToCommentId: '1', // к какому комментарию этот ответ (когда отвечаем на комментарии)
    appealToAnswerId: null, // к какому ответу этот ответ (когда отвечаем на ответы)
    userId: 4, // Потзователь который коммент оставил
    userName: 'Пользователь 4',
    appealToUserId: null, // Какому пользователю адресован комментарий
    appealToUserName: null, // Какому пользователю адресован комментарий
    date: 'июль 02, 2022', // Когда создан комментарий
    userIdsLikes: [1, 3123, 543], // Пользователи которые лайкнули
    userIdsDislikes: [1, 3123, 543], // Пользователи которые диз-лайкнули
    description: 'Какое небо голубое',
  },
  {
    commentId: '1-3', // Id комментария
    appealToEntityId: 6465, //к чему отноосится (ID фото например или UD видео)
    appealToCommentId: '1', // к какому комментарию этот ответ (когда отвечаем на комментарии)
    appealToAnswerId: '1-1', // к какому ответу этот ответ (когда отвечаем на ответы)
    userId: 4, // Потзователь который коммент оставил
    userName: 'Пользователь 4',
    appealToUserId: 3, // Какому пользователю адресован комментарий
    appealToUserName: 'Пользователь 3', // Какому пользователю адресован комментарий
    date: 'июль 02, 2022', // Когда создан комментарий
    userIdsLikes: [1, 3123, 543], // Пользователи которые лайкнули
    userIdsDislikes: [1, 3123, 543], // Пользователи которые диз-лайкнули
    description: 'Он прав!',
  },
  {
    commentId: '1-4', // Id комментария
    appealToEntityId: 6465, //к чему отноосится (ID фото например или UD видео)
    appealToCommentId: '1', // к какому комментарию этот ответ (когда отвечаем на комментарии)
    appealToAnswerId: null, // к какому ответу этот ответ (когда отвечаем на ответы)
    userId: 5, // Потзователь который коммент оставил
    userName: 'Пользователь 5',
    appealToUserId: null, // Какому пользователю адресован комментарий
    appealToUserName: null, // Какому пользователю адресован комментарий
    date: 'июль 02, 2022', // Когда создан комментарий
    userIdsLikes: [1, 3123, 543], // Пользователи которые лайкнули
    userIdsDislikes: [1, 3123, 543], // Пользователи которые диз-лайкнули
    description: 'Комментарий к записи',
  },
  {
    commentId: '1-5', // Id комментария
    appealToEntityId: 6465, //к чему отноосится (ID фото например или UD видео)
    appealToCommentId: '1', // к какому комментарию этот ответ (когда отвечаем на комментарии)
    appealToAnswerId: '1-3', // к какому ответу этот ответ (когда отвечаем на ответы)
    userId: 2, // Потзователь который коммент оставил
    userName: 'Пользователь 2',
    appealToUserId: 4, // Какому пользователю адресован комментарий
    appealToUserName: 'Пользователь 4', // Какому пользователю адресован комментарий
    date: 'июль 02, 2022', // Когда создан комментарий
    userIdsLikes: [1, 3123, 543], // Пользователи которые лайкнули
    userIdsDislikes: [1, 3123, 543], // Пользователи которые диз-лайкнули
    description: 'Как от может быть прав, если не прав!',
  },
  {
    commentId: '1-51', // Id комментария
    appealToEntityId: 6465, //к чему отноосится (ID фото например или UD видео)
    appealToCommentId: '1', // к какому комментарию этот ответ (когда отвечаем на комментарии)
    appealToAnswerId: '1-3', // к какому ответу этот ответ (когда отвечаем на ответы)
    userId: 2, // Потзователь который коммент оставил
    userName: 'Пользователь 2',
    appealToUserId: 4, // Какому пользователю адресован комментарий
    appealToUserName: 'Пользователь 4', // Какому пользователю адресован комментарий
    date: 'июль 02, 2022', // Когда создан комментарий
    userIdsLikes: [1, 3123, 543], // Пользователи которые лайкнули
    userIdsDislikes: [1, 3123, 543], // Пользователи которые диз-лайкнули
    description: 'Как от может быть прав, если не прав!',
  },
  {
    commentId: '1-52', // Id комментария
    appealToEntityId: 6465, //к чему отноосится (ID фото например или UD видео)
    appealToCommentId: '1', // к какому комментарию этот ответ (когда отвечаем на комментарии)
    appealToAnswerId: '1-3', // к какому ответу этот ответ (когда отвечаем на ответы)
    userId: 2, // Потзователь который коммент оставил
    userName: 'Пользователь 2',
    appealToUserId: 4, // Какому пользователю адресован комментарий
    appealToUserName: 'Пользователь 4', // Какому пользователю адресован комментарий
    date: 'июль 02, 2022', // Когда создан комментарий
    userIdsLikes: [1, 3123, 543], // Пользователи которые лайкнули
    userIdsDislikes: [1, 3123, 543], // Пользователи которые диз-лайкнули
    description: 'Как от может быть прав, если не прав!',
  },
  {
    commentId: '1-53', // Id комментария
    appealToEntityId: 6465, //к чему отноосится (ID фото например или UD видео)
    appealToCommentId: '1', // к какому комментарию этот ответ (когда отвечаем на комментарии)
    appealToAnswerId: '1-3', // к какому ответу этот ответ (когда отвечаем на ответы)
    userId: 2, // Потзователь который коммент оставил
    userName: 'Пользователь 2',
    appealToUserId: 4, // Какому пользователю адресован комментарий
    appealToUserName: 'Пользователь 4', // Какому пользователю адресован комментарий
    date: 'июль 02, 2022', // Когда создан комментарий
    userIdsLikes: [1, 3123, 543], // Пользователи которые лайкнули
    userIdsDislikes: [1, 3123, 543], // Пользователи которые диз-лайкнули
    description: 'Как от может быть прав, если не прав!',
  },
  {
    commentId: '1-54', // Id комментария
    appealToEntityId: 6465, //к чему отноосится (ID фото например или UD видео)
    appealToCommentId: '1', // к какому комментарию этот ответ (когда отвечаем на комментарии)
    appealToAnswerId: '1-3', // к какому ответу этот ответ (когда отвечаем на ответы)
    userId: 2, // Потзователь который коммент оставил
    userName: 'Пользователь 2',
    appealToUserId: 4, // Какому пользователю адресован комментарий
    appealToUserName: 'Пользователь 4', // Какому пользователю адресован комментарий
    date: 'июль 02, 2022', // Когда создан комментарий
    userIdsLikes: [1, 3123, 543], // Пользователи которые лайкнули
    userIdsDislikes: [1, 3123, 543], // Пользователи которые диз-лайкнули
    description: 'Как от может быть прав, если не прав!',
  },
  {
    commentId: '1-55', // Id комментария
    appealToEntityId: 6465, //к чему отноосится (ID фото например или UD видео)
    appealToCommentId: '1', // к какому комментарию этот ответ (когда отвечаем на комментарии)
    appealToAnswerId: '1-3', // к какому ответу этот ответ (когда отвечаем на ответы)
    userId: 2, // Потзователь который коммент оставил
    userName: 'Пользователь 2',
    appealToUserId: 4, // Какому пользователю адресован комментарий
    appealToUserName: 'Пользователь 4', // Какому пользователю адресован комментарий
    date: 'июль 02, 2022', // Когда создан комментарий
    userIdsLikes: [1, 3123, 543], // Пользователи которые лайкнули
    userIdsDislikes: [1, 3123, 543], // Пользователи которые диз-лайкнули
    description: 'Как от может быть прав, если не прав!',
  },
  {
    commentId: '1-56', // Id комментария
    appealToEntityId: 6465, //к чему отноосится (ID фото например или UD видео)
    appealToCommentId: '1', // к какому комментарию этот ответ (когда отвечаем на комментарии)
    appealToAnswerId: '1-3', // к какому ответу этот ответ (когда отвечаем на ответы)
    userId: 2, // Потзователь который коммент оставил
    userName: 'Пользователь 2',
    appealToUserId: 4, // Какому пользователю адресован комментарий
    appealToUserName: 'Пользователь 4', // Какому пользователю адресован комментарий
    date: 'июль 02, 2022', // Когда создан комментарий
    userIdsLikes: [1, 3123, 543], // Пользователи которые лайкнули
    userIdsDislikes: [1, 3123, 543], // Пользователи которые диз-лайкнули
    description: 'Как от может быть прав, если не прав!',
  },
  {
    commentId: '1-57', // Id комментария
    appealToEntityId: 6465, //к чему отноосится (ID фото например или UD видео)
    appealToCommentId: '1', // к какому комментарию этот ответ (когда отвечаем на комментарии)
    appealToAnswerId: '1-3', // к какому ответу этот ответ (когда отвечаем на ответы)
    userId: 2, // Потзователь который коммент оставил
    userName: 'Пользователь 2',
    appealToUserId: 4, // Какому пользователю адресован комментарий
    appealToUserName: 'Пользователь 4', // Какому пользователю адресован комментарий
    date: 'июль 02, 2022', // Когда создан комментарий
    userIdsLikes: [1, 3123, 543], // Пользователи которые лайкнули
    userIdsDislikes: [1, 3123, 543], // Пользователи которые диз-лайкнули
    description: 'Как от может быть прав, если не прав!',
  },
  {
    commentId: '1-58', // Id комментария
    appealToEntityId: 6465, //к чему отноосится (ID фото например или UD видео)
    appealToCommentId: '1', // к какому комментарию этот ответ (когда отвечаем на комментарии)
    appealToAnswerId: '1-3', // к какому ответу этот ответ (когда отвечаем на ответы)
    userId: 2, // Потзователь который коммент оставил
    userName: 'Пользователь 2',
    appealToUserId: 4, // Какому пользователю адресован комментарий
    appealToUserName: 'Пользователь 4', // Какому пользователю адресован комментарий
    date: 'июль 02, 2022', // Когда создан комментарий
    userIdsLikes: [1, 3123, 543], // Пользователи которые лайкнули
    userIdsDislikes: [1, 3123, 543], // Пользователи которые диз-лайкнули
    description: 'Как от может быть прав, если не прав!',
  },
  {
    commentId: '1-59', // Id комментария
    appealToEntityId: 6465, //к чему отноосится (ID фото например или UD видео)
    appealToCommentId: '1', // к какому комментарию этот ответ (когда отвечаем на комментарии)
    appealToAnswerId: '1-3', // к какому ответу этот ответ (когда отвечаем на ответы)
    userId: 2, // Потзователь который коммент оставил
    userName: 'Пользователь 2',
    appealToUserId: 4, // Какому пользователю адресован комментарий
    appealToUserName: 'Пользователь 4', // Какому пользователю адресован комментарий
    date: 'июль 02, 2022', // Когда создан комментарий
    userIdsLikes: [1, 3123, 543], // Пользователи которые лайкнули
    userIdsDislikes: [1, 3123, 543], // Пользователи которые диз-лайкнули
    description: 'Как от может быть прав, если не прав!',
  },
  {
    commentId: '1-6', // Id комментария
    appealToEntityId: 6465, //к чему отноосится (ID фото например или UD видео)
    appealToCommentId: '1', // к какому комментарию этот ответ (когда отвечаем на комментарии)
    appealToAnswerId: '1-3', // к какому ответу этот ответ (когда отвечаем на ответы)
    userId: 2, // Потзователь который коммент оставил
    userName: 'Пользователь 2',
    appealToUserId: 4, // Какому пользователю адресован комментарий
    appealToUserName: 'Пользователь 4', // Какому пользователю адресован комментарий
    date: 'июль 02, 2022', // Когда создан комментарий
    userIdsLikes: [1, 3123, 543], // Пользователи которые лайкнули
    userIdsDislikes: [1, 3123, 543], // Пользователи которые диз-лайкнули
    description: 'Да и вообще я отписываюсь!',
  },
  {
    commentId: '1-7', // Id комментария
    appealToEntityId: 6465, //к чему отноосится (ID фото например или UD видео)
    appealToCommentId: '1', // к какому комментарию этот ответ (когда отвечаем на комментарии)
    appealToAnswerId: '1-6', // к какому ответу этот ответ (когда отвечаем на ответы)
    userId: 4, // Потзователь который коммент оставил
    userName: 'Пользователь 4',
    appealToUserId: 2, // Какому пользователю адресован комментарий
    appealToUserName: 'Пользователь 2', // Какому пользователю адресован комментарий
    date: 'июль 02, 2022', // Когда создан комментарий
    userIdsLikes: [1, 3123, 543], // Пользователи которые лайкнули
    userIdsDislikes: [1, 3123, 543], // Пользователи которые диз-лайкнули
    description: 'Хватит истерить',
  },
  {
    commentId: '2', // Id комментария
    appealToEntityId: 6465, //к чему отноосится (ID фото например или UD видео)
    appealToCommentId: null, // к какому комментарию этот ответ (когда отвечаем на комментарии)
    appealToAnswerId: null, // к какому ответу этот ответ (когда отвечаем на ответы)
    userId: 6, // Потзователь который коммент оставил
    userName: 'Пользователь 6',
    appealToUserId: null, // Какому пользователю адресован комментарий
    appealToUserName: null, // Какому пользователю адресован комментарий
    date: 'июль 02, 2022', // Когда создан комментарий
    userIdsLikes: [1, 3123, 543], // Пользователи которые лайкнули
    userIdsDislikes: [1, 3123, 543], // Пользователи которые диз-лайкнули
    description: 'Еще какой то комментарий',
  },
  {
    commentId: '3', // Id комментария
    appealToEntityId: 6465, //к чему отноосится (ID фото например или UD видео)
    appealToCommentId: null, // к какому комментарию этот ответ (когда отвечаем на комментарии)
    appealToAnswerId: null, // к какому ответу этот ответ (когда отвечаем на ответы)
    userId: 6, // Потзователь который коммент оставил
    userName: 'Пользователь 6',
    appealToUserId: null, // Какому пользователю адресован комментарий
    appealToUserName: null, // Какому пользователю адресован комментарий
    date: 'июль 02, 2022', // Когда создан комментарий
    userIdsLikes: [1, 3123, 543], // Пользователи которые лайкнули
    userIdsDislikes: [1, 3123, 543], // Пользователи которые диз-лайкнули
    description: 'Еще какой то комментарий',
  },
  {
    commentId: '4', // Id комментария
    appealToEntityId: 6465, //к чему отноосится (ID фото например или UD видео)
    appealToCommentId: null, // к какому комментарию этот ответ (когда отвечаем на комментарии)
    appealToAnswerId: null, // к какому ответу этот ответ (когда отвечаем на ответы)
    userId: 6, // Потзователь который коммент оставил
    userName: 'Пользователь 6',
    appealToUserId: null, // Какому пользователю адресован комментарий
    appealToUserName: null, // Какому пользователю адресован комментарий
    date: 'июль 02, 2022', // Когда создан комментарий
    userIdsLikes: [1, 3123, 543], // Пользователи которые лайкнули
    userIdsDislikes: [1, 3123, 543], // Пользователи которые диз-лайкнули
    description: 'Еще какой то комментарий',
  },
  {
    commentId: '5', // Id комментария
    appealToEntityId: 6465, //к чему отноосится (ID фото например или UD видео)
    appealToCommentId: null, // к какому комментарию этот ответ (когда отвечаем на комментарии)
    appealToAnswerId: null, // к какому ответу этот ответ (когда отвечаем на ответы)
    userId: 6, // Потзователь который коммент оставил
    userName: 'Пользователь 6',
    appealToUserId: null, // Какому пользователю адресован комментарий
    appealToUserName: null, // Какому пользователю адресован комментарий
    date: 'июль 02, 2022', // Когда создан комментарий
    userIdsLikes: [1, 3123, 543], // Пользователи которые лайкнули
    userIdsDislikes: [1, 3123, 543], // Пользователи которые диз-лайкнули
    description: 'Еще какой то комментарий',
  },
  {
    commentId: '6', // Id комментария
    appealToEntityId: 6465, //к чему отноосится (ID фото например или UD видео)
    appealToCommentId: null, // к какому комментарию этот ответ (когда отвечаем на комментарии)
    appealToAnswerId: null, // к какому ответу этот ответ (когда отвечаем на ответы)
    userId: 6, // Потзователь который коммент оставил
    userName: 'Пользователь 6',
    appealToUserId: null, // Какому пользователю адресован комментарий
    appealToUserName: null, // Какому пользователю адресован комментарий
    date: 'июль 02, 2022', // Когда создан комментарий
    userIdsLikes: [1, 3123, 543], // Пользователи которые лайкнули
    userIdsDislikes: [1, 3123, 543], // Пользователи которые диз-лайкнули
    description: 'Еще какой то комментарий',
  },
]

export type CommentType = typeof COMMENTS[0]
