import { map, tap } from 'rxjs'
import lodash from 'lodash'
import { Callback } from '@client/shared/hooks/useObservable'


/**
 * TODO: Дать нормальные названия
 * @param s$
 */

export const searchUsersInFolders: Callback = (s$) => s$.pipe(
  map(({ value }) => ({ search: value }))
)

export const foldersApi: Callback = (s$) => s$.pipe(
  tap((b) => console.log('b', b)),
  map(({ folders, userId, friends }) => ({
      folders: lodash(folders.filter(({ ownerId }) => ownerId === userId))
      .map((folder) => ({
        ...folder,
        friends: lodash.intersection(friends, folder.users), // оставлет повторяющиеся значени
        noFriends: lodash.reject(folder.users, (id) => friends.includes(id)) // возвращает массив не удовлетворяющий условию
      }))
      .keyBy('id')
      .value()
    })
  )
)
export const allMessagesApi: Callback = (s$) => s$.pipe(
  map(({ allMessages, userId }) => {
      const res = ({ allMessages: allMessages.filter(({ toUserId }) => toUserId === userId) })

      return ({
        allMessages: lodash(res.allMessages)
        .groupBy(({ fromUserId }) => fromUserId)
        .value(),
        newMessages: lodash(res.allMessages)
        .filter(({ dateSeen }) => !Boolean(dateSeen))
        .groupBy(({ fromUserId }) => fromUserId)
        .value()
      })
    }
  )
)


export const setOpenFolderIdS: Callback = (s$) => s$.pipe(
  map((folderId) => ({ openFolderId: folderId }))
)


export const openUserIdChatS: Callback = (s$) => s$.pipe(
  map(({ userId }) => ({ openUserIdChat: userId }))
)

export const sendNewMessageS: Callback = (s$) => s$.pipe(
  map(({ message, prev }) => {
    const isFirst = prev[message.toUserId]
    const newMessage = !isFirst ? (lodash.defaults(prev, {
      [message.toUserId]: [message]
    })) : ({
      [message.toUserId]: [...prev[message.toUserId], message]
    })

    return ({
      allMessages: {
        ...prev,
        ...newMessage
      }
    })
  })
)
